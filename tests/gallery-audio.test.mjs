import {test} from 'node:test';
import assert from 'node:assert/strict';
import {smoothLoopJoin,SoundEngine} from '../public/stillroom/audio.js';
const buffer=(values)=>({sampleRate:24000,length:values[0].length,numberOfChannels:values.length,getChannelData:i=>values[i]});
test('decoded loop repair joins endpoints and preserves channels, interior and peak ceiling',()=>{
 const arrays=[Float32Array.from({length:1000},(_,i)=>Math.sin(i)*.08),Float32Array.from({length:1000},(_,i)=>Math.cos(i)*.05)];
 arrays[0][999]=.06;arrays[1][999]=-.03;
 const originals=arrays.map(x=>x.slice());const b=buffer(arrays);assert.equal(smoothLoopJoin(b),b);
 for(let c=0;c<2;c++){assert.equal(arrays[c][0],arrays[c].at(-1));assert.deepEqual(arrays[c].slice(72,-72),originals[c].slice(72,-72));assert.ok(Math.max(...arrays[c].map(Math.abs))<=Math.max(...originals[c].map(Math.abs)));}
});
test('already continuous loop remains untouched',()=>{const a=Float32Array.from({length:1000},(_,i)=>Math.sin(i)*.04);a[999]=a[0];const old=a.slice();smoothLoopJoin(buffer([a]));assert.deepEqual(a,old)});
class Param{constructor(){this.value=0}cancelAndHoldAtTime(){}linearRampToValueAtTime(v){this.value=v}}
class Node{constructor(){this.gain=new Param()}connect(){}disconnect(){}start(){this.started=true}stop(){this.stopped=true;queueMicrotask(()=>this.onended?.())}}
const context={currentTime:0,createGain:()=>new Node(),createBufferSource:()=>new Node(),destination:{},resume:async()=>{}};
function engine(){const e=new SoundEngine(()=>{});e.ctx=context;e.master=new Node();e.buffer=async()=>({duration:.001});return e}
const scene=id=>({id,tracks:[{file:'loop',volume:.5},{file:'event',event:true,variants:['a','b'],interval:[.002,.002],volume:.2}]});
const wait=()=>new Promise(r=>setTimeout(r,15));
test('event timers cancel on pause, zero volume and scene changes; variation is one gain',async()=>{
 const e=engine();e.playing=true;await e.scene(scene('one'));const g=e.groups.at(-1);assert.equal(g.tracks.length,2);assert.equal(g.events[0].buffers.length,2);await wait();
 await e.toggle(false);await wait();assert.equal(g.timers.size,0);assert.equal(g.eventSources.size,0);
 await e.toggle(true);e.setTrack(1,0);await wait();assert.equal(g.timers.size,0);
 e.setTrack(1,.2);e.setVolume(0);await wait();assert.equal(g.timers.size,0);assert.equal(g.eventSources.size,0);
 e.setVolume(.5);await e.scene(scene('two'));await wait();assert.equal(g.timers.size,0);assert.equal(g.eventSources.size,0);
 await e.toggle(false);await e.scene(scene('three'));assert.equal(e.playing,false);assert.equal(e.master.gain.value,0);assert.equal(e.groups.at(-1).timers.size,0);e.groups.slice().forEach(g=>e.destroy(g));
});
test('stale scene load cannot create an extra group after a newer scene',async()=>{
 const e=engine();let resolve;e.buffer=f=>f==='slow'?new Promise(r=>resolve=r):Promise.resolve({duration:10});
 const a=e.scene({id:'slow',tracks:[{file:'slow',volume:.3}]});await e.scene({id:'latest',tracks:[{file:'ready',volume:.3}]});resolve({duration:10});await a;assert.equal(e.groups.length,1);assert.equal(e.groups[0].id,'latest');e.destroy(e.groups[0]);
});
