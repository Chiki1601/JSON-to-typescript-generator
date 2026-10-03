import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-project-filter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="filter-row" role="tablist" aria-label="Project categories">
      <button
        type="button"
        class="filter-btn"
        [class.active]="activeCategory === 'All'"
        (click)="changeCategory('All')"
      >
        All
      </button>

      <button
        *ngFor="let category of categories"
        type="button"
        class="filter-btn"
        [class.active]="activeCategory === category"
        (click)="changeCategory(category)"
      >
        {{ category }}
      </button>
    </div>
  `,
  styles: [
    `
      .filter-row {
        display: flex;
        flex-wrap: wrap;
        gap: 0.7rem;
      }
    `
  ]
})
export class ProjectFilterComponent {
  @Input() categories: string[] = [];
  @Input() activeCategory = 'All';
  @Output() categoryChange = new EventEmitter<string>();

  changeCategory(category: string): void {
    this.categoryChange.emit(category);
  }
}
