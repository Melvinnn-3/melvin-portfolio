"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Instagram, Youtube, Mail, Clapperboard,  Video, Film, Aperture,  MapPin } from "lucide-react";
import BuildAgents from "@/components/build-agents";

const skills = [
  "Video Editing", "Videography", "Storytelling", "Concept Development",
  "Scripting", "Creative Direction", "Event Coverage", "Social Media Content Creation",
  "Colour Correction", "Colour Grading", "Audio Selection", "Sound Effects",
  "Promotional Content", "Social Media Publishing", "Content Planning"
];

const tools = ["CapCut (PC)", "VN (Mobile)", "Canva"];

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="tag">{children}</span>;
}

export default function Home() {
  return (
    <main>
      <BuildAgents />
      <div className="boot-screen" aria-hidden="true">
        <div className="boot-mark">MM<span>.</span></div>
        <div className="boot-line"><i /></div>
        <p>PREPARING THE FRAME</p>
      </div>

      <nav className="top-nav">
        <Link href="#home" className="nav-logo">MM<span>.</span></Link>
        <div className="nav-links">
          <Link href="#work">Work</Link><Link href="#record">Record</Link><Link href="#about">About</Link>
        </div>
        <Link href="#contact" className="nav-contact">LET’S TALK <ArrowUpRight size={13} /></Link>
      </nav>

      <section id="home" className="hero section-wrap">
        <div className="hero-bg-word" data-build="wipe" aria-hidden="true">PORTFOLIO</div>
        <div className="hero-glow" />
        <div className="hero-copy">
          <p className="handwritten" data-build="type">Hello, I’m</p>
          <h1 data-build="type">Melvin<br /><span>Mathew.</span></h1>
          <p className="hero-role" data-build="type">CREATIVE MEDIA &amp; CONTENT CREATOR</p>
          <p className="hero-description" data-build="type">
            I create visual stories through video, content and creative direction — taking ideas from the first frame to the final edit.
          </p>
          <div className="hero-actions" data-build="pop">
            <Link href="#work" className="primary-button">VIEW MY WORK <ArrowUpRight size={16} /></Link>
            <span className="location"><MapPin size={13} /> ERNAKULAM, KERALA</span>
          </div>
        </div>
        <div className="hero-person" data-build="pop">
          <div className="portrait-ring" />
          <Image src="/headshot.png" alt="Melvin Mathew in a black suit" fill priority sizes="(max-width: 700px) 90vw, 58vw" className="portrait" />
        </div>
        <div className="hero-stats" data-build="pop">
          <div><strong>8K<span>+</span></strong><small>YOUTUBE SUBSCRIBERS</small></div>
          <div><strong>3.5M<span>+</span></strong><small>INSTAGRAM REEL VIEWS</small></div>
          <div><strong>40<span>+</span></strong><small>CREATIVE WORKS</small></div>
        </div>
        <div className="hero-bottom"><span>SCROLL TO EXPLORE</span><ArrowDown size={14} /><span>01 / 05</span></div>
      </section>

      <section id="work" className="section section-wrap">
        <div className="section-heading">
          <div><p className="eyebrow" data-build="type">01 — SELECTED WORK</p><h2 data-build="wipe">Work that<br /><em>connects.</em></h2></div>
          <div className="section-intro" data-build="type"><p>From creator-led content to collaborative event coverage, I turn moments and ideas into stories people want to watch.</p><div className="mini-stats"><span><b>2M+</b> YouTube Short views</span><span><b>100K+</b> Long-form video views</span></div></div>
        </div>

        <div className="work-grid">
          <article className="work-card work-feature" data-build="pop">
            <div className="work-number">01 / CREATOR PROJECT</div>
            <div className="work-icon"><Youtube size={23} /></div>
            <h3>YouTube Gaming<br /><span>Channel</span></h3>
            <p className="work-handle">@melvyn_og</p>
            <ul>
              <li>Built a gaming-focused channel to 8,000+ subscribers.</li>
              <li>Created and personally edited 300+ videos during its active period.</li>
              <li>Managed editing, thumbnails, titles and descriptions independently.</li>
              <li>One YouTube Short reached 2M+ views.</li>
            </ul>
            <div className="work-footer"><div><Tag>Video editing</Tag><Tag>Thumbnails</Tag><Tag>Content</Tag></div><a href="https://youtube.com/@melvyn_og" target="_blank" rel="noreferrer" aria-label="Visit YouTube channel"><ArrowUpRight size={18} /></a></div>
          </article>
          <article className="work-card" data-build="pop">
            <div className="work-number">02 / SOCIAL CONTENT</div>
            <div className="work-icon"><Instagram size={23} /></div>
            <h3>Instagram<br /><span>Content &amp; Reel</span></h3>
            <p className="work-handle">Short-form visual storytelling</p>
            <ul>
              <li>Edited an Instagram Reel that achieved 3.5M+ views.</li>
              <li>Developed experience in short-form content editing.</li>
              <li>Focused on audience engagement through visual pacing and storytelling.</li>
            </ul>
            <div className="work-footer"><div><Tag>Reels</Tag><Tag>Editing</Tag><Tag>Storytelling</Tag></div><a href="https://www.instagram.com/melvyn.og/" target="_blank" rel="noreferrer" aria-label="Visit Instagram"><ArrowUpRight size={18} /></a></div>
          </article>
          <article className="work-card" data-build="pop">
            <div className="work-number">03 / COLLABORATIVE WORK</div>
            <div className="work-icon"><Clapperboard size={23} /></div>
            <h3>College &amp;<br /><span>Organization Media</span></h3>
            <p className="work-handle">College · IEEE · TEDx · Robotics Club</p>
            <ul>
              <li>Active contributor to college and student organization media teams.</li>
              <li>Shoot and edit event highlights, promotional Reels and social content.</li>
              <li>Independently execute creative assignments and contribute to published work.</li>
              <li>Completed approximately 20 college-related creative works.</li>
            </ul>
            <div className="work-footer"><div><Tag>Event coverage</Tag><Tag>Promotional</Tag><Tag>Teamwork</Tag></div><span className="work-link-note">ONGOING</span></div>
          </article>
        </div>
      </section>

      <section id="stack" className="stack-section">
        <div className="section-wrap stack-inner">
          <p className="eyebrow" data-build="type">02 — THE TOOLKIT</p>
          <div className="section-heading stack-heading"><h2 data-build="wipe">Tools of<br /><em>the trade.</em></h2><p data-build="type">A practical toolkit for shaping ideas, refining footage and delivering content.</p></div>
          <div className="tool-marquee" data-build="pop">
            <div className="marquee-track">
              {[...tools, ...tools, ...tools, ...tools].map((tool, i) => <span key={`${tool}-${i}`}><b>✳</b>{tool}</span>)}
            </div>
          </div>
          <div className="tool-cards">
            <div data-build="pop"><span className="tool-index">01</span><Film /><h3>CapCut</h3><p>PC editing</p></div>
            <div data-build="pop"><span className="tool-index">02</span><Video /><h3>VN</h3><p>Mobile editing</p></div>
            <div data-build="pop"><span className="tool-index">03</span><Aperture /><h3>Canva</h3><p>Design &amp; visual assets</p></div>
          </div>
        </div>
      </section>

      <section id="record" className="section section-wrap">
        <div className="section-heading">
          <div><p className="eyebrow" data-build="type">03 — THE RECORD</p><h2 data-build="wipe">The path<br /><em>so far.</em></h2></div>
          <p className="section-intro" data-build="type">A growing creative journey built through independent projects, collaborative teams and continuous practice.</p>
        </div>
        <div className="timeline">
          <div className="timeline-item" data-build="pop"><span className="timeline-year">ONGOING</span><div><h3>Creative Media Team Member</h3><p>College &amp; Student Organizations</p><ul><li>College, IEEE, TEDx and Robotics Club media teams</li><li>Event highlights, promotional Reels and social media content</li></ul></div><span className="timeline-dot" /></div>
          <div className="timeline-item" data-build="pop"><span className="timeline-year">FREELANCE</span><div><h3>Independent Video Editor &amp; Content Creator</h3><p>Personal, client and voluntary projects</p><ul><li>40+ creative works across different projects</li><li>Video shooting, concept development, editing, colour correction and audio selection</li><li>Both paid and voluntary creative assignments</li></ul></div><span className="timeline-dot" /></div>
          <div className="timeline-item" data-build="pop"><span className="timeline-year">2024 — 2028</span><div><h3>B.Tech — Electronics &amp; Communication Engineering</h3><p>Viswajyothi College of Engineering and Technology, Vazhakulam</p><p className="timeline-note">Currently pursuing</p></div><span className="timeline-dot" /></div>
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="section-wrap">
          <p className="eyebrow" data-build="type">04 — A LITTLE ABOUT ME</p>
          <div className="about-layout">
            <h2 data-build="wipe">Curiosity<br />behind every<br /><em>cut.</em></h2>
            <div className="about-copy" data-build="type">
              <p>I’m Melvin Mathew, a Creative Media &amp; Content Creator based in Ernakulam, Kerala. My work spans video editing, content production, event coverage and visual storytelling.</p>
              <p>I enjoy taking creative assignments from concept to final edit — shaping footage with thoughtful pacing, colour, sound and a clear sense of story. I’ve worked independently and alongside college and student organization media teams.</p>
            </div>
          </div>
          <div className="skills-area">
            <div className="skills-title" data-build="type"><span>WHAT I BRING</span><p>Creative skills &amp; production</p></div>
            <div className="skills-grid">{skills.map((skill, i) => <span key={skill} data-build={i % 3 === 0 ? "pop" : "type"}>{skill}</span>)}</div>
          </div>
          <div className="principles">
            <div data-build="pop"><span>01</span><h3>Story first.</h3><p>Make every frame serve the story.</p></div>
            <div data-build="pop"><span>02</span><h3>Think creatively.</h3><p>Explore the idea before the edit.</p></div>
            <div data-build="pop"><span>03</span><h3>Own the process.</h3><p>From concept through final delivery.</p></div>
            <div data-build="pop"><span>04</span><h3>Build together.</h3><p>Make better work through collaboration.</p></div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section section-wrap">
        <p className="eyebrow" data-build="type">05 — YOUR NEXT IDEA STARTS HERE</p>
        <div className="contact-card" data-build="pop">
          <div className="contact-orbit" />
          <div className="contact-content">
            <p className="handwritten">Have a story to tell?</p>
            <h2>LET’S MAKE<br /><span>IT MATTER.</span></h2>
            <p>For creative projects, collaborations and opportunities — I’d love to hear from you.</p>
            <a className="primary-button" href="mailto:melvinmathew9947@gmail.com">GET IN TOUCH <ArrowUpRight size={17} /></a>
          </div>
          <div className="contact-side">
            <a href="mailto:melvinmathew9947@gmail.com"><Mail size={17} /> melvinmathew9947@gmail.com <ArrowUpRight size={14} /></a>
            <a href="https://www.instagram.com/melvyn.og/" target="_blank" rel="noreferrer"><Instagram size={17} /> Instagram <ArrowUpRight size={14} /></a>
            <a href="https://youtube.com/@melvyn_og?si=ObnUE-gP_UA5Q3BB" target="_blank" rel="noreferrer"><Youtube size={17} /> YouTube <ArrowUpRight size={14} /></a>
          </div>
        </div>
        <footer><Link href="#home" className="nav-logo">MM<span>.</span></Link><p>© {new Date().getFullYear()} MELVIN MATHEW. MADE WITH INTENTION.</p><Link href="#home" className="back-top">BACK TO TOP <ArrowUpRight size={13} /></Link></footer>
      </section>
    </main>
  );
}
