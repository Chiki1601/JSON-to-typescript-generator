import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';

import { JsonDiffResult, JsonHistoryItem, JsonSample, JsonTab, JsonValidationResult, ThemeMode, TypeScriptGenerationResult } from '../../models/json.model';
import { ClipboardService } from '../../services/clipboard.service';
import { JsonHistoryService } from '../../services/json-history.service';
import { ThemeService } from '../../services/theme.service';
import { compareJson, formatJson, generateTypeScriptFromJson, minifyJson, validateJson } from '../../utils/json-utils';
import { HistoryPanelComponent } from '../../shared/components/history-panel/history-panel.component';
import { JsonDiffViewerComponent } from '../../shared/components/json-diff/json-diff.component';
import { JsonEditorComponent } from '../../shared/components/json-editor/json-editor.component';
import { JsonTreeComponent } from '../../shared/components/json-tree/json-tree.component';
import { SampleSelectorComponent } from '../../shared/components/sample-selector/sample-selector.component';
import { TypeScriptPreviewComponent } from '../../shared/components/typescript-preview/typescript-preview.component';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [
    CommonModule,
    JsonEditorComponent,
    SampleSelectorComponent,
    HistoryPanelComponent,
    JsonDiffViewerComponent,
    JsonTreeComponent,
    TypeScriptPreviewComponent
  ],
  template: `
    <div class="app-shell">
      <header class="topbar">
        <div class="brand" aria-label="JSONPilot home">
          <div class="brand-mark">J</div>
          <div>
            <div class="brand-name">JSONPilot</div>
            <div class="brand-subtitle">Smart JSON Workbench</div>
          </div>
        </div>

        <nav class="topnav" aria-label="Main navigation">
          <button type="button" class="nav-button" data-tour="nav-workspace" [class.active]="!demoActive() && selectedTab() !== 'explorer' && selectedTab() !== 'compare'" (click)="openTool('validate')">Workspace</button>
          <button type="button" class="nav-button" data-tour="nav-explorer" [class.active]="!demoActive() && selectedTab() === 'explorer'" (click)="openTool('explorer')">Explorer</button>
          <button type="button" class="nav-button" data-tour="nav-history" [class.active]="!demoActive() && selectedTab() === 'compare'" (click)="openTool('compare')">History</button>
          <button type="button" class="nav-button" [class.active]="demoActive()" (click)="demoActive.set(true)">Demo</button>
        </nav>

        <div class="header-actions">
          <button type="button" class="help-button" data-tour="header-help" (click)="toggleHelp()">Help</button>
          <button type="button" class="theme-button" data-tour="header-theme" (click)="toggleTheme()">
            {{ theme() === 'dark' ? 'Light Mode' : 'Dark Mode' }}
          </button>
        </div>
      </header>

      @if (helpOpen()) {
        <div class="dialog-backdrop" (click)="closeHelp()">
          <div class="shortcut-dialog" role="dialog" aria-modal="true" aria-label="Keyboard shortcuts" (click)="$event.stopPropagation()">
            <div class="dialog-header">
              <h2>Keyboard Shortcuts</h2>
              <button type="button" class="dialog-close" (click)="closeHelp()" aria-label="Close help dialog">Close</button>
            </div>
            <ul class="shortcut-list">
              <li><kbd>Ctrl + Enter</kbd><span>Validate JSON</span></li>
              <li><kbd>Ctrl + Shift + F</kbd><span>Format JSON</span></li>
              <li><kbd>Ctrl + Shift + C</kbd><span>Copy current output</span></li>
              <li><kbd>Esc</kbd><span>Close dialog</span></li>
            </ul>
          </div>
        </div>
      }

      @if (toast()) {
        <div class="toast" role="status" aria-live="polite">
          {{ toast() }}
        </div>
      }

      @if (guidedTourActive()) {
        <section
          class="tour-popover"
          [class.point-up]="tourPosition().arrow === 'up'"
          [style.top.px]="tourPosition().top"
          [style.left.px]="tourPosition().left"
          role="region"
          aria-label="JSONPilot guided tour"
          aria-live="polite"
        >
          <div class="tour-kicker">POINTER GUIDE <span>{{ tourStep() + 1 }} / {{ tourSteps.length }}</span></div>
          <h2>{{ tourSteps[tourStep()].title }}</h2>
          <p>{{ tourSteps[tourStep()].description }}</p>
          <div class="tour-controls">
            <button type="button" class="tour-skip" (click)="endGuidedTour()">Skip guide</button>
            <div class="tour-navigation">
              <button type="button" class="tour-back" [disabled]="tourStep() === 0" (click)="moveTour(-1)">Back</button>
              <button type="button" class="tour-next" (click)="moveTour(1)">{{ tourStep() === tourSteps.length - 1 ? 'Finish' : 'Next' }}</button>
            </div>
          </div>
        </section>
      }

      <main class="workspace">
        @if (demoActive()) {
          <section class="demo-page" aria-labelledby="demo-title">
            <div class="demo-intro">
              <p class="eyebrow">A guided tour of JSONPilot</p>
              <h1 id="demo-title">From raw JSON to clear answers.</h1>
              <p class="subtitle">Follow a real workflow, then open any tool and try it with the sample data already loaded in your workspace.</p>
              <div class="demo-actions">
                <button type="button" class="primary-button" (click)="startGuidedTour()">Start pointer guide</button>
                <button type="button" class="secondary-cta" (click)="loadDemoSample('employee')">Load the employee sample</button>
              </div>
            </div>

            <section class="demo-workflow" aria-labelledby="workflow-title">
              <div class="demo-section-heading">
                <p class="eyebrow">A simple workflow</p>
                <h2 id="workflow-title">Four steps, one JSON document</h2>
              </div>
              <ol class="workflow-steps">
                <li><span class="step-number">01</span><div><h3>Bring in data</h3><p>Paste JSON into the editor or choose a realistic payload from Sample Data.</p></div></li>
                <li><span class="step-number">02</span><div><h3>Check and shape it</h3><p>Validate syntax, then format it for reading or minify it for compact output.</p></div></li>
                <li><span class="step-number">03</span><div><h3>Explore or generate</h3><p>Expand nested values in the tree, or turn the data structure into TypeScript interfaces.</p></div></li>
                <li><span class="step-number">04</span><div><h3>Compare and keep</h3><p>Compare two JSON documents, then save useful input to local history for later.</p></div></li>
              </ol>
            </section>

            <section class="demo-features" aria-labelledby="features-title">
              <div class="demo-section-heading">
                <p class="eyebrow">Explore every tool</p>
                <h2 id="features-title">What you can do</h2>
              </div>
              <div class="demo-feature-grid">
                <article class="demo-feature">
                  <span class="feature-index">01 / WORKSPACE</span><h3>Validate JSON</h3>
                  <p>Catch malformed JSON and inspect a clear success state or parser error before using the data.</p>
                  <button type="button" class="demo-link" (click)="openTool('validate')">Try validation <span aria-hidden="true">→</span></button>
                </article>
                <article class="demo-feature">
                  <span class="feature-index">02 / TRANSFORM</span><h3>Format and minify</h3>
                  <p>Pretty-print nested data for humans, or remove extra whitespace for a compact JSON payload.</p>
                  <button type="button" class="demo-link" (click)="openTool('format')">Try formatting <span aria-hidden="true">→</span></button>
                </article>
                <article class="demo-feature">
                  <span class="feature-index">03 / COMPARE</span><h3>Find what changed</h3>
                  <p>Paste two documents to see added, removed, and changed values by their JSON paths.</p>
                  <button type="button" class="demo-link" (click)="openDemoCompare()">Try a comparison <span aria-hidden="true">→</span></button>
                </article>
                <article class="demo-feature">
                  <span class="feature-index">04 / GENERATE</span><h3>Create TypeScript types</h3>
                  <p>Generate interfaces from valid JSON, then copy the code or download it as a TypeScript file.</p>
                  <button type="button" class="demo-link" (click)="openTool('typescript')">Try TypeScript <span aria-hidden="true">→</span></button>
                </article>
                <article class="demo-feature">
                  <span class="feature-index">05 / EXPLORE</span><h3>Navigate the JSON tree</h3>
                  <p>Inspect nested objects and arrays visually. Expand or collapse the tree to focus on the useful parts.</p>
                  <button type="button" class="demo-link" (click)="openTool('explorer')">Open Explorer <span aria-hidden="true">→</span></button>
                </article>
                <article class="demo-feature">
                  <span class="feature-index">06 / SAMPLES</span><h3>Start with sample data</h3>
                  <p>Load employee, product, API, finance, or organization examples to try the tools without preparing input.</p>
                  <button type="button" class="demo-link" (click)="loadDemoSample('product')">Load a product sample <span aria-hidden="true">→</span></button>
                </article>
                <article class="demo-feature">
                  <span class="feature-index">07 / HISTORY</span><h3>Return to recent work</h3>
                  <p>Save JSON to browser-local history, reopen an entry, remove one item, or clear the list.</p>
                  <button type="button" class="demo-link" (click)="saveDemoToHistory()">Save current sample <span aria-hidden="true">→</span></button>
                </article>
                <article class="demo-feature">
                  <span class="feature-index">08 / YOUR SETUP</span><h3>Make it yours</h3>
                  <p>Switch themes from the header and open Help for shortcuts. The editor can validate, format, minify, clear, copy, and download JSON.</p>
                  <div class="demo-shortcuts"><kbd>Ctrl + Enter</kbd><span>Validate</span><kbd>Ctrl + Shift + F</kbd><span>Format</span><kbd>Ctrl + Shift + C</kbd><span>Copy output</span><kbd>Esc</kbd><span>Close Help</span></div>
                </article>
              </div>
            </section>

            <aside class="demo-privacy"><span class="privacy-mark" aria-hidden="true">◎</span><div><h2>Private by design</h2><p>Your JSON is processed in this browser. History is stored locally on this device and is not sent to a server.</p></div></aside>
          </section>
        } @else {
        <section class="hero-card">
          <div class="hero-copy">
            <p class="eyebrow">Developer utility</p>
            <h1>JSONPilot</h1>
            <p class="subtitle">Inspect, validate, transform and understand JSON — entirely in your browser.</p>
            <div class="feature-grid">
              <div class="feature-item">JSON Validation</div>
              <div class="feature-item">JSON Formatting</div>
              <div class="feature-item">JSON Diff</div>
              <div class="feature-item">TypeScript Generator</div>
              <div class="feature-item">JSON Explorer</div>
            </div>
          </div>

          <div class="hero-actions">
            <button type="button" class="primary-button" (click)="selectedTab.set('validate')">Open Workspace</button>
            <button type="button" class="secondary-cta" (click)="loadSampleById('employee')">Try Sample JSON</button>
            <p class="privacy-note">Your JSON stays in your browser.</p>
          </div>
        </section>

        <section class="tool-panel">
          <nav class="tab-bar" aria-label="JSONPilot tools">
            @for (tab of tabs; track tab.id) {
              <button
                type="button"
                class="tab-button"
                [attr.data-tour]="'tool-' + tab.id"
                [class.active]="selectedTab() === tab.id"
                (click)="selectedTab.set(tab.id)"
              >
                {{ tab.label }}
              </button>
            }
          </nav>

          <div class="content-grid">
            <div class="editor-column">
              @if (selectedTab() === 'compare') {
                <div class="compare-grid">
                  <app-json-editor
                    title="Left JSON"
                    eyebrow="Compare"
                    [value]="compareLeft()"
                    [status]="compareStatusLeft()"
                    [isValid]="compareStateLeft().valid"
                    [showSampleButton]="false"
                    [tourTarget]="'compare-left'"
                    placeholder="Paste the left JSON document"
                    (valueChange)="compareLeft.set($event)"
                    (clear)="compareLeft.set('')"
                    (validate)="compareInputs()"
                    (copy)="copyCurrentValue(compareLeft())"
                    (download)="downloadJson(compareLeft(), 'left-json.json')"
                  ></app-json-editor>

                  <app-json-editor
                    title="Right JSON"
                    eyebrow="Compare"
                    [value]="compareRight()"
                    [status]="compareStatusRight()"
                    [isValid]="compareStateRight().valid"
                    [showSampleButton]="false"
                    [tourTarget]="'compare-right'"
                    placeholder="Paste the right JSON document"
                    (valueChange)="compareRight.set($event)"
                    (clear)="compareRight.set('')"
                    (validate)="compareInputs()"
                    (copy)="copyCurrentValue(compareRight())"
                    (download)="downloadJson(compareRight(), 'right-json.json')"
                  ></app-json-editor>
                </div>
              } @else {
                <app-json-editor
                  title="JSON Input"
                  eyebrow="Workspace"
                  [value]="jsonInput()"
                  [status]="validationStatus()"
                  [isValid]="validationState().valid"
                  [showSampleButton]="true"
                  tourTarget="json-input"
                  placeholder="Paste or type JSON here..."
                  (valueChange)="jsonInput.set($event)"
                  (validate)="validateCurrentJson()"
                  (format)="formatCurrentJson()"
                  (minify)="minifyCurrentJson()"
                  (clear)="clearJsonInput()"
                  (copy)="copyCurrentValue(currentOutput())"
                  (download)="downloadJson(currentOutput(), selectedTab() + '-output.json')"
                  (sample)="loadSampleById('employee')"
                ></app-json-editor>
              }
            </div>

            <aside class="sidebar">
              <app-sample-selector data-tour="samples" [samples]="samples()" (sampleSelected)="loadSampleById($event.id)"></app-sample-selector>
              <app-history-panel
                data-tour="history-panel"
                [items]="history()"
                (open)="openHistoryItem($event)"
                (delete)="removeHistoryItem($event)"
                (clear)="clearHistory()"
              ></app-history-panel>
            </aside>
          </div>

          <section class="output-panel">
            @switch (selectedTab()) {
              @case ('validate') {
                <div class="output-header">
                  <h3>Validation Result</h3>
                  <button type="button" class="secondary-button" (click)="saveCurrentJsonToHistory()">Save to history</button>
                </div>
                <pre>{{ validationPreview() }}</pre>
              }
              @case ('format') {
                <div class="output-header">
                  <h3>Formatted JSON</h3>
                  <button type="button" class="secondary-button" (click)="copyCurrentValue(formattedOutput())">Copy</button>
                </div>
                <pre>{{ formattedOutput() }}</pre>
              }
              @case ('compare') {
                <div class="output-header">
                  <h3>JSON Compare</h3>
                  <button type="button" class="secondary-button" (click)="compareInputs()">Compare</button>
                </div>
                <app-json-diff-viewer [diff]="diffResult()"></app-json-diff-viewer>
              }
              @case ('typescript') {
                <div class="output-header">
                  <h3>TypeScript Interfaces</h3>
                </div>
                <app-typescript-preview [code]="tsOutput()" (copy)="copyCurrentValue(tsOutput())" (download)="downloadJson(tsOutput(), 'jsonpilot-model.ts')"></app-typescript-preview>
              }
              @case ('explorer') {
                <div class="output-header">
                  <h3>JSON Explorer</h3>
                  <button type="button" class="secondary-button" (click)="expandTree()">Expand All</button>
                  <button type="button" class="secondary-button" (click)="collapseTree()">Collapse All</button>
                </div>
                <app-json-tree [data]="treeData()" [expanded]="treeExpanded()"></app-json-tree>
              }
            }
          </section>
        </section>
        }
      </main>

      <footer class="page-footer">
        <span>JSONPilot</span>
        <span>Built with Angular + TypeScript</span>
      </footer>
    </div>
  `,
  styles: `
    :host {
      display: block;
      min-height: 100vh;
    }

    .app-shell {
      width: min(1320px, calc(100% - 24px));
      margin: 0 auto;
      padding: 1.5rem 0 3rem;
    }

    .topbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem 0 1.2rem;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }

    .brand-mark {
      width: 44px;
      height: 44px;
      display: grid;
      place-items: center;
      border-radius: 12px;
      background: linear-gradient(135deg, #2563eb, #8b5cf6);
      color: white;
      font-weight: 800;
      box-shadow: 0 16px 30px rgba(59, 130, 246, 0.25);
    }

    .brand-name {
      font-size: 1.1rem;
      font-weight: 700;
      color: #e2e8f0;
    }

    .brand-subtitle {
      font-size: 0.74rem;
      color: #94a3b8;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    .theme-button,
    .help-button,
    .primary-button,
    .secondary-button,
    .tab-button,
    .nav-button,
    .secondary-cta,
    .dialog-close {
      border: 1px solid rgba(148, 163, 184, 0.18);
      border-radius: 12px;
      cursor: pointer;
      transition: transform 0.2s ease, border-color 0.2s ease;
    }

    .theme-button,
    .help-button,
    .secondary-button,
    .nav-button,
    .dialog-close,
    .secondary-cta {
      background: rgba(15, 23, 42, 0.72);
      color: #e2e8f0;
      padding: 0.65rem 0.8rem;
    }

    .primary-button {
      background: linear-gradient(135deg, #2563eb, #8b5cf6);
      color: white;
      border: none;
      padding: 0.9rem 1.3rem;
      font-weight: 700;
      box-shadow: 0 12px 24px rgba(59, 130, 246, 0.2);
    }

    .theme-button:hover,
    .help-button:hover,
    .secondary-button:hover,
    .tab-button:hover,
    .nav-button:hover,
    .dialog-close:hover,
    .primary-button:hover,
    .secondary-cta:hover {
      transform: translateY(-1px);
      border-color: rgba(96, 165, 250, 0.45);
    }

    .topnav {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .nav-button.active {
      background: rgba(59, 130, 246, 0.16);
      border-color: rgba(96, 165, 250, 0.5);
      color: #eff6ff;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .workspace {
      display: grid;
      gap: 1.5rem;
    }

    .toast {
      position: fixed;
      top: 1.25rem;
      right: 1.25rem;
      z-index: 20;
      background: rgba(15, 23, 42, 0.9);
      border: 1px solid rgba(148, 163, 184, 0.2);
      color: #e2e8f0;
      padding: 0.75rem 1rem;
      border-radius: 12px;
      box-shadow: 0 20px 30px rgba(15, 23, 42, 0.18);
    }

    .hero-card {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      align-items: center;
      background: rgba(15, 23, 42, 0.7);
      border: 1px solid rgba(148, 163, 184, 0.18);
      border-radius: 22px;
      padding: 1.5rem;
      box-shadow: 0 16px 35px rgba(15, 23, 42, 0.12);
    }

    .hero-copy {
      max-width: 760px;
    }

    .eyebrow {
      margin: 0;
      font-size: 0.74rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #93c5fd;
    }

    h1 {
      margin: 0.4rem 0 0.6rem;
      font-size: clamp(2.2rem, 4vw, 4rem);
      line-height: 1.05;
      letter-spacing: -0.05em;
    }

    .subtitle {
      margin: 0;
      color: #cbd5e1;
      font-size: 1.04rem;
      max-width: 600px;
    }

    .feature-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.7rem;
      margin-top: 1rem;
    }

    .feature-item {
      background: rgba(59, 130, 246, 0.08);
      border: 1px solid rgba(96, 165, 250, 0.2);
      border-radius: 999px;
      padding: 0.45rem 0.75rem;
      font-size: 0.82rem;
      color: #dbeafe;
    }

    .hero-actions {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.75rem;
      flex-shrink: 0;
    }

    .secondary-cta {
      background: rgba(148, 163, 184, 0.08);
      color: #e2e8f0;
      width: 100%;
      min-width: 160px;
      font-weight: 600;
    }

    .privacy-note {
      margin: 0;
      color: #94a3b8;
      font-size: 0.8rem;
      max-width: 220px;
      text-align: right;
    }

    .tool-panel {
      background: rgba(15, 23, 42, 0.7);
      border: 1px solid rgba(148, 163, 184, 0.18);
      border-radius: 22px;
      padding: 1.25rem;
      box-shadow: 0 16px 35px rgba(15, 23, 42, 0.08);
    }

    .tab-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 0.7rem;
      margin-bottom: 1rem;
    }

    .tab-button {
      background: rgba(15, 23, 42, 0.66);
      color: #cbd5e1;
      padding: 0.7rem 1rem;
      font-weight: 600;
    }

    .tab-button.active {
      background: linear-gradient(135deg, rgba(37, 99, 235, 0.18), rgba(139, 92, 246, 0.2));
      border-color: rgba(96, 165, 250, 0.5);
      color: #f8fbff;
    }

    .content-grid {
      display: grid;
      grid-template-columns: minmax(0, 2.2fr) minmax(260px, 0.85fr);
      gap: 1rem;
      align-items: start;
    }

    .sidebar {
      display: grid;
      gap: 1rem;
    }

    .compare-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
    }

    .output-panel {
      margin-top: 1.2rem;
      background: rgba(15, 23, 42, 0.66);
      border: 1px solid rgba(148, 163, 184, 0.15);
      border-radius: 18px;
      padding: 1rem;
    }

    .output-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      margin-bottom: 0.9rem;
      flex-wrap: wrap;
    }

    .output-header h3 {
      margin: 0;
      font-size: 1rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #94a3b8;
    }

    .dialog-backdrop {
      position: fixed;
      inset: 0;
      z-index: 30;
      background: rgba(2, 6, 23, 0.7);
      display: grid;
      place-items: center;
      padding: 1rem;
    }

    .shortcut-dialog {
      width: min(480px, 100%);
      background: rgba(15, 23, 42, 0.96);
      border: 1px solid rgba(148, 163, 184, 0.2);
      border-radius: 18px;
      box-shadow: 0 30px 50px rgba(15, 23, 42, 0.25);
      padding: 1.2rem;
    }

    .dialog-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .dialog-header h2 {
      margin: 0;
      font-size: 1.05rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #cbd5e1;
    }

    .shortcut-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      gap: 0.8rem;
    }

    .shortcut-list li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding: 0.7rem 0.8rem;
      background: rgba(15, 23, 42, 0.72);
      border: 1px solid rgba(148, 163, 184, 0.14);
      border-radius: 12px;
    }

    kbd {
      padding: 0.3rem 0.55rem;
      border-radius: 8px;
      background: rgba(148, 163, 184, 0.12);
      border: 1px solid rgba(148, 163, 184, 0.22);
      color: #f8fafc;
      font-family: 'Consolas', 'Monaco', monospace;
      font-size: 0.8rem;
    }

    .page-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      padding: 1rem 0 0.25rem;
      color: #94a3b8;
      font-size: 0.82rem;
    }

    pre {
      margin: 0;
      background: rgba(2, 6, 23, 0.9);
      border: 1px solid rgba(148, 163, 184, 0.12);
      border-radius: 14px;
      color: #dbeafe;
      font-size: 0.9rem;
      line-height: 1.6;
      font-family: 'Consolas', 'Monaco', monospace;
      white-space: pre-wrap;
      padding: 1rem;
      overflow: auto;
      min-height: 220px;
    }

    @media (max-width: 960px) {
      .content-grid {
        grid-template-columns: 1fr;
      }

      .compare-grid {
        grid-template-columns: 1fr;
      }

      .hero-card {
        flex-direction: column;
        align-items: flex-start;
      }

      .hero-actions {
        align-items: flex-start;
      }

      .privacy-note {
        text-align: left;
      }

      .page-footer {
        flex-direction: column;
        align-items: flex-start;
      }
    }

  `
})
export class WorkspaceComponent implements OnInit, OnDestroy {
  readonly tourSteps = [
    { selector: '[data-tour="nav-workspace"]', title: 'Your working area', description: 'The Workspace is where you edit JSON and run everyday actions. The sample is loaded for this tour so you can follow along.', tab: 'validate' as JsonTab },
    { selector: '[data-tour="samples"]', title: 'Load realistic examples', description: 'Choose employee, product, API, finance, or organization JSON here. Selecting one replaces the current editor input.', tab: 'validate' as JsonTab },
    { selector: '[data-tour="json-input"]', title: 'Paste or edit JSON', description: 'The editor accepts your JSON. Its status below shows whether the current input is valid and reports syntax errors.', tab: 'validate' as JsonTab },
    { selector: '[data-tour="editor-validate"]', title: 'Validate the input', description: 'Run a syntax check to parse the JSON and refresh the tree and generated types. Ctrl + Enter does the same.', tab: 'validate' as JsonTab },
    { selector: '[data-tour="editor-format"]', title: 'Format for readability', description: 'Format adds indentation and line breaks without changing the JSON data. Minify removes unnecessary whitespace.', tab: 'validate' as JsonTab },
    { selector: '[data-tour="tool-explorer"]', title: 'Explore nested values', description: 'Open Explorer to navigate objects and arrays as a tree. Expand All and Collapse All help focus the view.', tab: 'explorer' as JsonTab },
    { selector: '[data-tour="tool-typescript"]', title: 'Generate TypeScript', description: 'Create interfaces from the current valid JSON, then copy the generated code or download a .ts file.', tab: 'typescript' as JsonTab },
    { selector: '[data-tour="compare-left"]', title: 'Compare two versions', description: 'The comparison view has two JSON editors. This example is prefilled; the result below marks added, removed, and changed values.', tab: 'compare' as JsonTab, compare: true },
    { selector: '[data-tour="history-panel"]', title: 'Keep useful JSON nearby', description: 'Save input to browser-local history, then reopen or delete individual entries. Clear removes the whole list.', tab: 'compare' as JsonTab },
    { selector: '[data-tour="header-help"]', title: 'Keyboard shortcuts', description: 'Help lists shortcuts for validating, formatting, copying output, and closing the dialog.', tab: 'compare' as JsonTab },
    { selector: '[data-tour="header-theme"]', title: 'Choose your theme', description: 'Switch between light and dark themes. Your preference is saved in this browser.', tab: 'compare' as JsonTab }
  ];
  readonly tabs: Array<{ id: JsonTab; label: string }> = [
    { id: 'validate', label: 'Validate' },
    { id: 'format', label: 'Format' },
    { id: 'compare', label: 'Compare' },
    { id: 'typescript', label: 'TypeScript' },
    { id: 'explorer', label: 'Explorer' }
  ];

