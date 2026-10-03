import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-star-background',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="star-background" aria-hidden="true">
      <span class="star" *ngFor="let star of stars; trackBy: trackByIndex"></span>
    </div>
  `,
  styles: [
    `
      :host {
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 0;
      }

      .star-background {
        position: absolute;
        inset: 0;
        overflow: hidden;
        background:
          radial-gradient(circle at 20% 20%, rgba(184, 76, 255, 0.18), transparent 34%),
          radial-gradient(circle at 80% 15%, rgba(139, 92, 246, 0.16), transparent 28%),
          linear-gradient(180deg, rgba(9, 7, 16, 0.9), rgba(12, 8, 22, 0.96));
      }

      .star {
        position: absolute;
        display: block;
        width: var(--size);
        height: var(--size);
        top: var(--top);
        left: var(--left);
        background: rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        opacity: var(--opacity);
        box-shadow: 0 0 12px rgba(184, 76, 255, 0.3);
        animation: twinkle 5s ease-in-out infinite;
        animation-delay: var(--delay);
      }

      @keyframes twinkle {
        0%, 100% { opacity: var(--opacity); transform: scale(1); }
        50% { opacity: calc(var(--opacity) + 0.25); transform: scale(1.5); }
      }
    `
  ]
})
export class StarBackgroundComponent {
  stars = Array.from({ length: 100 }, (_, index) => ({
    id: index,
    size: (Math.random() * 3 + 1).toFixed(2),
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    opacity: (Math.random() * 0.7 + 0.25).toFixed(2),
    delay: `${(Math.random() * 4).toFixed(2)}s`
  }));

  trackByIndex(index: number): number {
    return index;
  }
}
