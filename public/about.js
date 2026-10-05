// Content sources and editorial boundaries: docs/about/SOURCES.md.
const experience = [
  {date:'Nov 2023 – Jun 2024', title:'UI & UX Intern', organization:'Bybit · Shanghai, China', body:'Worked on fiat deposit, withdrawal, and one-click buy experiences across mobile and web. Prototyped interfaces and collaborated with UX researchers and front-end developers on usability and implementation. Contributed to visual systems and design components with the UED and development teams.', link:true},
  {date:'Aug – Sep 2023', title:'Reset & Restart', organization:'Selected project', body:'Designed a toolkit and online platform to support people returning to their communities after incarceration. The work included product, packaging, and branding design.'},
  {date:'Jul – Sep 2022', title:'Easy Diet Project', organization:'Selected project', body:'Explored psychology, behavior, and eating disorders through interdisciplinary research and interviews with doctors. Designed a service intended to support people recovering from eating disorders.'}
];
const education = [
  ['Sep 2025 – Jun 2027 · Expected','University of Washington','MS in Technology Innovation','uw-logo.png'],
  ['Sep 2021 – Jun 2025','Shanghai Jiao Tong University','Bachelor of Design','sjtu-logo.png']
];
export function aboutPage() {
  return `<main id="main" class="shell about-page">
    <section class="about-intro" aria-labelledby="about-greeting">
      <div class="about-copy">
        <h1 id="about-greeting" data-reveal-words>Hi, I’m Yuwen Chen.</h1>
        <p class="about-lead" data-reveal-lines>I start with people, think through systems, and bring care to the details.</p>
        <p data-reveal-lines>I’m currently pursuing an MS in Technology Innovation at the University of Washington. Previously, I worked on fiat payment experiences at Bybit, collaborating with researchers and developers to improve usability and interface consistency.</p>
      </div>
      <figure class="about-portrait"><img src="/assets/about/yuwen-chen.jpg" width="1200" height="1200" alt="Portrait of Yuwen Chen" fetchpriority="high"></figure>
    </section>
    <div class="about-information">
      <section class="about-card experience-card" aria-labelledby="experience-heading" data-card-reveal>
        <h2 id="experience-heading">Experience</h2>
        <div class="experience-entries">${experience.map(item=>`<details class="experience-entry"><summary><span class="entry-date">${item.date}</span><span class="entry-heading"><span class="entry-title">${item.title}</span><span class="entry-organization">${item.organization}</span></span><span class="entry-toggle" aria-hidden="true"></span></summary><div class="entry-body"><p>${item.body}</p>${item.link?'<a class="text-link" href="/work/bybit">Read the Bybit case study <span aria-hidden="true">↗</span></a>':''}</div></details>`).join('')}</div>
      </section>
      <div class="about-card-grid">
        <section class="about-card education-card" aria-labelledby="education-heading" data-card-reveal><h2 id="education-heading">Education</h2><div class="education-entries">${education.map(([date,school,degree,logo])=>`<div class="education-entry"><img class="university-logo" src="/assets/about/${logo}" alt="" width="40" height="40"><h3>${degree}</h3><div class="education-meta"><p class="university-name">${school}</p><p class="entry-date">${date}</p></div></div>`).join('')}</div><div class="exchange-programs"><h3>Exchange Programs</h3><p class="exchange-row"><span>University of Sydney</span><span class="entry-date">Jul–Nov 2024</span></p><p class="exchange-row"><span>Korea University</span><span class="entry-date">Jun–Jul 2024</span></p></div></section>
        <section class="about-card skills-card" aria-labelledby="skills-heading" data-card-reveal><h2 id="skills-heading">Skills</h2><div class="skill-group"><h3>Design</h3><p>End-to-end product design · Interactive prototyping · Wireframing · Visual design · Usability studies</p></div><div class="skill-group"><h3>Tools &amp; Development</h3><p>Figma · Adobe Creative Suite · Principle · Cinema 4D · Unity · Arduino · Python · HTML/CSS</p></div></section>
      </div>
      <div class="resume-download" data-card-reveal><a class="resume-button" href="/assets/about/Yuwen-Chen-Resume.pdf" download="Yuwen-Chen-Resume.pdf">Download my resume <span aria-hidden="true">↓</span></a></div>
    </div>
  </main>`;
}
