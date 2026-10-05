"""Prepare approved field events, preserving channels and source provenance."""
import subprocess,json,pathlib,wave,numpy as np
root=pathlib.Path('public/stillroom/audio');rate=24000;report=[]
for name,source,start,duration,target in [('footsteps-0','museum-steps',8,5,-30),('footsteps-1','museum-steps',32,6,-30),('footsteps-2','museum-steps',61,5,-30),('tableware-0','cup-a',0,None,-29),('tableware-1','cup-b',0,None,-29)]:
 path=root/'round3'/f'{source}.mp3';info=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_entries','stream=channels','-of','json',str(path)]));channels=info['streams'][0]['channels']
 cmd=['ffmpeg','-v','error','-i',str(path),'-ss',str(start)]
 if duration:cmd+=['-t',str(duration)]
 raw=subprocess.check_output(cmd+['-af','highpass=f=28','-ar',str(rate),'-f','f32le','-']);x=np.frombuffer(raw,dtype='<f4').reshape(-1,channels).copy();fade=min(int(rate*(.16 if source=='museum-steps' else .004)),len(x)//4);x[:fade]*=np.linspace(0,1,fade)[:,None];x[-fade:]*=np.linspace(1,0,fade)[:,None]
 rms=np.sqrt(np.mean(x*x));peak=np.max(np.abs(x));gain=min(10**(target/20)/(rms+1e-12),10**(-12/20)/(peak+1e-12));x*=gain
 with wave.open(str(root/'events'/f'{name}.wav'),'wb')as w:w.setnchannels(channels);w.setsampwidth(2);w.setframerate(rate);w.writeframes((np.clip(x,-1,1)*32767).astype('<i2').tobytes())
 report.append(dict(file=f'events/{name}.wav',source=f'round3/{source}.mp3',source_range=[start,start+len(x)/rate],duration=len(x)/rate,channels=channels,gain_db=round(float(20*np.log10(gain)),2),peak_db=round(float(20*np.log10(np.max(np.abs(x)))),2),fade_seconds=fade/rate,license='CC0',review='Source approved by user; these extracted excerpts need final in-context listening. No agent listening claimed.'))
(root/'events'/'processing.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2))
