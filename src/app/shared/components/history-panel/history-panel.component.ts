import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { JsonHistoryItem } from '../../../models/json.model';

@Component({
  selector: 'app-history-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="history-panel">
      <div class="panel-title-row">
        <h3>Recent JSON</h3>
        @if (items.length) {
          <button type="button" class="ghost-button" (click)="clear.emit()">Clear</button>
        }
      </div>

      @if (!items.length) {
        <div class="empty-state">No recent entries yet.</div>
      } @else {
        <div class="history-list">
          @for (item of items; track item.id) {
            <div class="history-item">
              <div class="history-copy">
                <strong>{{ item.title }}</strong>
                <small>{{ item.createdAt | date: 'short' }}</small>
              </div>

              <div class="history-actions">
                <button type="button" class="ghost-button" (click)="open.emit(item)">Open</button>
                <button type="button" class="ghost-button danger" (click)="delete.emit(item.id)">Delete</button>
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

    .history-panel {
      background: rgba(15, 23, 42, 0.82);
      border: 1px solid rgba(148, 163, 184, 0.18);
      border-radius: 18px;
      padding: 1rem;
      box-shadow: 0 12px 35px rgba(15, 23, 42, 0.08);
    }

    .panel-title-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      margin-bottom: 0.9rem;
    }

    .panel-title-row h3 {
      margin: 0;
      font-size: 0.9rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #94a3b8;
    }

    .empty-state {
      color: #94a3b8;
      font-size: 0.9rem;
      padding: 0.6rem 0;
    }

    .history-list {
      display: grid;
      gap: 0.7rem;
    }

    .history-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.8rem;
      padding: 0.75rem 0.8rem;
      background: rgba(15, 23, 42, 0.7);
      border: 1px solid rgba(148, 163, 184, 0.12);
      border-radius: 12px;
    }

    .history-copy {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      min-width: 0;
    }

    .history-copy strong {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    small {
      color: #94a3b8;
    }

    .history-actions {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .ghost-button {
      border: 1px solid rgba(148, 163, 184, 0.2);
      background: transparent;
      color: #e2e8f0;
      padding: 0.45rem 0.7rem;
      border-radius: 10px;
      cursor: pointer;
    }

    .ghost-button.danger {
      color: #fca5a5;
      border-color: rgba(248, 113, 113, 0.2);
    }
  `
})
export class HistoryPanelComponent {
  @Input() items: JsonHistoryItem[] = [];
  @Output() open = new EventEmitter<JsonHistoryItem>();
  @Output() delete = new EventEmitter<string>();
  @Output() clear = new EventEmitter<void>();
}
