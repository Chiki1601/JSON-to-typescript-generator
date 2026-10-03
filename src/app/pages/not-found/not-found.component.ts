import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main class="page-shell container">
      <section class="not-found glass-card">
        <p class="eyebrow">404</p>
        <h1>Page Not Found</h1>
        <p>The page you’re looking for does not exist.</p>
        <a class="primary-btn" routerLink="/">Back to Home</a>
      </section>
    </main>
  `,
  styles: [
    `
      .page-shell {
        min-height: 70vh;
        display: grid;
        place-items: center;
      }

      .not-found {
        max-width: 620px;
        width: 100%;
        padding: 3rem 2rem;
        text-align: center;
      }

      .eyebrow {
        margin: 0 0 1rem;
        font-size: 0.75rem;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: var(--accent-primary);
      }

      h1 {
        margin: 0 0 1rem;
        font-size: clamp(2.4rem, 4vw, 4rem);
      }

      p {
        margin: 0 0 2rem;
        color: var(--text-secondary);
      }
    `
  ]
})
export class NotFoundComponent {}
