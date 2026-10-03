import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { Project } from '../../core/models/project.model';
import { ProjectService } from '../../core/services/project.service';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';
import { ProjectFilterComponent } from '../../shared/components/project-filter/project-filter.component';
import { ProjectSearchComponent } from '../../shared/components/project-search/project-search.component';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent, ProjectCardComponent, ProjectFilterComponent, ProjectSearchComponent],
  template: `
    <main class="page-shell container">
      <section class="section">
        <app-section-title
          eyebrow="Portfolio"
          title="My Recent"
          highlight="Works"
          subtitle="Here are some of the projects I've built with Angular."
        ></app-section-title>

        <div class="toolbar">
          <app-project-search (search)="onSearch($event)"></app-project-search>
          <app-project-filter
            [categories]="categories"
            [activeCategory]="activeCategory"
            (categoryChange)="onCategoryChange($event)"
          ></app-project-filter>
        </div>

        <div class="projects-grid" *ngIf="filteredProjects.length; else emptyState">
          <app-project-card *ngFor="let project of filteredProjects; trackBy: trackByProjectId" [project]="project"></app-project-card>
        </div>

        <ng-template #emptyState>
          <div class="empty-state glass-card">
            <h3>No projects found</h3>
            <p>Try a different keyword or switch filters to explore the portfolio.</p>
          </div>
        </ng-template>
      </section>
    </main>
  `,
  styles: [
    `
      .page-shell {
        position: relative;
        z-index: 1;
      }

      .toolbar {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 2rem;
      }

      .projects-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1.2rem;
      }

      .empty-state {
        padding: 2.5rem 1.5rem;
        text-align: center;
      }

      .empty-state h3 {
        margin: 0 0 0.7rem;
      }

      .empty-state p {
        margin: 0;
        color: var(--text-secondary);
      }

      @media (max-width: 1024px) {
        .projects-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      @media (max-width: 767px) {
        .projects-grid {
          grid-template-columns: 1fr;
        }
      }
    `
  ]
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  categories = ['All', 'Angular', 'UI / Tools', 'Dashboards', 'Games', 'Productivity', 'AI'];
  activeCategory = 'All';
  searchTerm = '';

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projects = this.projectService.getProjects();
    this.filteredProjects = this.projects;
  }

  onSearch(value: string): void {
    this.searchTerm = value;
    this.updateFilter();
  }

  onCategoryChange(category: string): void {
    this.activeCategory = category;
    this.updateFilter();
  }

  updateFilter(): void {
    this.filteredProjects = this.projectService.filterProjects(this.activeCategory, this.searchTerm);
  }

  trackByProjectId(index: number, project: Project): number {
    return project.id;
  }
}
