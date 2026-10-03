import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skill-card',
  standalone: true,
  template: `
    <article class="skill-card glass-card">
      <div class="skill-card__icon">{{ icon }}</div>
      <div class="skill-card__body">
        <h3>{{ title }}</h3>
        <p>{{ label }}</p>
      </div>
    </article>
  `,
  styles: [
    `
      .skill-card {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem 1.1rem;
        min-height: 92px;
        transition: transform 180ms ease, border-color 180ms ease;
      }

      .skill-card:hover {
        transform: translateY(-3px);
        border-color: rgba(184, 76, 255, 0.42);
      }

      .skill-card__icon {
        width: 48px;
        height: 48px;
        display: grid;
        place-items: center;
        border-radius: 14px;
        background: rgba(184, 76, 255, 0.1);
        border: 1px solid rgba(184, 76, 255, 0.25);
        color: var(--accent-primary);
        font-size: 1.3rem;
      }

      .skill-card__body h3 {
        margin: 0 0 0.3rem;
        font-size: 1.02rem;
      }

      .skill-card__body p {
        margin: 0;
        color: var(--text-muted);
        font-size: 0.78rem;
      }
    `
  ]
})
export class SkillCardComponent {
  @Input() icon = '⚡';
  @Input() title = 'Skill';
  @Input() label = 'Frontend';
}
