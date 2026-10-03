import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SKILL_CATEGORIES } from '../../core/data/skills.data';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { SkillCardComponent } from '../../shared/components/skill-card/skill-card.component';
import { ToolCardComponent } from '../../shared/components/tool-card/tool-card.component';
import { ProjectService } from '../../core/services/project.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, SectionTitleComponent, SkillCardComponent, ToolCardComponent, ProjectCardComponent],
  template: `
    <main class="page-shell">
      <section class="hero container">
        <div class="hero__content">
          <span class="eyebrow">Hi There! 👋</span>
          <h1>I'M POOJA PATEL</h1>
          <h2>Full Stack Developer</h2>
          <p>
            Full Stack Web Developer focused on building scalable, responsive and user-friendly web applications.
          </p>
          <div class="hero__actions">
            <a class="primary-btn" routerLink="/projects">View Projects</a>
            <a class="secondary-btn" routerLink="/about">About Me</a>
          </div>
        </div>

        <div class="hero__art" aria-label="Project preview illustration">
          <div class="hero__art-card">
            <div class="project-preview">
              <div class="project-preview__topbar">
                <span class="project-preview__logo">L</span>
                <div class="project-preview__nav">
                  <span>Home</span>
                  <span>Sports</span>
                  <span>Events</span>
                  <span>Membership</span>
                  <span>Download</span>
                </div>
              </div>

              <div class="project-preview__content">
                <div class="project-preview__copy">
                  <p class="project-preview__eyebrow">Let’s View App</p>
                  <h3>Let’s view sports App</h3>
                  <p>
                    Helps you play a match without the hassle of booking a turf and managing availability.
                  </p>
                  <div class="project-preview__actions">
                    <button type="button" class="project-preview__btn">Start Now</button>
                    <button type="button" class="project-preview__btn project-preview__btn--ghost">Download</button>
                  </div>
                  <div class="project-preview__stats">
                    <div>
                      <strong>58</strong>
                      <span>Users</span>
                    </div>
                    <div>
                      <strong>23</strong>
                      <span>Matches</span>
                    </div>
                  </div>
                </div>

                <div class="project-preview__phone" aria-hidden="true">
                  <div class="phone-screen">
                    <div class="phone-screen__top">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div class="phone-screen__body">
                      <div class="phone-screen__badge">Live</div>
                      <div class="phone-screen__icon">⚽</div>
                      <div class="phone-screen__graph"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section container">
        <app-section-title
          eyebrow="About"
          title="Know Who"
          highlight="I'M"
          subtitle="I help teams build modern digital experiences with a strong focus on scalable frontend architecture, reusable UI patterns, and production-grade engineering."
        ></app-section-title>

        <div class="about-preview">
          <div class="about-preview__card glass-card">
            <h3>Professional Summary</h3>
            <p>
              Pooja Patel is a Full Stack Developer with a strong focus on enterprise web applications, modern frontend systems, and API-driven experiences.
            </p>
            <p>
              My work spans Angular, TypeScript, C#, .NET, ASP.NET Core and scalable application architecture, helping businesses turn complex requirements into intuitive digital products.
            </p>
          </div>

          <div class="about-preview__highlights glass-card">
            <ul>
              <li>Enterprise application development</li>
              <li>Responsive UI development</li>
              <li>Reusable component architecture</li>
              <li>API integration</li>
              <li>Performance optimization</li>
              <li>Full-stack development</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="section container">
        <app-section-title
          eyebrow="Skillset"
          title="Professional"
          highlight="Skillset"
          subtitle="A full-stack Angular and .NET toolkit built around frontend engineering, backend systems, architecture, and product delivery."
        ></app-section-title>

        <div class="skill-categories">
          <section class="skill-category" *ngFor="let category of skillCategories">
            <h3 class="skill-category__title">{{ category.title }}</h3>
            <div class="skills-grid">
              <app-skill-card
                *ngFor="let skill of category.skills"
                [icon]="skill.icon"
                [title]="skill.title"
                [label]="skill.label"
              ></app-skill-card>
            </div>
          </section>
        </div>
      </section>

      <section class="section container">
        <app-section-title
          eyebrow="Featured Projects"
          title="My Recent"
          highlight="Works"
          subtitle="A sample of the product thinking and engineering quality I bring to modern web applications."
        ></app-section-title>

        <div class="projects-grid">
          <app-project-card *ngFor="let project of featuredProjects; trackBy: trackByProjectId" [project]="project"></app-project-card>
        </div>
      </section>

      <section class="section container">
        <app-section-title
          eyebrow="Tools"
          title="Tools I"
          highlight="Use"
        ></app-section-title>

        <div class="tools-grid">
          <app-tool-card icon="🪟" label="Windows"></app-tool-card>
          <app-tool-card icon="💻" label="VS Code"></app-tool-card>
          <app-tool-card icon="📡" label="Postman"></app-tool-card>
          <app-tool-card icon="🧰" label="Git"></app-tool-card>
          <app-tool-card icon="🐙" label="GitHub"></app-tool-card>
          <app-tool-card icon="🔍" label="Chrome DevTools"></app-tool-card>
        </div>
      </section>

      <section class="section container">
        <div class="github-panel glass-card">
          <div>
            <p class="eyebrow">Coding rhythm</p>
            <h3>Days I Code</h3>
          </div>
          <div class="github-panel__grid" aria-label="Placeholder GitHub contribution graph">
            <span *ngFor="let item of contributionDays; trackBy: trackByIndex" [style.opacity]="item"></span>
          </div>
          <p class="github-panel__note">This section is structured for GitHub API integration and can be connected to your profile later.</p>
        </div>
      </section>

      <section class="section container">
        <div class="cta-panel glass-card">
          <div>
            <p class="eyebrow">Let’s build</p>
            <h3>Need a reliable frontend engineer for your next product?</h3>
          </div>
          <a class="primary-btn" routerLink="/projects">View Projects</a>
        </div>
      </section>
    </main>
  `,
  styles: [
    `
      .page-shell {
        position: relative;
        z-index: 1;
      }

      .hero {
        display: grid;
        grid-template-columns: 1.1fr 0.9fr;
        align-items: center;
        gap: 2.5rem;
        min-height: 72vh;
        padding-top: 3.5rem;
      }

      .eyebrow {
        display: inline-block;
        margin-bottom: 1rem;
        color: var(--accent-primary);
        letter-spacing: 0.16em;
        text-transform: uppercase;
        font-size: 0.74rem;
        font-weight: 700;
      }

      .hero__content h1 {
        margin: 0;
        font-size: clamp(2.6rem, 5vw, 4.8rem);
        line-height: 0.98;
        letter-spacing: -0.06em;
      }

      .hero__content h2 {
        margin: 0.65rem 0 1rem;
        font-size: clamp(1.4rem, 2vw, 2.2rem);
        color: var(--accent-primary);
      }

      .hero__content p {
        max-width: 620px;
        margin: 0;
        color: var(--text-secondary);
        line-height: 1.8;
        font-size: 1.04rem;
      }

      .hero__actions {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin-top: 2rem;
      }

      .hero__art {
        display: flex;
        justify-content: center;
      }

      .hero__art-card {
        position: relative;
        width: min(100%, 560px);
        border-radius: 28px;
        background: rgba(11, 9, 18, 0.75);
        border: 1px solid rgba(184, 76, 255, 0.28);
        box-shadow: 0 28px 60px rgba(184, 76, 255, 0.12), inset 0 1px 0 rgba(255,255,255,0.06);
        padding: 1.1rem;
      }

      .project-preview {
        background: rgba(255,255,255,0.09);
        border: 1px solid rgba(184, 76, 255, 0.18);
        border-radius: 22px;
        overflow: hidden;
        backdrop-filter: blur(10px);
      }

      .project-preview__topbar {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.9rem 1rem;
        border-bottom: 1px solid rgba(184, 76, 255, 0.16);
        background: rgba(255,255,255,0.02);
      }

      .project-preview__logo {
        display: inline-grid;
        place-items: center;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: linear-gradient(135deg, #d4a3ff, #8b5cf6);
        color: #1d1029;
        font-weight: 800;
        font-size: 0.8rem;
      }

      .project-preview__nav {
        display: flex;
        flex-wrap: wrap;
        gap: 0.8rem;
        color: rgba(245, 241, 255, 0.7);
        font-size: 0.72rem;
      }

      .project-preview__content {
        display: grid;
        grid-template-columns: 1.2fr 0.8fr;
        gap: 1rem;
        padding: 1rem;
      }

      .project-preview__copy {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0.5rem 0.2rem 0.5rem 0.5rem;
      }

      .project-preview__eyebrow {
        margin: 0 0 0.6rem;
        color: var(--accent-primary);
        font-size: 0.72rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }

      .project-preview__copy h3 {
        margin: 0;
        font-size: clamp(1.6rem, 2.2vw, 2.4rem);
        line-height: 1.1;
      }

      .project-preview__copy p {
        margin: 0.8rem 0 0;
        color: var(--text-secondary);
        line-height: 1.7;
      }

      .project-preview__actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.8rem;
        margin-top: 1rem;
      }

      .project-preview__btn {
        border: 0;
        border-radius: 12px;
        background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
        color: white;
        padding: 0.8rem 1rem;
        font-weight: 600;
      }

      .project-preview__btn--ghost {
        background: rgba(255,255,255,0.08);
        border: 1px solid rgba(184, 76, 255, 0.25);
      }

      .project-preview__stats {
        display: flex;
        gap: 1rem;
        margin-top: 1.2rem;
      }

      .project-preview__stats div {
        display: flex;
        flex-direction: column;
        min-width: 76px;
        padding: 0.7rem 0.8rem;
        border-radius: 14px;
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(184, 76, 255, 0.16);
      }

      .project-preview__stats strong {
        font-size: 1.2rem;
      }

      .project-preview__stats span {
        color: var(--text-muted);
        font-size: 0.72rem;
      }

      .project-preview__phone {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem 0.5rem 0.5rem 0;
      }

      .phone-screen {
        width: 180px;
        min-height: 270px;
        background: #121017;
        border: 1px solid rgba(184, 76, 255, 0.28);
        border-radius: 26px;
        padding: 0.9rem 0.7rem 0.8rem;
        box-shadow: 0 16px 40px rgba(10, 8, 18, 0.8);
      }

      .phone-screen__top {
        display: flex;
        gap: 0.4rem;
        margin-bottom: 0.9rem;
      }

      .phone-screen__top span {
        display: block;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background: rgba(255,255,255,0.35);
      }

      .phone-screen__body {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.8rem;
        min-height: 220px;
        background: linear-gradient(180deg, rgba(184, 76, 255, 0.08), rgba(10, 8, 18, 0.7));
        border-radius: 18px;
        border: 1px solid rgba(184, 76, 255, 0.12);
      }

      .phone-screen__badge {
        padding: 0.25rem 0.5rem;
        border-radius: 999px;
        background: rgba(184, 76, 255, 0.18);
        color: var(--accent-primary);
        font-size: 0.62rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .phone-screen__icon {
        font-size: 2.4rem;
      }

      .phone-screen__graph {
        width: 70%;
        height: 70px;
        border-radius: 14px;
        background: linear-gradient(180deg, rgba(184,76,255,0.2), rgba(255,255,255,0.04));
        position: relative;
      }

      .phone-screen__graph::before {
        content: '';
        position: absolute;
        inset: 15% 8% 18% 10%;
        background: linear-gradient(135deg, rgba(184,76,255,0.42), transparent 60%);
        clip-path: polygon(0 78%, 18% 50%, 36% 60%, 54% 25%, 72% 44%, 100% 0, 100% 100%, 0 100%);
      }

      .about-preview {
        display: grid;
        grid-template-columns: 1.3fr 1fr;
        gap: 1.5rem;
      }

      .about-preview__card,
      .about-preview__highlights {
        padding: 1.6rem;
      }

      .about-preview__card h3,
      .cta-panel h3,
      .github-panel h3 {
        margin: 0 0 1rem;
        font-size: clamp(1.6rem, 2vw, 2.3rem);
      }

      .about-preview__card p,
      .about-preview__highlights li,
      .github-panel__note {
        color: var(--text-secondary);
        line-height: 1.7;
      }

      .about-preview__highlights ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 0.8rem;
      }

      .about-preview__highlights li::before {
        content: '•';
        color: var(--accent-primary);
        margin-right: 0.65rem;
      }

      .skills-grid,
      .tools-grid,
      .projects-grid {
        display: grid;
        gap: 1.2rem;
      }

      .skills-grid {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }

      .tools-grid {
        grid-template-columns: repeat(6, minmax(0, 1fr));
      }

      .projects-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      .github-panel {
        display: grid;
        grid-template-columns: 1fr 2fr;
        align-items: center;
        gap: 1.4rem;
        padding: 1.5rem 1.4rem;
      }

      .github-panel__grid {
        display: grid;
        grid-template-columns: repeat(12, minmax(0, 1fr));
        gap: 0.5rem;
      }

      .github-panel__grid span {
        display: block;
        height: 14px;
        border-radius: 6px;
        background: rgba(184, 76, 255, 0.2);
      }

      .cta-panel {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1.5rem;
        padding: 1.5rem 1.4rem;
      }

      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }

      @media (max-width: 1024px) {
        .hero,
        .about-preview,
        .github-panel {
          grid-template-columns: 1fr;
        }

        .skills-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .tools-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .projects-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      @media (max-width: 767px) {
        .hero {
          padding-top: 2rem;
        }

        .skills-grid,
        .tools-grid,
        .projects-grid {
          grid-template-columns: 1fr;
        }

        .cta-panel {
          flex-direction: column;
          align-items: flex-start;
        }
      }
    `
  ]
})
export class HomeComponent {
  skillCategories = SKILL_CATEGORIES;
  featuredProjects: Array<{ id: number; title: string; technologies: string[]; description: string; features: string[]; slug: string; category?: string }> = [];
  contributionDays = Array.from({ length: 24 }, () => Number((Math.random() * 0.8 + 0.3).toFixed(2)));

  constructor(private projectService: ProjectService) {
    this.featuredProjects = this.projectService.getFeaturedProjects(3);
  }

  trackByProjectId(index: number, project: { id: number }): number {
    return project.id;
  }

  trackByIndex(index: number): number {
    return index;
  }
}
