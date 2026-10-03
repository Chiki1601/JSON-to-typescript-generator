import { Injectable, signal } from '@angular/core';

import { ThemeMode } from '../models/json.model';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'jsonpilot-theme';

  readonly theme = signal<ThemeMode>(this.readStoredTheme());

  constructor() {
    this.applyTheme(this.theme());
  }

  toggleTheme(): void {
    const next = this.theme() === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  }

  setTheme(value: ThemeMode): void {
    this.theme.set(value);
    this.applyTheme(value);

    try {
      localStorage.setItem(this.storageKey, value);
    } catch {
      // Ignore storage failures gracefully.
    }
  }

  private readStoredTheme(): ThemeMode {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored === 'light' || stored === 'dark' ? stored : 'dark';
    } catch {
      return 'dark';
    }
  }

  private applyTheme(mode: ThemeMode): void {
    document.body.setAttribute('data-theme', mode);
    document.body.classList.toggle('dark-theme', mode === 'dark');
    document.body.classList.toggle('light-theme', mode === 'light');
  }
}