  readonly samples = signal<JsonSample[]>([]);
  readonly history = signal<JsonHistoryItem[]>([]);
  readonly selectedTab = signal<JsonTab>('validate');
  readonly demoActive = signal(false);
  readonly guidedTourActive = signal(false);
  readonly tourStep = signal(0);
  readonly tourPosition = signal({ top: 16, left: 16, arrow: 'up' as 'up' | 'down' });
  readonly jsonInput = signal('');
  readonly compareLeft = signal('');
  readonly compareRight = signal('');
  readonly validationState = signal<JsonValidationResult>({ valid: false, error: 'No JSON evaluated yet.' });
  readonly compareStateLeft = signal<JsonValidationResult>({ valid: false, error: 'Left JSON is empty.' });
  readonly compareStateRight = signal<JsonValidationResult>({ valid: false, error: 'Right JSON is empty.' });
  readonly diffResult = signal<JsonDiffResult>({ items: [], changed: false });
  readonly treeData = signal<unknown>(null);
  readonly treeExpanded = signal(true);
  readonly tsOutput = signal('');
  readonly formattedOutput = signal('');
  readonly helpOpen = signal(false);
  readonly validationPreview = computed(() => {
    const current = this.validationState();

    if (current.valid && current.formatted) {
      return current.formatted;
    }

    if (current.valid && current.data !== undefined) {
      return JSON.stringify(current.data, null, 2);
    }

    return current.error ?? 'No JSON evaluated yet.';
  });
  readonly toast = signal('');
  readonly validationStatus = computed(() => {
    const current = this.validationState();
    return current.valid ? 'VALID JSON' : current.error ?? 'No JSON';
  });
  readonly compareStatusLeft = computed(() => {
    const current = this.compareStateLeft();
    return current.valid ? 'VALID JSON' : current.error ?? 'Left JSON is empty';
  });
  readonly compareStatusRight = computed(() => {
    const current = this.compareStateRight();
    return current.valid ? 'VALID JSON' : current.error ?? 'Right JSON is empty';
  });
  private readonly themeService = inject(ThemeService);
  readonly theme = this.themeService.theme;

