"""Original procedural sound design. No sampled recordings; output dedicated CC0."""
import numpy as np, wave, pathlib
rng=np.random.default_rng(418); sr=22050; out=pathlib.Path('public/stillroom/audio'); out.mkdir(exist_ok=True)
def save(name,x):
 x=np.clip(x,-.85,.85); stereo=np.stack([x,np.roll(x,211)*.96],axis=1)
 with wave.open(str(out/(name+'.wav')),'wb') as w:w.setnchannels(2);w.setsampwidth(2);w.setframerate(sr);w.writeframes((stereo*32767).astype('<i2').tobytes())
def noise(n,lo,hi):
 f=np.fft.rfftfreq(n,1/sr); a=np.fft.rfft(rng.normal(size=n)); a*=np.exp(-(f/hi)**2)*(1-np.exp(-(f/max(lo,1))**2));x=np.fft.irfft(a,n);return x/(np.std(x)+1e-9)
n=sr*24;t=np.arange(n)/sr
for name,lo,hi,level in [('air',30,350,.045),('wind',70,1600,.045),('traffic',35,450,.045),('water',250,2600,.047),('pond',400,3400,.036),('sea',80,3300,.06),('murmur',160,650,.028)]:
 x=noise(n,lo,hi);mod=.7+.2*np.sin(2*np.pi*t/8)+.1*np.sin(2*np.pi*t/3)
 if name in ['water','pond','sea']:mod=(.55+.4*np.sin(2*np.pi*t/(8 if name=='sea' else 3))**2)
 save(name,x*level*mod)
save('hum',noise(n,20,240)*.018+np.sin(2*np.pi*60*t)*.018)
save('drone',sum(np.sin(2*np.pi*f*t)*.015 for f in [110,165,220,277.1666667])*(.8+.2*np.sin(2*np.pi*t/24)))
x=np.zeros(n)
for start,chord in [(0,[130.833333,164.833333,196]),(6,[146.833333,174.666667,220]),(12,[110,130.833333,164.833333]),(18,[98,123.5,146.833333])]:
 q=np.arange(sr*6)/sr; env=(1-np.exp(-q*3))*np.exp(-q*.65); x[int(start*sr):int((start+6)*sr)]=sum(np.sin(2*np.pi*f*q)*.014 for f in chord)*env
save('jazz',x)
for name in ['steps','cups','birds','creak']:
 for v in range(3):
  m=sr*4;q=np.arange(m)/sr;x=np.zeros(m)
  if name=='steps':
   for at in [.5,1.3,2.15]:
    z=np.arange(int(.24*sr))/sr; a=int(at*sr); x[a:a+len(z)]+=noise(len(z),80,700)*np.exp(-z*24)*.1
   x+=noise(m,900,3000)*.008*np.sin(np.pi*q/4)**4
  elif name=='cups':x=sum(np.sin(2*np.pi*f*q) for f in [1800+v*100,2600+v*80])*np.exp(-q*9)*.035
  elif name=='birds':
   for at in [.4,1.2]:
    z=np.arange(int(.35*sr))/sr;a=int(at*sr);x[a:a+len(z)]+=np.sin(2*np.pi*((2400+v*250)*z+900*z*z))*np.sin(np.pi*z/.35)**2*.032
  else:x=np.sin(2*np.pi*(170*q+25*np.sin(q*3)))*np.sin(np.pi*q/4)**3*.045
  x*=np.minimum(q/.04,1)*np.minimum((4-q)/.08,1);save(f'{name}-{v}',x)
