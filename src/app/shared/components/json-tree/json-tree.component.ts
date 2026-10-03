import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-json-tree-node',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isObject(value)) {
      <div class="tree-node object-node">
        <div class="tree-header">
          <button type="button" class="tree-toggle" [attr.aria-expanded]="isExpanded()" (click)="toggleExpand()">
            {{ isExpanded() ? '▾' : '▸' }}
          </button>
          <strong>{{ label }}</strong>
          <span class="node-type">object</span>
        </div>

        @if (isExpanded()) {
          <div class="tree-children">
            @for (entry of entries; track entry[0]) {
              <div class="tree-child">
                <app-json-tree-node [value]="entry[1]" [label]="entry[0]" [path]="path + '.' + entry[0]"></app-json-tree-node>
              </div>
            }
          </div>
        }
      </div>
    } @else if (isArray(value)) {
      <div class="tree-node array-node">
        <div class="tree-header">
          <button type="button" class="tree-toggle" [attr.aria-expanded]="isExpanded()" (click)="toggleExpand()">
            {{ isExpanded() ? '▾' : '▸' }}
          </button>
          <strong>{{ label }}</strong>
          <span class="node-type">array</span>
        </div>

        @if (isExpanded()) {
          <div class="tree-children">
            @for (item of value; track $index) {
              <div class="tree-child">
                <app-json-tree-node [value]="item" [label]="$index.toString()" [path]="path + '[' + $index + ']' "></app-json-tree-node>
              </div>
            }
          </div>
        }
      </div>
    } @else {
      <div class="tree-leaf">
        <div class="leaf-label">{{ label }}</div>
        <div class="leaf-value">{{ renderValue(value) }}</div>
        <span class="node-type">{{ detectType(value) }}</span>
      </div>
    }
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }

    .tree-node,
    .tree-leaf {
      border-left: 1px solid rgba(148, 163, 184, 0.2);
      padding-left: 0.8rem;
      margin-left: 0.2rem;
    }

    .tree-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.25rem 0;
      color: #e2e8f0;
      font-family: 'Consolas', 'Monaco', monospace;
    }

    .tree-children {
      display: grid;
      gap: 0.3rem;
      margin-top: 0.4rem;
      margin-left: 0.5rem;
    }

    .tree-child {
      display: block;
    }

    .tree-toggle {
      width: 1.2rem;
      height: 1.2rem;
      border: none;
      background: transparent;
      color: #93c5fd;
      cursor: pointer;
      padding: 0;
      font-size: 1rem;
      line-height: 1;
    }

    .node-type {
      color: #94a3b8;
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .tree-leaf {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-wrap: wrap;
      padding: 0.25rem 0;
      color: #e2e8f0;
      font-family: 'Consolas', 'Monaco', monospace;
    }

    .leaf-label {
      color: #93c5fd;
      font-weight: 600;
    }

    .leaf-value {
      color: #fef3c7;
      word-break: break-word;
    }
  `
})
export class JsonTreeNodeComponent {
  @Input() value: unknown = null;
  @Input() label = 'root';
  @Input() path = 'root';
  @Input() expanded = true;

  readonly isExpanded = signal(this.expanded);

  get entries(): [string, unknown][] {
    if (this.isObject(this.value)) {
      return Object.entries(this.value);
    }

    return [];
  }

  toggleExpand(): void {
    this.isExpanded.update((state) => !state);
  }

  isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  }

  isArray(value: unknown): value is unknown[] {
    return Array.isArray(value);
  }

  detectType(value: unknown): string {
    if (value === null) return 'null';
    if (typeof value === 'string') return 'string';
    if (typeof value === 'number') return 'number';
    if (typeof value === 'boolean') return 'boolean';
    if (Array.isArray(value)) return 'array';
    if (typeof value === 'object') return 'object';
    return 'unknown';
  }

  renderValue(value: unknown): string {
    if (typeof value === 'string') {
      return JSON.stringify(value);
    }

    if (value === null) {
      return 'null';
    }

    if (typeof value === 'object') {
      return JSON.stringify(value);
    }

    return String(value);
  }
}

@Component({
  selector: 'app-json-tree',
  standalone: true,
  imports: [JsonTreeNodeComponent],
  template: `
    @if (data === null || data === undefined) {
      <div class="empty-state">No JSON is available to explore yet.</div>
    } @else {
      <div class="tree-root">
        <app-json-tree-node [value]="data" [label]="'root'" [path]="'root'" [expanded]="expanded"></app-json-tree-node>
      </div>
    }
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }

    .tree-root {
      display: grid;
      gap: 0.5rem;
      padding: 0.5rem 0;
    }

    .empty-state {
      display: grid;
      place-items: center;
      min-height: 160px;
      color: #94a3b8;
    }
  `
})
export class JsonTreeComponent {
  @Input() data: unknown = null;
  @Input() expanded = true;
}
