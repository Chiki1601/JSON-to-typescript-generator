import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { SKILL_CATEGORIES } from '../../core/data/skills.data';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { SkillCardComponent } from '../../shared/components/skill-card/skill-card.component';
import { ToolCardComponent } from '../../shared/components/tool-card/tool-card.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent, SkillCardComponent, ToolCardComponent],
  template: `
    <main class="page-shell container">
      <section class="section intro">
        <app-section-title
          eyebrow="About"
          title="Know Who"
          highlight="I'M"
          subtitle="Pooja Patel is a Full Stack Developer focused on building modern, user-centric digital products with scalable frontend architecture and clean engineering practices."
        ></app-section-title>

        <div class="intro__content">
          <div class="intro__text glass-card">
            <h3>Full Stack Web Developer</h3>
            <p>
              I design and build responsive web experiences that balance usability, performance, and maintainability. My work spans modern frontend systems, backend integration, reusable architecture, and product delivery across enterprise and consumer-facing applications.
            </p>
            <p>
              I focus on crafting elegant interfaces, structuring scalable code, and delivering polished user experiences with strong technical fundamentals.
            </p>
          </div>

          <div class="intro__details glass-card">
            <ul>
              <li><strong>Name:</strong> Pooja Patel</li>
              <li><strong>Role:</strong> Full Stack Developer</li>
              <li><strong>Focus:</strong> Angular, TypeScript, C#, .NET, ASP.NET Core</li>
              <li><strong>Interests:</strong> Playing Games, Solving Puzzles, Travelling</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="section">
        <app-section-title
          eyebrow="Core strengths"
          title="Professional"
          highlight="Strengths"
        ></app-section-title>

        <div class="strength-grid">
          <article class="glass-card strength-item" *ngFor="let strength of strengths">
            <span class="strength-item__icon">{{ strength.icon }}</span>
            <h3>{{ strength.title }}</h3>
            <p>{{ strength.text }}</p>
          </article>
        </div>
      </section>

      <section class="section">
        <app-section-title
          eyebrow="Technology stack"
          title="Technical"
          highlight="Skills"
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

      <section class="section">
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
    </main>
  `,
  styles: [
    `
      .page-shell {
        position: relative;
        z-index: 1;
      }

      .intro__content {
        display: grid;
        grid-template-columns: 1.3fr 0.7fr;
        gap: 1.5rem;
      }

      .intro__text,
      .intro__details,
      .strength-item {
        padding: 1.5rem;
      }

      .intro__text h3 {
        margin: 0 0 1rem;
        font-size: 1.8rem;
      }

      .intro__text p,
      .strength-item p,
      .intro__details li {
        color: var(--text-secondary);
        line-height: 1.8;
      }

      .intro__details ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 0.9rem;
      }

      .strength-grid,
      .skills-grid,
      .tools-grid {
        display: grid;
        gap: 1.2rem;
      }

      .strength-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      .strength-item {
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
      }

      .strength-item__icon {
        width: 46px;
        height: 46px;
        border-radius: 14px;
        display: grid;
        place-items: center;
        background: rgba(184, 76, 255, 0.12);
        border: 1px solid rgba(184, 76, 255, 0.3);
        color: var(--accent-primary);
        font-size: 1.4rem;
      }

      .strength-item h3 {
        margin: 0;
        font-size: 1.16rem;
      }

      .skills-grid {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }

      .tools-grid {
        grid-template-columns: repeat(6, minmax(0, 1fr));
      }

      @media (max-width: 1024px) {
        .intro__content,
        .strength-grid,
        .skills-grid,
        .tools-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      @media (max-width: 767px) {
        .intro__content,
        .strength-grid,
        .skills-grid,
        .tools-grid {
          grid-template-columns: 1fr;
        }
      }
    `
  ]
})
export class AboutComponent {
  skillCategories = SKILL_CATEGORIES;
  strengths = [
    { icon: '🏢', title: 'Enterprise apps', text: 'Build and improve business-critical interfaces designed for scale, structure, and maintainability.' },
    { icon: '📱', title: 'Responsive UI', text: 'Craft polished experiences that stay consistent across desktop, tablet, and mobile screens.' },
    { icon: '🧱', title: 'Reusable architecture', text: 'Structure solutions with modular, reusable design patterns that support long-term growth.' },
    { icon: '🔌', title: 'API integration', text: 'Connect frontend experiences to backend systems with stable, business-aware integrations.' },
    { icon: '⚡', title: 'Performance optimization', text: 'Improve loading speed, interactivity, and runtime efficiency without sacrificing quality.' },
    { icon: '🛠️', title: 'Full-stack delivery', text: 'Move from interface design to data flow and backend collaboration with clear engineering processes.' }
  ];
}
