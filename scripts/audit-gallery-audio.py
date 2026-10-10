"""Objective measurements only; never a substitute for perceptual listening."""
import json, subprocess, hashlib
from pathlib import Path
import numpy as np
ROOT=Path(__file__).resolve().parents[1]
AUDIO=ROOT/'public/stillroom/audio'
def measure(path):
    probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_entries','stream=channels,sample_rate','-of','json',str(path)]))['streams'][0]
    rate=int(probe['sample_rate']);channels=probe['channels']
    decoded=subprocess.run(['ffmpeg','-v','error','-i',str(path),'-f','f32le','-'],capture_output=True,check=True)
    x=np.frombuffer(decoded.stdout,dtype='<f4').reshape(-1,channels)
    def db(value):return round(float(20*np.log10(max(float(value),1e-12))),2)
    rms=float(np.sqrt(np.mean(x.astype(np.float64)**2)))
    seconds=len(x)//rate
    levels=np.sqrt(np.mean(x[:seconds*rate].reshape(seconds,rate,channels).astype(np.float64)**2,axis=(1,2))) if seconds else np.array([rms])
    seam=float(np.max(np.abs(x[-1]-x[0])))
    return dict(file=str(path.relative_to(AUDIO)),sha256=hashlib.sha256(path.read_bytes()).hexdigest(),duration=round(len(x)/rate,3),channels=channels,sampleRate=rate,peakDbfs=db(np.max(np.abs(x))),rmsDbfs=db(rms),clippedSamples=int(np.count_nonzero(np.abs(x)>=1)),oneSecondMedianDbfs=db(np.median(levels)),oneSecondMaxDbfs=db(max(levels)),rawWrapStepDbfs=db(seam),decoderWarnings=decoded.stderr.decode().strip(),agentListened=False,meaning='Decoded sample measurements only. No judgement about speech, texture, spatial fit or perceptual loop quality.')
paths=list((AUDIO/'field').glob('*.mp3'))+list((AUDIO/'events').glob('*.wav'))+[ROOT/'public'/i['local'].lstrip('/') for i in json.loads((AUDIO/'round4/manifest.json').read_text())]
report={'date':'2026-10-10','method':'Full-file decode, sample peak, RMS, 1-second levels and last-to-first sample difference. No perceptual listening performed.','recordings':[measure(p) for p in sorted(paths)]}
(AUDIO/'round4/technical-audit.json').write_text(json.dumps(report,indent=2)+'\n')
for r in report['recordings']:print(r['file'],r['peakDbfs'],r['rawWrapStepDbfs'],r['clippedSamples'],bool(r['decoderWarnings']))
