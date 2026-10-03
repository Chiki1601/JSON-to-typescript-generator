import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-typescript-preview',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="ts-panel">
      @if (!code) {
        <div class="empty-state">Generate interface definitions from valid JSON.</div>
      } @else {
        <div class="ts-toolbar">
          <button type="button" class="ghost-button" (click)="copy.emit()">Copy</button>
          <button type="button" class="ghost-button" (click)="download.emit()">Download</button>
        </div>

        <pre>{{ code }}</pre>
      }
    </section>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }

    .ts-panel {
      background: rgba(15, 23, 42, 0.82);
      border: 1px solid rgba(148, 163, 184, 0.18);
      border-radius: 18px;
      padding: 1rem;
      min-height: 260px;
    }

    .empty-state {
      display: grid;
      place-items: center;
      height: 180px;
      color: #94a3b8;
    }

    .ts-toolbar {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .ghost-button {
      border: 1px solid rgba(148, 163, 184, 0.18);
      border-radius: 10px;
      background: transparent;
      color: #e2e8f0;
      padding: 0.45rem 0.7rem;
      cursor: pointer;
    }

    pre {
      margin: 0;
      padding: 1rem;
      background: rgba(2, 6, 23, 0.9);
      border-radius: 12px;
      color: #dbeafe;
      border: 1px solid rgba(148, 163, 184, 0.12);
      overflow: auto;
      font-size: 0.92rem;
      line-height: 1.6;
      font-family: 'Consolas', 'Monaco', monospace;
      white-space: pre-wrap;
      word-break: break-word;
    }
  `
})
export class TypeScriptPreviewComponent {
  @Input() code = '';
  @Output() copy = new EventEmitter<void>();
  @Output() download = new EventEmitter<void>();
}
