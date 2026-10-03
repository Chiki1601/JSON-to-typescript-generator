import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Project } from '../../../core/models/project.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <article class="project-card glass-card">
      <div class="project-card__header">
        <span class="project-card__number">{{ project.id.toString().padStart(2, '0') }}</span>
      </div>

      <div class="project-card__visual">
        <div class="project-card__visual-inner" [style.background]="project.image ? null : projectVisual">
          <img *ngIf="project.image" [src]="project.image" [alt]="project.title + ' screenshot'" />
        </div>
      </div>

      <div class="project-card__body">
        <h3>{{ project.title }}</h3>
        <p class="project-card__tech">{{ project.technologies.join(' • ') }}</p>
        <p class="project-card__description">{{ project.description }}</p>
        <div class="project-card__features">
          <span *ngFor="let feature of project.features.slice(0, 3)">{{ feature }}</span>
        </div>
        <a class="primary-btn project-card__action" [routerLink]="['/projects', project.slug]">View Details</a>
      </div>
    </article>
  `,
  styles: [
    `
      .project-card {
        display: flex;
        flex-direction: column;
        min-height: 100%;
        overflow: hidden;
        border: 1px solid rgba(184, 76, 255, 0.25);
        transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
      }

      .project-card:hover {
        transform: translateY(-6px);
        border-color: rgba(184, 76, 255, 0.45);
        box-shadow: 0 12px 32px rgba(184, 76, 255, 0.12);
      }

      .project-card__header {
        padding: 1rem 1.1rem 0;
      }

      .project-card__number {
        display: inline-flex;
        color: var(--accent-primary);
        font-weight: 700;
        letter-spacing: 0.16em;
        font-size: 0.75rem;
      }

      .project-card__visual {
        padding: 1rem 1rem 0;
      }

      .project-card__visual-inner {
        position: relative;
        min-height: 11rem;
        border-radius: 16px;
        background: linear-gradient(135deg, rgba(184, 76, 255, 0.2), rgba(80, 57, 243, 0.2), rgba(13, 9, 24, 0.9));
        border: 1px solid rgba(184, 76, 255, 0.24);
        overflow: hidden;
      }

      .project-card__visual-inner img {
        width: 100%;
        height: 100%;
        min-height: 11rem;
        object-fit: cover;
        display: block;
      }

      .project-card__visual-inner::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, rgba(255,255,255,0.08), transparent 35%);
      }

      .project-card__visual-inner::after {
        content: '';
        position: absolute;
        inset: 10% 14% 11% 14%;
        border-radius: 10px;
        background: rgba(8, 6, 17, 0.56);
        border: 1px solid rgba(184, 76, 255, 0.22);
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
      }

      .project-card__body {
        padding: 1.2rem 1.1rem 1.25rem;
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
        flex: 1;
      }

      .project-card__body h3 {
        margin: 0;
        font-size: 1.36rem;
        line-height: 1.2;
      }

      .project-card__tech {
        margin: 0;
        color: var(--accent-primary);
        font-size: 0.78rem;
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }

      .project-card__description {
        margin: 0;
        color: var(--text-secondary);
        line-height: 1.7;
      }

      .project-card__features {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: auto;
      }

      .project-card__features span {
        display: inline-flex;
        padding: 0.42rem 0.6rem;
        border-radius: 999px;
        background: rgba(184, 76, 255, 0.08);
        border: 1px solid rgba(184, 76, 255, 0.2);
        color: var(--text-primary);
        font-size: 0.72rem;
      }

      .project-card__action {
        width: 100%;
        margin-top: 0.5rem;
      }
    `
  ]
})
export class ProjectCardComponent {
  @Input() project!: Project;

  get projectVisual(): string {
    const gradients = [
      'linear-gradient(135deg, rgba(184, 76, 255, 0.25), rgba(10, 9, 17, 0.8), rgba(58, 32, 124, 0.35))',
      'linear-gradient(135deg, rgba(80, 57, 243, 0.28), rgba(15, 12, 24, 0.82), rgba(184, 76, 255, 0.2))',
      'linear-gradient(135deg, rgba(139, 92, 246, 0.22), rgba(17, 11, 30, 0.86), rgba(184, 76, 255, 0.25))'
    ];

    const index = this.project?.id ?? 0;
    return gradients[(index - 1) % gradients.length];
  }
}
