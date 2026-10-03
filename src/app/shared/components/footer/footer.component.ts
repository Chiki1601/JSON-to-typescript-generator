import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NAV_ITEMS, SOCIAL_LINKS } from '../../../core/constants/profile';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="footer">
      <div class="container footer__inner">
        <div class="footer__brand">
          <div class="brand-mark">&lt;/&gt;</div>
          <div>
            <h3>Pooja Patel</h3>
            <p>Full Stack Developer</p>
          </div>
        </div>

        <div class="footer__nav">
          <h4>Navigation</h4>
          <ul>
            <li *ngFor="let item of navItems">
              <a [routerLink]="item.path">{{ item.label }}</a>
            </li>
          </ul>
        </div>

        <div class="footer__social">
          <h4>Connect</h4>
          <ul>
            <li *ngFor="let item of socialLinks">
              <a [href]="item.url" target="_blank" rel="noreferrer">{{ item.label }}</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="footer__bottom">
        <div class="container">
          <p>© 2026 Pooja Patel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
      .footer {
        border-top: 1px solid rgba(184, 76, 255, 0.22);
        background: rgba(10, 8, 18, 0.9);
      }

      .footer__inner {
        display: grid;
        grid-template-columns: 1.6fr 1fr 1fr;
        gap: 2rem;
        padding: 3rem 0 2rem;
      }

      .footer__brand {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .brand-mark {
        width: 3rem;
        height: 3rem;
        display: grid;
        place-items: center;
        border-radius: 12px;
        border: 1px solid rgba(184, 76, 255, 0.32);
        background: rgba(184, 76, 255, 0.1);
        color: var(--accent-primary);
        font-weight: 800;
      }

      .footer__brand h3,
      .footer__nav h4,
      .footer__social h4 {
        margin: 0 0 0.55rem;
        font-size: 1.1rem;
      }

      .footer__brand p,
      .footer__bottom p {
        margin: 0;
        color: var(--text-muted);
      }

      .footer__nav ul,
      .footer__social ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        gap: 0.55rem;
      }

      .footer__nav a,
      .footer__social a {
        color: var(--text-secondary);
      }

      .footer__bottom {
        border-top: 1px solid rgba(184, 76, 255, 0.12);
        padding: 1rem 0 1.5rem;
      }

      @media (max-width: 767px) {
        .footer__inner {
          grid-template-columns: 1fr;
        }
      }
    `
  ]
})
export class FooterComponent {
  navItems = NAV_ITEMS;
  socialLinks = SOCIAL_LINKS;
}
