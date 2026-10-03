import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tool-card',
  standalone: true,
  template: `
    <article class="tool-card glass-card">
      <span class="tool-card__icon">{{ icon }}</span>
      <span>{{ label }}</span>
    </article>
  `,
  styles: [
    `
      .tool-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.8rem;
        padding: 1.2rem 1rem;
        min-height: 120px;
        color: var(--text-primary);
      }

      .tool-card__icon {
        font-size: 1.8rem;
        color: var(--accent-primary);
      }
    `
  ]
})
export class ToolCardComponent {
  @Input() icon = '⚙️';
  @Input() label = 'Tool';
}
