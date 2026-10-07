import * as THREE from 'three';
import {shouldRoam} from './world-state.js';
const $=s=>document.querySelector(s), gallery=$('.gallery'),space=$('.space'),viewer=$('.poster-viewer'),panel=$('.index-panel');
gallery.append(viewer);
const items=await fetch('/assets/play-posters/manifest.json').then(r=>r.json());
// Lead with the Spring Festival artwork while preserving source IDs and the remaining order.
const openingPosterIndex=items.findIndex(item=>item.id===16);
if(openingPosterIndex>0)items.unshift(...items.splice(openingPosterIndex,1));
const mod=(n,m)=>((n%m)+m)%m, clamp=THREE.MathUtils.clamp, smooth=THREE.MathUtils.smoothstep;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const introCopy=$('.world-copy');
let introDocked=false,introMovingUntil=0;
function dockIntro(){
 if(introDocked)return;
 introDocked=true;
 introCopy.classList.add('is-docked');
 introMovingUntil=performance.now()+1000;dirty=true;
}
setTimeout(dockIntro,5000);
const scene=new THREE.Scene();scene.background=new THREE.Color('#ffffff');
const camera=new THREE.PerspectiveCamera(58,1,10,8000);camera.position.set(-170,-140,1700);
const target=camera.position.clone(),initial=target.clone();
let renderer;
try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'low-power'});}catch{ $('#instructions').hidden=false;$('#instructions').textContent='Your browser cannot start 3D graphics. Use Browse all to view the posters.'; }
if(renderer){renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.NoToneMapping;space.append(renderer.domElement);}
const geometry=new THREE.PlaneGeometry(1,1),loader=new THREE.TextureLoader(),textures=new Map(),planes=new Map();
const raycaster=new THREE.Raycaster(),mouse=new THREE.Vector2(),frustum=new THREE.Frustum(),matrix=new THREE.Matrix4();
let active=false,nativeFull=false,selection=0,opener=null,oldOverflow='',viewerOverflow='',width=1,height=1,lastTime=performance.now(),roamEnabled=!reduced.matches,roamSpeed=0,roaming=false,phase=0,dirty=true,chunkAt='',visible=true,indexLoaded=false;
const pointers=new Map();let gesture=null;
const speedSteps=[.25,.5,.75,1,1.5,2,3,4,5];let speedIndex=3;
const series=id=>id===1||(id>=27&&id<=30)?'Dimension':id<=21?'Chinese New Year & Mahjong':id===22?'Graduation exhibition':id>=24&&id<=26?'Advertising studies':'Typography experiments';
function hash(x,y,z){const v=Math.sin(x*127.1+y*311.7+z*74.7)*43758.5453;return v-Math.floor(v);}
function texture(index){if(textures.has(index))return textures.get(index);const t=loader.load(items[index].thumb,()=>{dirty=true;});t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=renderer?.capabilities.getMaxAnisotropy()||1;textures.set(index,t);return t;}
function populate(){
 if(!renderer)return;
 const key=[Math.floor(camera.position.x/450),Math.floor(camera.position.y/450),Math.floor(camera.position.z/350),Math.round(camera.aspect*10)].join(':');if(key===chunkAt)return;chunkAt=key;
 const keep=new Set(),tan=Math.tan(THREE.MathUtils.degToRad(camera.fov/2));
 for(let z=Math.floor((camera.position.z-7200)/1500);z<=Math.ceil(camera.position.z/1500);z++){
  const depth=Math.max(700,camera.position.z-z*1500),rx=Math.ceil(depth*tan*camera.aspect/1250)+1,ry=Math.ceil(depth*tan/1100)+1,cx=Math.round(camera.position.x/1250),cy=Math.round(camera.position.y/1100);
  for(let y=cy-ry;y<=cy+ry;y++)for(let x=cx-rx;x<=cx+rx;x++){
   if(hash(x,y,z)>.30)continue;
   const px=x*1250+(hash(x+9,y,z)-.5)*640,py=y*1100+(hash(x,y+7,z)-.5)*520,pz=z*1500+(hash(x,y,z+3)-.5)*550;
   const d=camera.position.z-pz;if(d< -400||d>7300||Math.abs(px-camera.position.x)>Math.max(1000,d*tan*camera.aspect+700)||Math.abs(py-camera.position.y)>Math.max(900,d*tan+700))continue;
   const id=`${x}/${y}/${z}`;keep.add(id);if(planes.has(id))continue;
   const index=mod(x*17+y*29+z*13,54),item=items[index];
   const material=new THREE.MeshBasicMaterial({map:texture(index),transparent:true,side:THREE.DoubleSide,depthWrite:false,opacity:0,toneMapped:false});
   const mesh=new THREE.Mesh(geometry,material);mesh.scale.set(620*item.width/item.height,620,1);mesh.position.set(px,py,pz);mesh.rotation.y=(hash(x+2,y,z)-.5)*.32;mesh.rotation.x=(hash(x,y+2,z)-.5)*.1;mesh.userData.index=index;scene.add(mesh);planes.set(id,mesh);
  }
 }
 for(const [id,mesh]of planes)if(!keep.has(id)){scene.remove(mesh);mesh.material.dispose();planes.delete(id);}
}
function activity(){if(roaming){target.copy(camera.position);roaming=false;}roamSpeed=0;dirty=true;}
function updateRoamButton(){const b=$('#roam'),label=roaming?'Pause automatic roaming':'Start automatic roaming now';
 if(b.getAttribute('aria-label')!==label){b.innerHTML=roaming?'<span aria-hidden="true">Ⅱ</span> Pause':'<span aria-hidden="true">▷</span> Auto';b.setAttribute('aria-pressed',String(roaming));b.setAttribute('aria-label',label);b.title=label;}
}
updateRoamButton();$('#roam').onclick=()=>{activity();roamEnabled=!roamEnabled;updateRoamButton();};
function animate(now){requestAnimationFrame(animate);const dt=Math.min((now-lastTime)/1000,.05);lastTime=now;
 const blocked=!active||viewer.open||!panel.hidden||document.hidden||!visible;
 const idle=shouldRoam(roamEnabled,blocked);
 if(idle){roamSpeed=THREE.MathUtils.damp(roamSpeed,1,1.2,dt);phase+=dt*.08;target.x+=Math.cos(phase)*24*speedSteps[speedIndex]*roamSpeed*dt;target.y+=Math.sin(phase*.7)*12*speedSteps[speedIndex]*roamSpeed*dt;target.z-=42*speedSteps[speedIndex]*roamSpeed*dt;roaming=true;}else {roamSpeed=0;roaming=false;}
 if(!blocked||!active){const factor=reduced.matches?1:1-Math.exp(-9*dt);if(camera.position.distanceToSquared(target)>.0001){camera.position.lerp(target,factor);dirty=true;}}
 if(idle||now<introMovingUntil)dirty=true;
 gallery.dataset.camera=[camera.position.x,camera.position.y,camera.position.z].map(v=>v.toFixed(3)).join(',');gallery.dataset.roaming=String(idle);gallery.dataset.cameraType=camera.type;
 updateRoamButton();
 if(!renderer||!dirty||document.hidden||!visible)return;
 populate();camera.updateMatrixWorld();matrix.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse);frustum.setFromProjectionMatrix(matrix);
 const canvasRect=space.getBoundingClientRect();
 const protectedAreas=[introCopy,$('.world-return')].map((element,index)=>{const r=element.getBoundingClientRect(),margin=index===0?24:12;return {left:r.left-canvasRect.left-margin,right:r.right-canvasRect.left+margin,top:r.top-canvasRect.top-margin,bottom:r.bottom-canvasRect.top+margin};});
 let count=0,min=Infinity,max=0,fading=false,avoided=0;
 const corner=new THREE.Vector3();
 function behindText(mesh){
  mesh.updateMatrixWorld();let left=Infinity,right=-Infinity,top=Infinity,bottom=-Infinity;
  for(const x of [-.5,.5])for(const y of [-.5,.5]){corner.set(x,y,0).applyMatrix4(mesh.matrixWorld).project(camera);const px=(corner.x+1)*width/2,py=(1-corner.y)*height/2;left=Math.min(left,px);right=Math.max(right,px);top=Math.min(top,py);bottom=Math.max(bottom,py);}
  return protectedAreas.some(r=>left<r.right&&right>r.left&&top<r.bottom&&bottom>r.top);
 }
 for(const mesh of planes.values()){
  const d=camera.position.z-mesh.position.z;const opacity=smooth(d,220,750)*(1-smooth(d,3400,7000));const reserved=d>0&&behindText(mesh);if(reserved)avoided++;
  const desired=reserved?0:opacity;
  mesh.material.opacity=reserved||reduced.matches?desired:THREE.MathUtils.damp(mesh.material.opacity,desired,7,dt);
  if(Math.abs(mesh.material.opacity-desired)>.002)fading=true;
  mesh.visible=mesh.material.opacity>.015&&frustum.intersectsObject(mesh);if(mesh.visible){count++;min=Math.min(min,d);max=Math.max(max,d);}
 }
 gallery.dataset.depthRange=`${Math.round(min)}–${Math.round(max)}`;gallery.dataset.visiblePosters=count;gallery.dataset.textAvoided=avoided;renderer.render(scene,camera);dirty=fading;
}
requestAnimationFrame(animate);
new ResizeObserver(()=>{width=space.clientWidth;height=space.clientHeight;camera.aspect=width/height;camera.updateProjectionMatrix();renderer?.setSize(width,height);chunkAt='';dirty=true;}).observe(space);
new IntersectionObserver(([e])=>{visible=e.isIntersecting;dirty=true;}).observe(gallery);
document.addEventListener('visibilitychange',()=>{activity();dirty=true;});
function updateFullscreenIcon(full){const button=$('#leave');const label=full?'Exit fullscreen':'Enter fullscreen';button.setAttribute('aria-label',label);button.title=label;button.querySelector('path').setAttribute('d',full?'M4 9h5V4M20 9h-5V4M4 15h5v5M20 15h-5v5':'M9 4H4v5M15 4h5v5M4 15v5h5M20 15v5h-5');}
function restore(){nativeFull=false;activity();gallery.dataset.fullscreenMode='viewport';updateFullscreenIcon(false);dirty=true;}
async function exit(){if(document.fullscreenElement)await document.exitFullscreen().catch(()=>{});restore();}
$('#leave').onclick=async()=>{
 activity();
 if(document.fullscreenElement){await exit();return;}
 try{if(gallery.requestFullscreen&&document.fullscreenEnabled)await gallery.requestFullscreen();}catch{/* The gallery remains fully usable at viewport size. */}
};
document.addEventListener('fullscreenchange',()=>{if(document.fullscreenElement===gallery){nativeFull=true;gallery.dataset.fullscreenMode='native';updateFullscreenIcon(true);}else restore();dirty=true;});
active=true;document.body.style.overflow='hidden';gallery.dataset.fullscreenMode='viewport';activity();
function travel(amount){dockIntro();target.z+=clamp(amount,-650,650);dirty=true;}
function changeSpeed(direction){speedIndex=clamp(speedIndex+direction,0,speedSteps.length-1);$('#auto-speed').textContent=`${speedSteps[speedIndex]}×`;$('#zoom-out').disabled=speedIndex===0;$('#zoom-in').disabled=speedIndex===speedSteps.length-1;gallery.dataset.autoSpeed=speedSteps[speedIndex];}
$('#zoom-in').onclick=()=>changeSpeed(1);$('#zoom-out').onclick=()=>changeSpeed(-1);$('#reset').onclick=()=>{target.copy(initial);dirty=true;};
space.addEventListener('wheel',e=>{if(!active||viewer.open||!panel.hidden)return;e.preventDefault();travel(clamp(e.deltaY*(e.deltaMode===1?16:1),-120,120)*-3);},{passive:false});
function pan(dx,dy){const units=2*1700*Math.tan(THREE.MathUtils.degToRad(camera.fov/2))/height;target.x-=dx*units;target.y+=dy*units;dirty=true;}
function pair(){const a=[...pointers.values()];return a.length<2?null:{distance:Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y),x:(a[0].x+a[1].x)/2,y:(a[0].y+a[1].y)/2};}
space.addEventListener('pointerdown',e=>{if(!active||e.button>0)return;roamEnabled=false;activity();updateRoamButton();e.preventDefault();space.setPointerCapture(e.pointerId);pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pointers.size===1)gesture={sx:e.clientX,sy:e.clientY,x:e.clientX,y:e.clientY,moved:false};else{gesture.moved=true;gesture.pair=pair();}gallery.classList.add('dragging');});
space.addEventListener('pointermove',e=>{if(!gesture||!pointers.has(e.pointerId))return;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pointers.size>1){const n=pair(),p=gesture.pair;if(p&&p.distance>0){travel(-Math.log(n.distance/p.distance)*1800);pan(n.x-p.x,n.y-p.y);}gesture.pair=n;gesture.moved=true;}else{if(Math.hypot(e.clientX-gesture.sx,e.clientY-gesture.sy)>7)gesture.moved=true;if(gesture.moved)pan(e.clientX-gesture.x,e.clientY-gesture.y);gesture.x=e.clientX;gesture.y=e.clientY;}});
function pick(x,y){const r=space.getBoundingClientRect();mouse.set((x-r.left)/r.width*2-1,-(y-r.top)/r.height*2+1);raycaster.setFromCamera(mouse,camera);const hit=raycaster.intersectObjects([...planes.values()].filter(m=>m.visible&&m.material.opacity>.2))[0];if(hit)openPoster(hit.object.userData.index,gallery);}
function finish(e,cancel=false){if(!pointers.has(e.pointerId))return;const click=!cancel&&pointers.size===1&&!gesture.moved;pointers.delete(e.pointerId);if(!pointers.size){gesture=null;gallery.classList.remove('dragging');}else{const p=[...pointers.values()][0];gesture.x=p.x;gesture.y=p.y;gesture.pair=null;}if(click)pick(e.clientX,e.clientY);}
space.addEventListener('pointerup',e=>finish(e));space.addEventListener('pointercancel',e=>finish(e,true));
gallery.addEventListener('keydown',e=>{if(viewer.open||!panel.hidden)return;if(e.key==='Escape'&&active){e.preventDefault();exit();return;}if(!active||e.target.closest('button'))return;const m={ArrowLeft:[80,0],ArrowRight:[-80,0],ArrowUp:[0,80],ArrowDown:[0,-80]};if(m[e.key]){e.preventDefault();pan(...m[e.key]);}if(e.key==='+'||e.key==='='){e.preventDefault();changeSpeed(1);}if(e.key==='-'){e.preventDefault();changeSpeed(-1);}});
function animatePosterIndex(){
 if(reduced.matches)return;
 panel.animate([{opacity:0,translate:'0 24px'},{opacity:1,translate:'0 -4px',offset:.72},{opacity:1,translate:'0 0'}],{duration:520,easing:'cubic-bezier(.2,.75,.3,1)'});
 const bounds=panel.getBoundingClientRect();
 let order=0;
 for(const button of $('.index-grid').children){
  const rect=button.getBoundingClientRect();
  if(rect.bottom<bounds.top||rect.top>bounds.bottom)continue;
  button.animate([{opacity:0,translate:'0 28px',scale:'.97'},{opacity:1,translate:'0 -5px',scale:'1.01',offset:.7},{opacity:1,translate:'0 0',scale:'1'}],{duration:650,delay:Math.min(order++*35,300),fill:'backwards',easing:'cubic-bezier(.2,.75,.3,1)'});
 }
}
$('#browse').onclick=()=>{activity();target.copy(camera.position);panel.hidden=false;if(!indexLoaded){items.forEach((item,index)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',`View poster ${String(item.id).padStart(2,'0')}: ${series(item.id)}`);const img=new Image();img.src=item.thumb;img.alt=series(item.id);img.width=item.width;img.height=item.height;img.loading='lazy';b.append(img);b.onclick=()=>openPoster(index,b);$('.index-grid').append(b);});indexLoaded=true;}$('#close-index').focus({preventScroll:true});requestAnimationFrame(animatePosterIndex);};
function closeIndex(){panel.hidden=true;activity();$('#browse').focus({preventScroll:true});dirty=true;}$('#close-index').onclick=closeIndex;panel.addEventListener('keydown',e=>{if(e.key==='Escape'){e.stopPropagation();closeIndex();}});
function updateViewer(){const item=items[selection],img=$('.viewer-art img');img.src=item.full;img.alt=`${series(item.id)} — poster ${item.id}`;img.width=item.width;img.height=item.height;$('#viewer-title').textContent=series(item.id);}
function openPoster(index,node){dockIntro();activity();target.copy(camera.position);selection=index;opener=node;updateViewer();viewerOverflow=document.body.style.overflow;document.body.style.overflow='hidden';viewer.showModal();}
$('#close-viewer').onclick=()=>viewer.close();viewer.addEventListener('close',()=>{document.body.style.overflow=viewerOverflow;activity();(opener?.isConnected?opener:gallery).focus({preventScroll:true});dirty=true;});viewer.addEventListener('click',e=>{if(e.target===$('.viewer-art'))viewer.close();});
function next(d){selection=mod(selection+d,54);updateViewer();}$('#next').onclick=()=>next(1);$('#previous').onclick=()=>next(-1);viewer.addEventListener('keydown',e=>{e.stopPropagation();if(e.key==='ArrowRight'){e.preventDefault();next(1);}if(e.key==='ArrowLeft'){e.preventDefault();next(-1);}});
renderer?.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();roamEnabled=false;updateRoamButton();$('#instructions').hidden=false;$('#instructions').textContent='Graphics paused. Browse all or refresh to restore the space.';});renderer?.domElement.addEventListener('webglcontextrestored',()=>{chunkAt='';dirty=true;});

function alignIndexHeading(){
 const grid=$('.index-grid'),images=[...grid.querySelectorAll('img')];
 if(panel.hidden||!images.length)return;
 const columns=getComputedStyle(grid).gridTemplateColumns.split(' ').length;
 const bounds=grid.getBoundingClientRect();
 const edge=img=>{const r=img.getBoundingClientRect();const w=Math.min(r.width,r.height*Number(img.getAttribute('width'))/Number(img.getAttribute('height')));return {left:r.left+(r.width-w)/2,right:r.right-(r.width-w)/2};};
 $('.index-heading').style.paddingLeft=`${Math.max(0,edge(images[0]).left-bounds.left)}px`;
 $('.index-heading').style.paddingRight=`${Math.max(0,bounds.right-edge(images[Math.min(columns,images.length)-1]).right)}px`;
}
new ResizeObserver(alignIndexHeading).observe($('.index-grid'));
$('#browse').addEventListener('click',()=>requestAnimationFrame(alignIndexHeading));
