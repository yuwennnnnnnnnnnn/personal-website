"""Prepare user-reviewed CC0 preview recordings without denoising or compression."""
import subprocess,numpy as np,json,pathlib,wave
root=pathlib.Path('public/stillroom/audio');sr=24000;report=[]
for name,target in [('gallery',-30),('cafe',-29),('pond',-28),('river',-28),('sea',-26),('roof-city',-29),('pool-morning',-28),('wind',-33),('insects',-36)]:
 source=root/('round2' if name in ['roof-city','pool-morning','wind','insects'] else 'candidates')/f'{name}.mp3'
 info=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_entries','stream=channels','-of','json',str(source)]));channels=info['streams'][0]['channels']
 raw=subprocess.check_output(['ffmpeg','-v','error','-i',str(source),'-af','highpass=f=28','-ar',str(sr),'-f','f32le','-'])
 x=np.frombuffer(raw,dtype='<f4').reshape(-1,channels).copy();overlap=int(sr*3);a=np.linspace(0,1,overlap,endpoint=False)[:,None]
 # Rotate the loop: interior then 3-second tail/head overlap. End meets interior start.
 cross=x[-overlap:]*(1-a)+x[:overlap]*a;y=np.concatenate([x[overlap:-overlap],cross])
 rms=np.sqrt(np.mean(y*y));peak=np.max(np.abs(y));gain=min(10**(target/20)/(rms+1e-12),10**(-6/20)/(peak+1e-12));y*=gain
 with wave.open(str(root/'field'/f'{name}.wav'),'wb') as w:w.setnchannels(channels);w.setsampwidth(2);w.setframerate(sr);w.writeframes((np.clip(y,-1,1)*32767).astype('<i2').tobytes())
 report.append(dict(file=f'field/{name}.wav',channels=channels,duration=round(len(y)/sr,3),gain_db=round(20*np.log10(gain),2),rms_db=round(20*np.log10(np.sqrt(np.mean(y*y))),2),peak_db=round(20*np.log10(np.max(np.abs(y))),2),loop_overlap_seconds=3,source='CC BY 4.0 preview; flcellogrl #199509' if name=='insects' else 'local CC0 public MP3 preview',review='User approved all four listening checks; modified loop requires final listening'))
(root/'field'/'processing.json').write_text(json.dumps(report,indent=2));print(json.dumps(report,indent=2))
