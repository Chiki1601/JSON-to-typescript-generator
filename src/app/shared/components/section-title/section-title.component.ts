import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-title',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="section-heading">
      <p class="eyebrow" *ngIf="eyebrow">{{ eyebrow }}</p>
      <h2 class="title">{{ title }} <span *ngIf="highlight">{{ highlight }}</span></h2>
      <p class="subtitle" *ngIf="subtitle">{{ subtitle }}</p>
    </div>
  `,
  styles: [
    `
      .section-heading {
        margin-bottom: 2rem;
      }

      .eyebrow {
        margin: 0 0 0.8rem;
        color: var(--accent-primary);
        text-transform: uppercase;
        letter-spacing: 0.16em;
        font-size: 0.75rem;
        font-weight: 700;
      }

      .title {
        margin: 0;
        font-size: clamp(2rem, 3vw, 3rem);
        line-height: 1.05;
        letter-spacing: -0.04em;
        text-transform: uppercase;
      }

      .title span {
        color: var(--accent-primary);
      }

      .subtitle {
        margin: 0.85rem 0 0;
        color: var(--text-secondary);
        max-width: 700px;
        line-height: 1.7;
      }
    `
  ]
})
export class SectionTitleComponent {
  @Input() eyebrow = '';
  @Input() title = '';
  @Input() highlight = '';
  @Input() subtitle = '';
}
