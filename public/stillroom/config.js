export const gallery={id:'gallery',title:'Gallery ambience',tracks:[]};
export const paintings=[
{id:'nighthawks',title:'Nighthawks',artist:'Edward Hopper',year:'1942',color:'#101e1b',frame:'dark',note:'An all-night diner. A city at rest.',tracks:[]},
{id:'sunday',title:'A Sunday on La Grande Jatte',artist:'Georges Seurat',year:'1884–1886',color:'#252b22',frame:'gold',note:'A little breeze along the Seine.',tracks:[]},
{id:'bridge',title:'Water Lily Pond',artist:'Claude Monet',year:'1900',color:'#17251d',frame:'wood',note:'Beneath the bridge, the garden breathes.',tracks:[]},
{id:'wave',title:'The Great Wave off Kanagawa',artist:'Katsushika Hokusai',year:'1830–1833',color:'#202c33',frame:'wood',note:'Between the sea and the sky.',tracks:[]},
{id:'golconda',title:'Golconda',artist:'René Magritte',year:'1953',color:'#26272d',frame:'dark',note:'A city suspended in a quiet thought.',tracks:[]},
{id:'splash',title:'A Bigger Splash',artist:'David Hockney',year:'1967',color:'#20343c',frame:'simple',note:'The warm, unhurried air of an afternoon.',tracks:[]}
];

// Only user-reviewed recordings are connected. One mixed recording = one slider.
const approved = {
 gallery: ['Gallery space · voices & footsteps', 'gallery', .8],
 nighthawks: ['Quiet café · complete ambience', 'cafe', .75],
 bridge: ['Pond & garden · mono recording', 'pond', .8],
 sunday: ['Summer riverbank · complete ambience', 'river', .8],
 wave: ['Sea waves & breeze', 'sea', .75],
};
for (const scene of [gallery,...paintings]) {
 const recording=approved[scene.id];
 scene.tracks=recording?[{name:recording[0],file:`field/${recording[1]}.wav`,volume:recording[2]}]:[];
 scene.recordingStatus=recording?'user-reviewed':'replacement-needed';
 scene.missingMessage=scene.id==='splash'?'Poolside recording still needed':'City recording replacement needed';
}

// Missing independent layers are listed explicitly, never rendered as fake sliders.
const pending={gallery:['Separate room tone (voices and steps are mixed in the base)','Soft footsteps','Distant voices'],nighthawks:['Separate indoor room tone (dishes and voices are mixed in the base)','Cup and saucer details','Street outside','Optional jazz'],sunday:['Foliage breeze','Distant visitors','Birds (avoid doubling the base recording)'],bridge:['Foliage rustle','Birds (avoid doubling the pond recording)','Insects'],wave:['Separate sea wind (breeze is already in the base)','Wooden boat creaks'],golconda:['Quiet distant city · main recording','Rooftop breeze','Optional ambient music'],splash:['Poolside water · main recording','Water circulation','Summer breeze','Distant birds']};
for(const scene of [gallery,...paintings])scene.pendingTracks=pending[scene.id];

// Second-round user review: four recordings approved; rejected details remain absent.
const track=(name,file,volume)=>({name,file:`field/${file}.wav`,volume});
paintings.find(p=>p.id==='golconda').tracks=[track('Rooftop city · distant activity','roof-city',.75),track('Light foliage wind · recorded separately','wind',.12)];
paintings.find(p=>p.id==='splash').tracks=[track('Morning poolside · water, pump & birds','pool-morning',.8)];
paintings.find(p=>p.id==='bridge').tracks.push(track('Foliage wind · independent recording','wind',.10),track('Daytime insects · independent recording','insects',.08));
paintings.find(p=>p.id==='sunday').tracks.push(track('Foliage wind · independent recording','wind',.10));
for(const id of ['golconda','splash'])paintings.find(p=>p.id===id).recordingStatus='user-reviewed';
paintings.find(p=>p.id==='bridge').pendingTracks=['Separate birds (avoid doubling the base)'];
paintings.find(p=>p.id==='sunday').pendingTracks=['Distant visitors','Separate birds (avoid doubling the base)'];
paintings.find(p=>p.id==='golconda').pendingTracks=['Rooftop breeze (current wind was recorded in foliage)','Optional ambient music'];
paintings.find(p=>p.id==='splash').pendingTracks=['Separate pump (circulation is mixed in the base)','Summer breeze','Separate birds (birds are mixed in the base)'];

// Dimensions of the actual hosted full images, prepared before any image loads.
const artworkGeometry={nighthawks:[843,461,13,3],sunday:[1800,1206,17,8],bridge:[1800,1600,11,5],wave:[1800,1233,5,24],golconda:[358,287,6,2],splash:[323,319,5,5]};
for(const p of paintings){const [width,height,border,padding]=artworkGeometry[p.id];p.imageSize={width,height};p.miniFrame={border,padding};}

// Round-three source recordings were approved by the user. Event variations
// share one gain and one persisted mix key; no variation gets a fake slider.
gallery.tracks[0].name='Gallery ambience';gallery.tracks[0].note='This mixed recording includes voices and footsteps. Footsteps controls the added event layer only.';
const cafe=paintings.find(p=>p.id==='nighthawks');cafe.tracks[0].name='Café ambience';cafe.tracks[0].note='This mixed recording includes voices and dishes. Tableware controls the added event layer only.';
gallery.tracks.push({name:'Footsteps',file:'events/footsteps',event:true,variants:[0,1,2].map(i=>`events/footsteps-${i}.wav`),interval:[40,95],volume:.14});
cafe.tracks.push({name:'Tableware',file:'events/tableware',event:true,variants:[0,1].map(i=>`events/tableware-${i}.wav`),interval:[30,80],volume:.22});
gallery.pendingTracks=['Clean room tone to replace mixed Gallery ambience','Separate distant voices'];cafe.pendingTracks=['Clean indoor hum to replace mixed Café ambience','Distant street outside'];

// Curatorial priorities: no forced fourth Monet layer or music placeholder.
paintings.find(p=>p.id==='bridge').pendingTracks=[];
paintings.find(p=>p.id==='golconda').pendingTracks=['Open-air wind replacement · round-four review'];
paintings.find(p=>p.id==='sunday').pendingTracks=['Distant visitors or boats · later recording batch'];
paintings.find(p=>p.id==='splash').pendingTracks=['Summer air · round-four review','Independent circulation · later recording batch'];

// Describe recorded content honestly; missing-layer work stays on the review page.
paintings.find(p=>p.id==='wave').tracks[0].note='Waves and wind are mixed in this recording and cannot be adjusted separately.';
paintings.find(p=>p.id==='splash').tracks[0].note='Pool water, pump and birds are mixed in this recording and cannot be adjusted separately.';
