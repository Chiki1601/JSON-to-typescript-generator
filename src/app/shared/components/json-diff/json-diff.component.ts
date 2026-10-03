import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { JsonDiffItem, JsonDiffResult } from '../../../models/json.model';

@Component({
  selector: 'app-json-diff-viewer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="diff-panel">
      @if (!diff.items.length) {
        <div class="empty-state">Compare two JSON documents to see differences.</div>
      } @else {
        <div class="diff-list">
          @for (item of diff.items; track item.path) {
            <div class="diff-row" [class.changed]="item.type === 'changed'" [class.added]="item.type === 'added'" [class.removed]="item.type === 'removed'">
              <div class="diff-key">
                <span class="tag" [class.added]="item.type === 'added'" [class.removed]="item.type === 'removed'" [class.changed]="item.type === 'changed'">
                  {{ item.type | titlecase }}
                </span>
                <strong>{{ item.path || 'root' }}</strong>
              </div>

              <div class="diff-values">
                @if (item.type === 'added') {
                  <span>+ {{ formatValue(item.rightValue) }}</span>
                } @else if (item.type === 'removed') {
                  <span>- {{ formatValue(item.leftValue) }}</span>
                } @else if (item.type === 'changed') {
                  <span>Before: {{ formatValue(item.leftValue) }}</span>
                  <span>After: {{ formatValue(item.rightValue) }}</span>
                } @else {
                  <span>{{ formatValue(item.leftValue) }}</span>
                }
              </div>
            </div>
          }
        </div>
      }
    </section>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }

    .diff-panel {
      background: rgba(15, 23, 42, 0.82);
      border: 1px solid rgba(148, 163, 184, 0.18);
      border-radius: 18px;
      padding: 1rem;
      min-height: 280px;
    }

    .empty-state {
      display: grid;
      place-items: center;
      height: 100%;
      color: #94a3b8;
    }

    .diff-list {
      display: grid;
      gap: 0.75rem;
    }

    .diff-row {
      display: grid;
      gap: 0.5rem;
      padding: 0.8rem;
      background: rgba(15, 23, 42, 0.7);
      border: 1px solid rgba(148, 163, 184, 0.12);
      border-left: 4px solid rgba(148, 163, 184, 0.5);
      border-radius: 12px;
    }

    .diff-row.added {
      border-left-color: #4ade80;
    }

    .diff-row.removed {
      border-left-color: #f87171;
    }

    .diff-row.changed {
      border-left-color: #fbbf24;
    }

    .diff-key {
      display: flex;
      align-items: center;
      gap: 0.7rem;
      flex-wrap: wrap;
    }

    .tag {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.25rem 0.6rem;
      border-radius: 999px;
      font-size: 0.72rem;
      font-weight: 700;
      background: rgba(148, 163, 184, 0.15);
      color: #e2e8f0;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .tag.added {
      background: rgba(34, 197, 94, 0.12);
      color: #86efac;
    }

    .tag.removed {
      background: rgba(239, 68, 68, 0.12);
      color: #fca5a5;
    }

    .tag.changed {
      background: rgba(250, 204, 21, 0.12);
      color: #fde68a;
    }

    .diff-values {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      color: #cbd5e1;
      font-family: 'Consolas', 'Monaco', monospace;
      word-break: break-word;
    }
  `
})
export class JsonDiffViewerComponent {
  @Input() diff: JsonDiffResult = { items: [], changed: false };

  formatValue(value: unknown): string {
    if (value === undefined) {
      return 'undefined';
    }

    if (typeof value === 'string') {
      return JSON.stringify(value);
    }

    if (typeof value === 'number' || typeof value === 'boolean' || value === null) {
      return String(value);
    }

    return JSON.stringify(value, null, 2);
  }
}
