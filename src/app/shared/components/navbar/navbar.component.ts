import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { NAV_ITEMS } from '../../../core/constants/profile';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="topbar glass-card">
      <div class="container topbar__inner">
        <a class="brand" routerLink="/" aria-label="Go to home page">
          <span class="brand__icon">&lt;/&gt;</span>
          <span class="brand__meta">
            <strong>Pooja Patel</strong>
            <small>Full Stack Developer</small>
          </span>
        </a>

        <nav class="nav" [class.nav--open]="menuOpen" aria-label="Main navigation">
          <button
            type="button"
            class="nav__toggle"
            aria-label="Toggle navigation"
            [attr.aria-expanded]="menuOpen"
            (click)="toggleMenu()"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul class="nav__list">
            <li *ngFor="let item of navItems">
              <a
                [routerLink]="item.path"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: item.path === '/' }"
                (click)="closeMenu()"
              >
                {{ item.label }}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  `,
  styles: [
    `
      :host {
        position: sticky;
        top: 0;
        z-index: 30;
      }

      .topbar {
        position: sticky;
        top: 0;
        width: 100%;
        background: rgba(10, 8, 18, 0.7);
        border: 1px solid rgba(184, 76, 255, 0.2);
        border-top: 0;
        backdrop-filter: blur(18px);
      }

      .topbar__inner {
        min-height: 76px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        position: relative;
      }

      .brand {
        display: inline-flex;
        align-items: center;
        gap: 0.9rem;
        min-width: 0;
      }

      .brand__icon {
        display: grid;
        place-items: center;
        width: 2.7rem;
        height: 2.7rem;
        border-radius: 12px;
        background: rgba(184, 76, 255, 0.12);
        color: var(--accent-primary);
        border: 1px solid rgba(184, 76, 255, 0.3);
        box-shadow: var(--shadow-glow);
        font-weight: 800;
      }

      .brand__meta {
        display: flex;
        flex-direction: column;
        min-width: 0;
      }

      .brand__meta strong {
        font-size: 0.98rem;
        letter-spacing: 0.02em;
      }

      .brand__meta small {
        color: var(--text-muted);
        font-size: 0.72rem;
      }

      .nav {
        display: flex;
        align-items: center;
      }

      .nav__list {
        list-style: none;
        display: flex;
        align-items: center;
        gap: 0.8rem;
        padding: 0;
        margin: 0;
      }

      .nav__list a {
        display: inline-flex;
        align-items: center;
        padding: 0.7rem 1rem;
        border-radius: 12px;
        color: var(--text-secondary);
        font-size: 0.96rem;
        text-transform: none;
        transition: color var(--transition), background var(--transition), box-shadow var(--transition);
      }

      .nav__list a.active {
        color: var(--text-primary);
        background: rgba(184, 76, 255, 0.12);
        border: 1px solid rgba(184, 76, 255, 0.38);
        box-shadow: var(--shadow-glow);
      }

      .nav__toggle {
        display: none;
        width: 48px;
        height: 48px;
        border: 1px solid rgba(184, 76, 255, 0.28);
        border-radius: 12px;
        background: rgba(184, 76, 255, 0.08);
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 0.28rem;
        padding: 0;
      }

      .nav__toggle span {
        width: 20px;
        height: 2px;
        background: var(--text-primary);
        display: block;
        border-radius: 50px;
      }

      @media (max-width: 767px) {
        .nav__toggle {
          display: inline-flex;
        }

        .nav__list {
          position: absolute;
          top: calc(100% + 0.6rem);
          right: 0;
          left: 0;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          background: rgba(10, 8, 18, 0.97);
          border: 1px solid rgba(184, 76, 255, 0.24);
          border-radius: 18px;
          padding: 0.8rem;
          opacity: 0;
          pointer-events: none;
          transform: translateY(-8px);
          transition: opacity var(--transition), transform var(--transition);
        }

        .nav--open .nav__list {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
        }

        .nav__list a {
          width: 100%;
          padding: 0.85rem 0.9rem;
        }
      }
    `
  ]
})
export class NavbarComponent {
  navItems = NAV_ITEMS;
  menuOpen = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.menuOpen = false;
      });
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}
