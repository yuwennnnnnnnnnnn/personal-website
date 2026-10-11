import { documentCards } from './slic-documents.js';
import { caseDirectory } from './case-study.js';
import { sydneyExchangeDate } from './about.js';

const image = (file, alt, width, height, eager = false) => `<figure class="slic-image"><button class="image-button" type="button" data-image="/assets/slic/${file}" data-caption="${alt}" aria-label="Enlarge: ${alt}"><img src="/assets/slic/${file}" alt="${alt}" width="${width}" height="${height}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'}></button></figure>`;

const team = [['alia-ardon','Alia','Ardon'],['mannav-badal','Mannav','Badal'],['benjamin-druittne','Benjamin','Druittne'],['thomas-duff','Thomas','Duff'],['penelope-personnaz','Pénélope','Personnaz'],['yuwen-chen','Yuwen','Chen']];

export function slicPage() {
  const directory = caseDirectory([['overview','About SLIC'],['community','Community & empowerment'],['arts-culture','Arts & Culture Team'],['resources','Project documents'],['reflection','What stayed with me']]).replace('href="/"','href="/about"').replace('Back to Home','Back to About');
  return `<main id="main" class="shell case-layout slic-page">${directory}<article class="case-content">
    <section id="overview" class="story-section slic-overview">
      <h1>About SLIC</h1><p class="overview-subtitle">Service Learning in Indigenous Communities</p>
      <p class="overview-intro">This project centered on " empowerment " took me to Queensland, where I collaborated with Indigenous communities to address cultural preservation and future planning.</p>
      <dl class="project-meta"><div><dt>TIMELINE</dt><dd>${sydneyExchangeDate}</dd></div><div><dt>TEAM</dt><dd>Arts &amp; Culture</dd></div><div><dt>LOCATION</dt><dd>Queensland, Australia</dd></div></dl>
      ${image('community.png','SLIC community activities in Queensland',3000,1367,true)}
    </section>
    <section id="community" class="story-section"><h2>Community &amp; empowerment</h2><p>My approach to building community revolves around the core concept of empowerment, based on empathy, respect, and recognizing the inner power of community members. During my exchange program at the University of Sydney, I had the opportunity to join the SLIC (Service Learning in Indigenous Communities) program, which provided a first-hand experience of what it truly means to empower a community by working alongside them, rather than for them.</p><p>An important moment in the program was the three-day Family Wellbeing workshop, an empowerment initiative designed by Indigenous leaders. This workshop builds up strong emotional bonds between our group and the community, preparing us to engage with an open mind and genuine respect. Through this experience, I realized that Indigenous communities hold deep expertise on the issues that affect them, and they often have the solutions but need to be heard. This understanding shaped my view of empowerment: it’s not just imposing outside solutions but about supporting the community in recognizing and strengthening their own capacities. We need to listen, understand, and help them unlock their potential rather than overshadow it with our own ideas.</p></section>
    <section id="arts-culture" class="story-section"><h2>Arts &amp; Culture Team</h2>
      <ul class="slic-team" aria-label="Arts and Culture team members">${team.map(([file,first,last]) => `<li><img src="/assets/slic/team/${file}.png" alt="" width="64" height="64" loading="lazy"><span>${first}<br>${last}</span></li>`).join('')}</ul>
      <p>As part of the arts and culture team, I collaborated closely with the leaders of Cardwell Art Centre to assess their financial situation and plan for sustainable development. One memorable day, we gathered barefoot on the grass to conduct a SWOT analysis and later presented our findings under the shade of a tree to the community elders. This simple setting emphasized the authenticity of our interactions and the mutual respect between us. When I left, I was touched to receive a woven necklace from the community—a gesture of acceptance and appreciation. It reminded me that empowerment goes both ways; by helping them strengthen their community, I was also enriched and empowered by their warmth and support.</p><p>The SLIC program instilled in me that true empowerment is a commitment to long-term growth. Empowerment is not just about providing temporary solutions; it’s about inspiring community members to recognize their own potential, enabling them to continue growing beyond our collaboration. This experience solidified my design philosophy: whether collaborating with physical communities or serving global users on a digital platform, my ultimate goal is to empower individuals to take charge of their own futures. This commitment to empowerment has profoundly influenced my approach to community engagement and remains at the heart of my career aspirations.</p>
    </section>
    ${image('semester-2-2024.png','SLIC Semester 2, 2024 group photo',2940,1650)}
    <section id="resources" class="story-section"><h2>Project documents</h2>${documentCards()}</section>
    
    <section id="reflection" class="story-section slic-reflection" aria-labelledby="reflection-heading">
      <h2 id="reflection-heading">What stayed with me</h2>
      <div class="slic-reflection-part"><h3>Growing comfortable with speaking up</h3>
        <p>Growing up in China, I often showed respect by listening and staying quiet. During the three day Empowerment workshop, I was encouraged to share my thoughts, even when I struggled to find the words in English. The group’s patience helped me feel comfortable talking about my uncertainties. Experiencing that myself made me more aware of what participation asks of people. Inviting someone to speak is only a beginning. How we listen and respond affects whether they feel comfortable sharing more.</p>
      </div>
      <div class="slic-reflection-part"><h3>Becoming more aware of my assumptions</h3>
        <p>Before SLIC, I had a limited understanding of the differences between Indigenous communities. Sitting in a circle and listening to people talk about their lives made those gaps in my knowledge clear. I began to pay closer attention to the particular histories, relationships, and priorities behind what people shared. It reminded me how much I can miss when I arrive with a broad idea of who a group of people are.</p>
      </div>
      <div class="slic-reflection-part"><h3>Thinking about what can continue</h3>
        <p>In the Arts &amp; Culture team, we discussed how to involve young people and support knowledge sharing across generations within an available budget. Those conversations made sustainability feel concrete to me: what resources already exist, what people want to carry forward, and what a community can continue after a student team leaves. I left with a stronger habit of asking these questions before getting attached to an idea.</p>
      </div>
    </section>
  </article></main>`;
}
