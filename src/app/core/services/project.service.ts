import { Injectable } from '@angular/core';

import { PROJECTS } from '../data/projects.data';
import { Project } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  getProjects(): Project[] {
    return PROJECTS;
  }

  getProjectBySlug(slug: string | null): Project | undefined {
    return PROJECTS.find((project) => project.slug === slug);
  }

  getFeaturedProjects(limit = 3): Project[] {
    return PROJECTS.slice(0, limit);
  }

  searchProjects(query: string): Project[] {
    const term = query.trim().toLowerCase();

    if (!term) {
      return PROJECTS;
    }

    return PROJECTS.filter((project) => {
      const searchableText = [
        project.title,
        project.description,
        ...project.technologies,
        ...project.features
      ]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(term);
    });
  }

  filterProjects(category: string, query = ''): Project[] {
    const normalizedCategory = category?.trim();
    const normalizedQuery = query.trim().toLowerCase();

    return this.getProjects().filter((project) => {
      const matchesCategory = !normalizedCategory || normalizedCategory === 'All' || project.category === normalizedCategory;
      const matchesQuery =
        !normalizedQuery ||
        [project.title, project.description, ...project.technologies, ...project.features]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }
}
