import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Project } from '../../core/models/project.model';
import { ProjectService } from '../../core/services/project.service';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <main class="page-shell container" *ngIf="project; else notFound">
      <section class="section detail">
        <button type="button" class="secondary-btn back-btn" (click)="goBack()">← Back to Projects</button>

        <div class="detail__header">
          <div>
            <p class="eyebrow">{{ project.id.toString().padStart(2, '0') }}</p>
            <h1>{{ project.title }}</h1>
          </div>
          <div class="detail__tags">
            <span *ngFor="let tech of project.technologies">{{ tech }}</span>
          </div>
        </div>

        <div class="detail__content">
          <div class="detail__visual glass-card">
            <div class="detail__visual-inner" [class.detail__visual-inner--image]="project.image">
              <img *ngIf="project.image" [src]="project.image" [alt]="project.title + ' screenshot'" />
            </div>
          </div>

          <div class="detail__info glass-card">
            <h2>Project Overview</h2>
            <p>{{ project.description }}</p>
            <h3>Key Features</h3>
            <ul>
              <li *ngFor="let feature of project.features">{{ feature }}</li>
            </ul>
            <div class="detail__summary">
              <h3>Implementation Summary</h3>
              <p>
                Built with Angular and TypeScript to deliver a responsive, modular and maintainable product experience focused on usability, performance, and clean component architecture.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <ng-template #notFound>
      <main class="page-shell container">
        <section class="section not-found glass-card">
          <p class="eyebrow">404</p>
          <h1>Project Not Found</h1>
          <a class="primary-btn" routerLink="/projects">Back to Projects</a>
        </section>
      </main>
    </ng-template>
  `,
  styles: [
    `
      .page-shell {
        position: relative;
        z-index: 1;
      }

      .detail {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      .back-btn {
        align-self: flex-start;
      }

      .eyebrow {
        margin: 0 0 0.5rem;
        color: var(--accent-primary);
        letter-spacing: 0.16em;
        text-transform: uppercase;
        font-size: 0.72rem;
        font-weight: 700;
      }

      .detail__header h1,
      .not-found h1 {
        margin: 0;
        font-size: clamp(2.3rem, 4vw, 4rem);
        line-height: 1.05;
      }

      .detail__tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.7rem;
        margin-top: 1rem;
      }

      .detail__tags span {
        padding: 0.5rem 0.75rem;
        border: 1px solid rgba(184, 76, 255, 0.24);
        border-radius: 999px;
        background: rgba(184, 76, 255, 0.08);
        color: var(--text-primary);
      }

      .detail__content {
        display: grid;
        grid-template-columns: 1.1fr 0.9fr;
        gap: 1.4rem;
      }

      .detail__visual,
      .detail__info,
      .not-found {
        padding: 1.4rem;
      }

      .detail__visual-inner {
        min-height: 420px;
        border-radius: 18px;
        background: linear-gradient(135deg, rgba(184, 76, 255, 0.22), rgba(10, 8, 18, 0.85), rgba(91, 60, 194, 0.16));
        border: 1px solid rgba(184, 76, 255, 0.28);
        position: relative;
        overflow: hidden;
      }

      .detail__visual-inner::before,
      .detail__visual-inner::after {
        content: '';
        position: absolute;
        inset: 0;
      }

      .detail__visual-inner::before {
        background: linear-gradient(135deg, rgba(255,255,255,0.08), transparent 40%);
      }

      .detail__visual-inner::after {
        inset: 12% 12% 14% 12%;
        background: rgba(8, 6, 17, 0.62);
        border: 1px solid rgba(184, 76, 255, 0.22);
      }

      .detail__visual-inner--image::after {
        display: none;
      }

      .detail__visual-inner img {
        width: 100%;
        min-height: 420px;
        height: 100%;
        object-fit: cover;
        display: block;
        position: relative;
        z-index: 1;
      }

      .detail__info h2,
      .detail__info h3 {
        margin-top: 0;
      }

      .detail__info p,
      .detail__info li {
        color: var(--text-secondary);
        line-height: 1.8;
      }

      .detail__info ul {
        padding-left: 1.2rem;
      }

      .detail__summary {
        margin-top: 1.2rem;
      }

      .not-found {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }

      @media (max-width: 767px) {
        .detail__content {
          grid-template-columns: 1fr;
        }
      }
    `
  ]
})
export class ProjectDetailComponent implements OnInit {
  project: Project | undefined;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.project = this.projectService.getProjectBySlug(slug);
  }

  goBack(): void {
    this.router.navigate(['/projects']);
  }
}
