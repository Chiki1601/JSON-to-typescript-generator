import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-json-editor',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="editor-card" [attr.data-tour]="tourTarget || null">
      <div class="editor-header">
        <div>
          <span class="eyebrow">{{ eyebrow }}</span>
          <h3>{{ title }}</h3>
        </div>

        <div class="action-row">
          @if (showSampleButton) {
            <button type="button" class="secondary-button" (click)="sample.emit()">Sample</button>
          }
          <button type="button" class="secondary-button" (click)="clear.emit()">Clear</button>
          <button type="button" class="secondary-button" data-tour="editor-validate" (click)="validate.emit()">Validate</button>
          <button type="button" class="secondary-button" data-tour="editor-format" (click)="format.emit()">Format</button>
          <button type="button" class="secondary-button" (click)="minify.emit()">Minify</button>
          <button type="button" class="secondary-button" (click)="copy.emit()">Copy</button>
          <button type="button" class="secondary-button" (click)="download.emit()">Download</button>
        </div>
      </div>

      <textarea
        [value]="value"
        [attr.aria-label]="title"
        (input)="valueChange.emit($any($event.target).value)"
        spellcheck="false"
        [placeholder]="placeholder"
      ></textarea>

      <div class="editor-status" [class.valid]="isValid" [class.invalid]="!isValid">
        {{ status }}
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }

    .editor-card {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      background: rgba(15, 23, 42, 0.82);
      border: 1px solid rgba(148, 163, 184, 0.18);
      border-radius: 18px;
      padding: 1rem;
      box-shadow: 0 12px 35px rgba(15, 23, 42, 0.08);
      height: 100%;
    }

    .editor-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .eyebrow {
      display: inline-block;
      margin-bottom: 0.35rem;
      font-size: 0.72rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #93c5fd;
    }

    h3 {
      margin: 0;
      font-size: 1.15rem;
    }

    .action-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.55rem;
      justify-content: flex-end;
    }

    .secondary-button {
      border: 1px solid rgba(148, 163, 184, 0.16);
      border-radius: 10px;
      background: rgba(15, 23, 42, 0.7);
      color: #e2e8f0;
      padding: 0.45rem 0.7rem;
      cursor: pointer;
      transition: transform 0.2s ease, border-color 0.2s ease;
    }

    .secondary-button:hover {
      transform: translateY(-1px);
      border-color: rgba(96, 165, 250, 0.45);
    }

    textarea {
      width: 100%;
      min-height: 440px;
      resize: vertical;
      background: rgba(15, 23, 42, 0.7);
      color: #e2e8f0;
      border: 1px solid rgba(148, 163, 184, 0.12);
      border-radius: 14px;
      padding: 1rem;
      font-family: 'Consolas', 'Monaco', monospace;
      font-size: 0.95rem;
      line-height: 1.55;
      tab-size: 2;
    }

    textarea:focus {
      outline: 2px solid rgba(59, 130, 246, 0.4);
      border-color: rgba(96, 165, 250, 0.6);
    }

    .editor-status {
      display: inline-flex;
      align-items: center;
      width: fit-content;
      padding: 0.35rem 0.75rem;
      border-radius: 999px;
      font-size: 0.82rem;
      font-weight: 600;
      background: rgba(148, 163, 184, 0.12);
      color: #cbd5e1;
    }

    .editor-status.valid {
      background: rgba(34, 197, 94, 0.12);
      color: #86efac;
    }

    .editor-status.invalid {
      background: rgba(239, 68, 68, 0.12);
      color: #fca5a5;
    }

    @media (max-width: 767px) {
      textarea {
        min-height: 280px;
      }
    }
  `
})
export class JsonEditorComponent {
  @Input() tourTarget = '';
  @Input() title = 'JSON Input';
  @Input() eyebrow = 'Editor';
  @Input() value = '';
  @Input() status = 'Ready';
  @Input() isValid = true;
  @Input() showSampleButton = true;
  @Input() placeholder = 'Paste or type JSON here...';

  @Output() valueChange = new EventEmitter<string>();
  @Output() validate = new EventEmitter<void>();
  @Output() format = new EventEmitter<void>();
  @Output() minify = new EventEmitter<void>();
  @Output() clear = new EventEmitter<void>();
  @Output() copy = new EventEmitter<void>();
  @Output() download = new EventEmitter<void>();
  @Output() sample = new EventEmitter<void>();
}
