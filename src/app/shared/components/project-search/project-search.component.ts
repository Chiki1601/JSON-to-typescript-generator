import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-project-search',
  standalone: true,
  template: `
    <label class="search-box" aria-label="Search projects">
      <span class="search-box__icon">⌕</span>
      <input
        type="search"
        [value]="value"
        (input)="value = $any($event.target).value; search.emit(value)"
        placeholder="Search projects..."
        aria-label="Search projects"
      />
    </label>
  `,
  styles: [
    `
      .search-box {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        width: min(100%, 420px);
        border: 1px solid rgba(184, 76, 255, 0.2);
        background: rgba(17, 11, 30, 0.7);
        border-radius: 14px;
        padding: 0.9rem 1rem;
      }

      .search-box__icon {
        color: var(--accent-primary);
        font-size: 1.2rem;
      }

      .search-box input {
        flex: 1;
        border: 0;
        outline: none;
        background: transparent;
        color: var(--text-primary);
      }

      .search-box input::placeholder {
        color: var(--text-muted);
      }
    `
  ]
})
export class ProjectSearchComponent {
  value = '';
  @Output() search = new EventEmitter<string>();
}