  private activeSampleId = 'employee';
  private highlightedTourTarget?: HTMLElement;
  private tourPositionTimer?: number;

  constructor(
    private readonly historyService: JsonHistoryService,
    private readonly clipboardService: ClipboardService
  ) {}

  ngOnInit(): void {
    this.samples.set([
      { id: 'employee', label: 'Employee Profile', description: 'Team member profile', path: 'assets/employee-profile.json' },
      { id: 'product', label: 'E-commerce Product', description: 'Product catalog item', path: 'assets/ecommerce-product.json' },
      { id: 'api', label: 'API Response', description: 'API payload', path: 'assets/api-response.json' },
      { id: 'finance', label: 'Financial Dashboard', description: 'Budget overview', path: 'assets/financial-dashboard.json' },
      { id: 'organization', label: 'Organization', description: 'Nested org structure', path: 'assets/organization.json' }
    ]);

    this.history.set(this.historyService.getHistory());
    window.addEventListener('keydown', this.handleKeyboardShortcut);
    this.loadSampleById('employee');
  }

  ngOnDestroy(): void {
    window.removeEventListener('keydown', this.handleKeyboardShortcut);
    this.endGuidedTour();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  async startGuidedTour(): Promise<void> {
    this.demoActive.set(false);
    await this.loadSampleById('employee');
    this.guidedTourActive.set(true);
    this.tourStep.set(0);
    this.showTourStep();
    window.addEventListener('resize', this.handleTourViewportChange);
    window.addEventListener('scroll', this.handleTourViewportChange, true);
  }

  moveTour(direction: number): void {
    const nextStep = this.tourStep() + direction;
    if (nextStep < 0) {
      return;
    }
    if (nextStep >= this.tourSteps.length) {
      this.endGuidedTour();
      return;
    }

    this.tourStep.set(nextStep);
    this.showTourStep();
  }

  endGuidedTour(): void {
    this.guidedTourActive.set(false);
    this.highlightedTourTarget?.classList.remove('guided-tour-target');
    this.highlightedTourTarget = undefined;
    window.removeEventListener('resize', this.handleTourViewportChange);
    window.removeEventListener('scroll', this.handleTourViewportChange, true);
    if (this.tourPositionTimer !== undefined) {
      window.clearTimeout(this.tourPositionTimer);
      this.tourPositionTimer = undefined;
    }
  }

  openTool(tab: JsonTab): void {
    this.demoActive.set(false);
    this.selectedTab.set(tab);
  }

  async loadDemoSample(sampleId: string): Promise<void> {
    this.demoActive.set(false);
    await this.loadSampleById(sampleId);
  }

  openDemoCompare(): void {
    this.demoActive.set(false);
    this.compareLeft.set(JSON.stringify({ name: 'Avery Chen', role: 'Engineer', location: 'Toronto' }, null, 2));
    this.compareRight.set(JSON.stringify({ name: 'Avery Chen', role: 'Senior Engineer', location: 'Toronto', active: true }, null, 2));
    this.selectedTab.set('compare');
    this.compareInputs();
  }

  saveDemoToHistory(): void {
    this.demoActive.set(false);
    this.saveCurrentJsonToHistory();
    this.selectedTab.set('validate');
    this.toast.set('Saved to local history.');
    setTimeout(() => this.toast.set(''), 1800);
  }

  private showTourStep(): void {
    const step = this.tourSteps[this.tourStep()];
    if (step.tab) {
      this.selectedTab.set(step.tab);
    }
    if (step.compare) {
      this.compareLeft.set(JSON.stringify({ name: 'Avery Chen', role: 'Engineer', location: 'Toronto' }, null, 2));
      this.compareRight.set(JSON.stringify({ name: 'Avery Chen', role: 'Senior Engineer', location: 'Toronto', active: true }, null, 2));
      this.compareInputs();
    }

    this.highlightedTourTarget?.classList.remove('guided-tour-target');
    this.highlightedTourTarget = undefined;
    window.clearTimeout(this.tourPositionTimer);
    this.tourPositionTimer = window.setTimeout(() => {
      const target = document.querySelector<HTMLElement>(step.selector);
      if (!target) {
        return;
      }
      target.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
      target.classList.add('guided-tour-target');
      this.highlightedTourTarget = target;
      this.tourPositionTimer = window.setTimeout(() => this.positionTourPopover(target), 180);
    }, 40);
  }

  private positionTourPopover(target: HTMLElement): void {
    if (!target.isConnected || !this.guidedTourActive()) {
      return;
    }
    const rect = target.getBoundingClientRect();
    const width = Math.min(360, window.innerWidth - 32);
    const estimatedHeight = 190;
    const fitsBelow = rect.bottom + estimatedHeight + 22 < window.innerHeight;
    const top = fitsBelow ? rect.bottom + 14 : Math.max(16, rect.top - estimatedHeight - 14);
    const left = Math.max(16, Math.min(window.innerWidth - width - 16, rect.left + rect.width / 2 - width / 2));
    this.tourPosition.set({ top, left, arrow: fitsBelow ? 'up' : 'down' });
  }

  private readonly handleTourViewportChange = (): void => {
    if (this.highlightedTourTarget) {
      this.positionTourPopover(this.highlightedTourTarget);
    }
  };

  async loadSampleById(sampleId: string): Promise<void> {
    const sample = this.samples().find((entry) => entry.id === sampleId);
    if (!sample) {
      return;
    }

    this.activeSampleId = sampleId;

    try {
      const response = await fetch(sample.path);
      const text = await response.text();
      this.jsonInput.set(text);
      this.validateCurrentJson();
      this.selectedTab.set('validate');
    } catch {
      this.validationState.set({ valid: false, error: 'Sample data could not be loaded.' });
    }
  }

  toggleHelp(): void {
    this.helpOpen.set(!this.helpOpen());
  }

  closeHelp(): void {
    this.helpOpen.set(false);
  }

  validateCurrentJson(): void {
    const result = validateJson(this.jsonInput());
    this.validationState.set(result);

    if (result.valid && result.data !== undefined) {
      const formatted = JSON.stringify(result.data, null, 2);
      this.formattedOutput.set(formatted);
      this.treeData.set(result.data);
      this.tsOutput.set(generateTypeScriptFromJson(result.data).code);
      return;
    }

    this.formattedOutput.set('');
    this.treeData.set(null);
    this.tsOutput.set('');
  }

  formatCurrentJson(): void {
    const result = formatJson(this.jsonInput());
    if (!result.valid || result.data === undefined) {
      this.validationState.set(result);
      return;
    }

    this.jsonInput.set(result.formatted ?? '');
    this.formattedOutput.set(result.formatted ?? '');
    this.validationState.set({ valid: true, data: result.data, formatted: result.formatted, minified: result.minified });
    this.treeData.set(result.data);
  }

  minifyCurrentJson(): void {
    const result = minifyJson(this.jsonInput());
    if (!result.valid || result.data === undefined) {
      this.validationState.set(result);
      return;
    }

    this.jsonInput.set(result.minified ?? '');
    this.formattedOutput.set(JSON.stringify(result.data, null, 2));
    this.validationState.set({ valid: true, data: result.data, formatted: JSON.stringify(result.data, null, 2), minified: result.minified });
    this.treeData.set(result.data);
  }

  clearJsonInput(): void {
    this.jsonInput.set('');
    this.validationState.set({ valid: false, error: 'Input cleared.' });
    this.formattedOutput.set('');
    this.treeData.set(null);
    this.tsOutput.set('');
  }

  compareInputs(): void {
    const left = validateJson(this.compareLeft());
    const right = validateJson(this.compareRight());

    this.compareStateLeft.set(left);
    this.compareStateRight.set(right);

    if (!left.valid || !right.valid) {
      this.diffResult.set({ items: [], changed: false });
      return;
    }

    const nextDiff = compareJson(left.data, right.data);
    this.diffResult.set(nextDiff);
  }

  copyCurrentValue(value: string): void {
    if (!value) {
      return;
    }

    void this.clipboardService.copy(value).then((successful) => {
      if (successful) {
        this.toast.set('Copied!');
        setTimeout(() => this.toast.set(''), 1800);
      } else {
        this.toast.set('Copy failed in this browser.');
        setTimeout(() => this.toast.set(''), 1800);
      }
    });
  }

  downloadJson(value: string, fileName: string): void {
    if (!value) {
      return;
    }

    const blob = new Blob([value], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  openHistoryItem(item: JsonHistoryItem): void {
    this.jsonInput.set(item.content);
    this.validateCurrentJson();
    this.selectedTab.set('validate');
  }

  removeHistoryItem(id: string): void {
    this.history.set(this.historyService.removeEntry(id));
  }

  clearHistory(): void {
    this.history.set(this.historyService.clear());
  }

  saveCurrentJsonToHistory(): void {
    const content = this.jsonInput().trim();
    if (!content) {
      return;
    }

    const title = this.samples().find((sample) => sample.id === this.activeSampleId)?.label ?? 'JSON Document';
    this.history.set(this.historyService.addEntry(title, content));
  }

  expandTree(): void {
    this.treeExpanded.set(true);
  }

  collapseTree(): void {
    this.treeExpanded.set(false);
  }

  currentOutput(): string {
    if (this.selectedTab() === 'validate') {
      return this.validationPreview();
    }

    if (this.selectedTab() === 'format') {
      return this.formattedOutput();
    }

    if (this.selectedTab() === 'typescript') {
      return this.tsOutput();
    }

    return JSON.stringify(this.treeData() ?? {}, null, 2);
  }

  private readonly handleKeyboardShortcut = (event: KeyboardEvent): void => {
    const key = event.key.toLowerCase();

    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault();
      this.validateCurrentJson();
      this.selectedTab.set('validate');
      return;
    }

    if ((event.ctrlKey || event.metaKey) && event.shiftKey && key === 'f') {
      event.preventDefault();
      this.formatCurrentJson();
      return;
    }

    if ((event.ctrlKey || event.metaKey) && event.shiftKey && key === 'c') {
      event.preventDefault();
      this.copyCurrentValue(this.currentOutput());
      return;
    }

    if (event.key === 'Escape') {
      this.closeHelp();
    }
  };

  private readTheme(): ThemeMode {
    return this.themeService.theme();
  }
}
