import test from 'node:test';
import assert from 'node:assert/strict';
import {PerspectiveCamera,Vector3} from 'three';
import {shouldRoam} from './world-state.js';
test('playback runs immediately until explicitly paused, and overlays block it',()=>{
 assert.equal(shouldRoam(true,false),true);
 assert.equal(shouldRoam(false,false),false);
 assert.equal(shouldRoam(true,true),false);
 assert.equal(shouldRoam(false,true),false);
});
test('true perspective projection gives greater parallax to nearby posters and dolly changes depth ratios',()=>{
 const camera=new PerspectiveCamera(58,1.5,10,8000);camera.position.set(0,0,0);camera.updateMatrixWorld();
 const near=new Vector3(100,0,-1000).project(camera).x,far=new Vector3(100,0,-4000).project(camera).x;
 assert.ok(Math.abs(near/far-4)<1e-8);
 camera.position.z=-500;camera.updateMatrixWorld();
 const nearAfter=new Vector3(100,0,-1000).project(camera).x,farAfter=new Vector3(100,0,-4000).project(camera).x;
 assert.ok(nearAfter/near>farAfter/far);
});
