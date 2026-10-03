import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  template: `
    <main class="dashboard-shell">
      <mat-toolbar color="primary" class="dashboard-toolbar">
        <button mat-icon-button type="button" class="dashboard-menu-button" aria-label="Open navigation">
          ☰
        </button>
        <div class="toolbar-title-group">
          <span class="eyebrow">Portfolio control center</span>
          <h1>Dashboard</h1>
        </div>
        <span class="toolbar-spacer"></span>
        <button mat-flat-button color="accent" type="button">Generate report</button>
      </mat-toolbar>

      <mat-sidenav-container class="dashboard-container">
        <mat-sidenav mode="side" opened class="dashboard-sidebar">
          <div class="brand-block">
            <span class="brand-mark">PP</span>
            <div>
              <strong>Pooja Patel</strong>
              <small>Product engineer</small>
            </div>
          </div>

          <mat-nav-list>
            <a mat-list-item routerLink="/dashboard" routerLinkActive="active-link" [routerLinkActiveOptions]="{ exact: true }">
              <span>Overview</span>
            </a>
            <a mat-list-item routerLink="/projects" routerLinkActive="active-link">
              <span>Projects</span>
            </a>
            <a mat-list-item routerLink="/about" routerLinkActive="active-link">
              <span>About</span>
            </a>
          </mat-nav-list>
        </mat-sidenav>

        <mat-sidenav-content>
          <section class="stats-grid">
            <mat-card>
              <p class="stat-label">Active projects</p>
              <h2>12</h2>
              <span class="stat-trend positive">+3 this quarter</span>
            </mat-card>
            <mat-card>
              <p class="stat-label">Core skills</p>
              <h2>8</h2>
              <span class="stat-trend">Frontend + backend</span>
            </mat-card>
            <mat-card>
              <p class="stat-label">Avg. delivery</p>
              <h2>4.8</h2>
              <span class="stat-trend positive">Excellent velocity</span>
            </mat-card>
            <mat-card>
              <p class="stat-label">Focus</p>
              <h2>Angular</h2>
              <span class="stat-trend">TypeScript + .NET</span>
            </mat-card>
          </section>

          <section class="content-grid">
            <mat-card class="panel-card">
              <div class="panel-header">
                <h3>Focal areas</h3>
                <button mat-stroked-button type="button">View details</button>
              </div>
              <ul class="focus-list">
                <li>Responsive interface design</li>
                <li>Reusable Angular component architecture</li>
                <li>API and service-layer integration</li>
                <li>Performance and accessibility improvements</li>
              </ul>
            </mat-card>

            <mat-card class="panel-card">
              <div class="panel-header">
                <h3>Next milestones</h3>
                <span class="badge">Planned</span>
              </div>
              <div class="milestone-list">
                <div>
                  <strong>Phase 1</strong>
                  <p>Foundation, layout and dashboard shell.</p>
                </div>
                <div>
                  <strong>Phase 2</strong>
                  <p>Advanced features, filtering and project flows.</p>
                </div>
                <div>
                  <strong>Phase 3</strong>
                  <p>Testing, polish and deployment readiness.</p>
                </div>
              </div>
            </mat-card>
          </section>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </main>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .dashboard-shell {
        min-height: calc(100vh - 80px);
        background: linear-gradient(180deg, rgba(12, 9, 22, 0.96), rgba(17, 12, 29, 1));
      }

      .dashboard-toolbar {
        position: sticky;
        top: 0;
        z-index: 10;
        padding: 0 1.25rem;
        background: rgba(27, 20, 39, 0.95);
        border-bottom: 1px solid rgba(184, 76, 255, 0.25);
      }

      .dashboard-menu-button {
        margin-right: 0.75rem;
      }

      .toolbar-title-group {
        display: flex;
        flex-direction: column;
        gap: 0.1rem;
      }

      .toolbar-title-group h1 {
        margin: 0;
        font-size: 1.1rem;
        letter-spacing: 0.03em;
      }

      .eyebrow {
        font-size: 0.7rem;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.7);
      }

      .toolbar-spacer {
        flex: 1 1 auto;
      }

      .dashboard-container {
        min-height: calc(100vh - 80px);
        background: transparent;
      }

      .dashboard-sidebar {
        width: 260px;
        background: rgba(17, 12, 29, 0.92);
        border-right: 1px solid rgba(184, 76, 255, 0.2);
      }

      .brand-block {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        padding: 1.5rem 1rem 1rem;
        border-bottom: 1px solid rgba(184, 76, 255, 0.15);
      }

      .brand-mark {
        display: grid;
        place-items: center;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 12px;
        background: linear-gradient(135deg, #b84cff, #8b5cf6);
        color: white;
        font-weight: 700;
      }

      .brand-block strong,
      .brand-block small {
        display: block;
      }

      .brand-block small {
        color: rgba(255, 255, 255, 0.6);
      }

      .dashboard-sidebar a {
        color: rgba(255, 255, 255, 0.8);
      }

      .dashboard-sidebar a.active-link {
        background: rgba(184, 76, 255, 0.12);
        color: white;
      }

      mat-sidenav-content {
        padding: 2rem;
      }

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 1rem;
        margin-bottom: 1.5rem;
      }

      .stats-grid mat-card {
        padding: 1rem 1.1rem;
        background: rgba(20, 14, 31, 0.85);
        border: 1px solid rgba(184, 76, 255, 0.18);
      }

      .stat-label {
        margin: 0 0 0.5rem;
        font-size: 0.72rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.62);
      }

      .stats-grid h2 {
        margin: 0;
        font-size: clamp(1.6rem, 2vw, 2.2rem);
      }

      .stat-trend {
        display: inline-block;
        margin-top: 0.5rem;
        font-size: 0.8rem;
        color: rgba(255, 255, 255, 0.75);
      }

      .stat-trend.positive {
        color: #65e0a5;
      }

      .content-grid {
        display: grid;
        grid-template-columns: 1.2fr 0.8fr;
        gap: 1rem;
      }

      .panel-card {
        background: rgba(20, 14, 31, 0.85);
        border: 1px solid rgba(184, 76, 255, 0.18);
        padding: 1rem;
      }

      .panel-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        margin-bottom: 1rem;
      }

      .panel-header h3 {
        margin: 0;
      }

      .badge {
        display: inline-flex;
        align-items: center;
        padding: 0.4rem 0.8rem;
        border-radius: 999px;
        background: rgba(184, 76, 255, 0.1);
        border: 1px solid rgba(184, 76, 255, 0.2);
        font-size: 0.72rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .focus-list,
      .milestone-list {
        margin: 0;
        padding-left: 1.2rem;
      }

      .focus-list li {
        margin-bottom: 0.75rem;
        line-height: 1.6;
      }

      .milestone-list {
        list-style: none;
        padding: 0;
        display: grid;
        gap: 1rem;
      }

      .milestone-list div {
        padding: 0.8rem 0.9rem;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(184, 76, 255, 0.08);
      }

      .milestone-list strong {
        display: block;
        margin-bottom: 0.3rem;
      }

      .milestone-list p {
        margin: 0;
        color: rgba(255, 255, 255, 0.7);
        line-height: 1.5;
      }

      @media (max-width: 900px) {
        .stats-grid,
        .content-grid {
          grid-template-columns: 1fr 1fr;
        }
      }

      @media (max-width: 640px) {
        mat-sidenav-content {
          padding: 1rem;
        }

        .stats-grid,
        .content-grid {
          grid-template-columns: 1fr;
        }

        .dashboard-sidebar {
          width: 220px;
        }
      }
    `
  ]
})
export class DashboardComponent {}
