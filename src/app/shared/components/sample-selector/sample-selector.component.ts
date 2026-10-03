import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { JsonSample } from '../../../models/json.model';

@Component({
  selector: 'app-sample-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="sample-panel">
      <div class="panel-title-row">
        <h3>Sample Data</h3>
      </div>

      <div class="sample-list" role="listbox" aria-label="Sample JSON documents">
        @for (sample of samples; track sample.id) {
          <button
            type="button"
            class="sample-item"
            (click)="sampleSelected.emit(sample)"
            aria-label="Load sample {{ sample.label }}"
          >
            <span class="sample-name">{{ sample.label }}</span>
            <small>{{ sample.description }}</small>
          </button>
        }
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }

    .sample-panel {
      background: rgba(15, 23, 42, 0.82);
      border: 1px solid rgba(148, 163, 184, 0.18);
      border-radius: 18px;
      padding: 1rem;
      box-shadow: 0 12px 35px rgba(15, 23, 42, 0.1);
    }

    .panel-title-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.9rem;
    }

    .panel-title-row h3 {
      margin: 0;
      font-size: 0.9rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #94a3b8;
    }

    .sample-list {
      display: grid;
      gap: 0.7rem;
    }

    .sample-item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.25rem;
      width: 100%;
      text-align: left;
      background: rgba(15, 23, 42, 0.8);
      color: #e2e8f0;
      border: 1px solid rgba(148, 163, 184, 0.16);
      border-radius: 12px;
      padding: 0.8rem 0.9rem;
      transition: border-color 0.2s ease, transform 0.2s ease;
    }

    .sample-item:hover {
      border-color: rgba(96, 165, 250, 0.45);
      transform: translateY(-1px);
    }

    .sample-name {
      font-weight: 600;
    }

    small {
      color: #94a3b8;
    }
  `
})
export class SampleSelectorComponent {
  @Input() samples: JsonSample[] = [];
  @Output() sampleSelected = new EventEmitter<JsonSample>();
}
