const base = '/assets/handmaiden/';
const images = {
 cover: ['imgScreenshot20240715At2036001.png',1774,1182,'The original purple-blue photobook cover featuring Hideko and Sookee'],
 artwork: ['imgFrame14101188291.png',4096,3072,'Cover artwork with blurred portraits and a vibrant red title'],
 characters: ['imgScreenshot20240715At163706.png',1876,466,'Lady Hideko, Sookee, Count Fujiwara and Kouzuki, from left to right'],
 poster: ['imgScreenshot20240715At163719.png',1460,1624,'The Handmaiden film poster'],
 story: ['img54F2345100658958Df7Ec64A5Eb1.png',1400,467,'Hideko in a richly coloured scene from The Handmaiden'],
 richness: ['imgScreenshot20240715At2246531.png',1300,866,'Western furniture and Eastern decorative objects in the film’s interior'],
 fusion: ['imgImage17.png',2974,1258,'The mansion combines Japanese and Western architecture'],
 grid: ['imgScreenshot20240715At2149131.png',960,722,'Guidelines for the photobook page composition'],
 layout: ['imgScreenshot20240715At2140561.png',2474,1234,'Complete overview of the photobook’s page layouts in reading order'],
 book: ['imgTutieshi640X36024S1.png',640,360,'Photobook presentation showing the cover'],
 spread1: ['imgScreenshot20240715At2033511.png',3254,1848,'Opening book spread introducing The Handmaiden and director Park Chan-wook'],
 spread2: ['imgScreenshot20240715At2036311.png',2864,1328,'Inner pages featuring a garden scene and the film’s architecture'],
 spread3: ['imgScreenshot20240715At2039361.png',2778,1324,'Inner pages combining character portraits, film stills and narrative text'],
 ending: ['img493B385100658958Eb4948182A9.png',900,506,'Deep blue atmospheric closing image']
};
const photo = (key, node, caption = '') => {const [file,w,h,alt]=images[key];return `<figure class="hm-photo hm-${key}" data-figma-node="${node}"><button class="image-button" data-image="${base+file}" data-caption="${alt}" aria-label="Enlarge: ${alt}"><img src="${base+file}" width="${w}" height="${h}" alt="${alt}" loading="lazy"></button>${caption?`<figcaption>${caption}</figcaption>`:''}</figure>`;};
const section = (content, muted=false) => `<section class="hm-section ${muted?'hm-muted':''}"><div class="shell hm-content">${content}</div></section>`;
export function handmaidenPage(){return `<main id="main" class="handmaiden-page">
<section class="hm-screen hm-hero" aria-label="The Handmaiden photobook cover">
<img class="hm-cover-animation" src="${base}cover-original.gif" width="1000" height="474" alt="" fetchpriority="high">
<div class="hm-cover-glow" aria-hidden="true"></div>
<img class="hm-cover-wordmark" src="${base}imgSectionProjectModule13Ae96A5100658958Df73Ada6B92Png.png" width="1012" height="168" alt="A film by Park Chan-wook — The Handmaiden" fetchpriority="high">
<span class="hm-cover-line" aria-hidden="true"></span><p class="hm-cover-label">PHOTOBOOK</p>
<a class="text-link hm-cover-return" href="/visual-works">← Back to Play</a>
</section>
${section(`<div class="hm-overview"><dl class="hm-meta"><div><dt>PROJECT TYPE</dt><dd>Book Design</dd></div><div><dt>TEAM</dt><dd>Individual Project</dd></div><div><dt>TIMELINE</dt><dd>July 10–14, 2024</dd></div><div><dt>POSITION / ROLE</dt><dd>Graphic Designer</dd></div><div><dt>TOOLS</dt><dd>Figma<br>Adobe Sets</dd></div></dl></div>`)}
${section(`<h2 id="inner-pages">The Handmaiden photobook</h2><div id="handmaiden-book"><p>Loading photobook…</p></div>`)}
${section(`<h2>About <em>The Handmaiden</em></h2><h3>Main characters</h3><div class="hm-character-layout"><div>${photo('characters','21:59,21:61')}<p class="hm-character-names">Lady Hideko · Sookee · Count Fujiwara · Kouzuki</p></div>${photo('poster','21:65')}</div><h3>Main story</h3><p>Set during the Japanese occupation of Korea in the 1930s, a young handmaiden named Sookee is hired by Lady Hideko, a reclusive heiress who lives in a sprawling mansion under the watchful eye of her domineering Uncle Kouzuki.</p><p>But Sookee harbours a secret: she has been recruited by Fujiwara, a scheming con artist posing as a Japanese Count, to trick Hideko into entrusting him with her fortune. However, when Sookee and Hideko begin to develop unexpected emotions for each other, they start putting together a plan of their own.</p>${photo('story','21:71')}`)}
${section(`<div class="hm-two"><div><h2>Visual Richness</h2>${photo('richness','21:76')}<p>In the film, you can see a fusion of Western furniture, Japanese bonsai, Eastern porcelain, and Japanese tatami mats...</p><p>The film is a visual feast, every frame feels like a piece of art, making it a perfect subject for a photo book.</p></div><div><h2>Cultural Fusion</h2>${photo('fusion','21:81')}<p>The uncle of Hideko is a Korean who aspires to become a Japanese nobleman, resulting in a set design that uniquely blends Eastern and Western cultures.</p><p>This cultural fusion is not only fascinating but also visually distinctive, offering a rich tapestry of historical and cultural references to analyze or re-design.</p></div></div>`,true)}
${section(`<h2>Design goal</h2><p class="hm-goal overview-subtitle">Design a <em>photo book</em> to explore the film’s visual storytelling</p><p>A photobook serves as an accessible resource for both fans of the film and those new to it, inviting discussions about its artistry and impact. It also allows for a unique exploration of visual storytelling, capturing the film’s rich imagery and artistic elements in a cohesive format.</p>`)}
${section(`<h2>Design System</h2><div class="hm-two"><div><h3>Fonts</h3><p class="hm-script">Pinyon Script</p><div class="hm-font-sizes"><span>Pinyon Script-26</span><span>Pinyon Script-18</span></div></div><div><h3>Colours</h3><div class="hm-swatches"><div style="--swatch:#051830">Dark Purple<br><span>#051830</span></div><div style="--swatch:#8785a0">Purple<br><span>#8785A0</span></div><div style="--swatch:#fe6b80">Pink<br><span>#FE6B80</span></div></div></div></div><div class="hm-rules">${photo('grid','21:123')}<div><h3>Layout rules</h3><h4>Balance of Text and Images</h4><p>I aimed for a balanced layout that features both text and images. Context can’t overwhelm the visuals, allowing the images to shine.</p><h4>White Space</h4><p>Adequate white space is incorporated to prevent clutter and allow each image to breathe. This creates a clean and sophisticated look, enhancing the overall visual experience.</p><h4>Guide lines</h4><p>By using guiding lines, I can place images and text freely within the defined space, ensuring a balanced composition while exploring dynamic arrangements.</p></div></div>`,true)}
${section(`<h2>Layout design</h2>${photo('layout','21:129')}`)}
${section(`<h2>Photo book demonstration</h2><h3>Cover page</h3><div class="hm-covers">${photo('cover','21:134')}${photo('artwork','21:135')}</div><p>The cover uses a soft purple-blue and slightly blurred images of Hideko and Sookee, while the title is in a vibrant red.</p>`,true)}
<figure class="hm-screen hm-ending"><img class="hm-screen-motion" src="${base}back-cover-original.gif" width="900" height="506" alt="Original animated back cover of The Handmaiden photobook" loading="lazy"></figure></main>`;}
