# JSONPilot

**A browser-based JSON workbench built with Angular.** Validate, format, minify, compare, explore, and generate TypeScript from JSON in one focused workspace.

JSONPilot is a portfolio project demonstrating the way I approach frontend engineering as an Angular developer with **5 years of experience**: typed feature boundaries, reusable standalone components, clear state ownership, defensive browser storage, and behavior-focused testing.

## Try the Guided Demo

Open the **Demo** tab in the app and choose **Start pointer guide**. The interactive 11-step tour highlights real controls, explains what each does, and moves through the Workspace, Explorer, comparison, samples, history, shortcuts, and theme settings. The comparison step loads two example documents and shows their actual diff.

## Features

| Feature | What it does |
| --- | --- |
| Validate | Parse JSON and show a useful valid or invalid state. |
| Format and minify | Pretty-print JSON for reading or compact it by removing whitespace. |
| Compare | Recursively compare two JSON values and show added, removed, changed, and unchanged paths. |
| Explore | Browse nested objects and arrays in a JSON tree; expand or collapse the tree. |
| Generate TypeScript | Infer TypeScript interfaces from JSON, then copy or download the generated code. |
| Sample data | Load employee, product, API, finance, and organization examples. |
| Recent history | Save, reopen, delete, or clear JSON documents stored in this browser. History keeps up to eight entries. |
| Copy and download | Copy current output or download JSON and generated TypeScript. |
| Theme and shortcuts | Switch between light and dark themes, with keyboard shortcuts for common editor actions. |
| Pointer guide | Follow an interactive, step-by-step walkthrough with highlighted controls and live examples. |

All JSON processing happens in the browser. The application does not send user documents to a backend; history and theme preferences use local storage on the current device.

## Tech Stack

- **Angular 22** with standalone components and Angular Router
- **TypeScript 6** for typed models, component contracts, and JSON utilities
- **Angular Signals** and `computed` state for the interactive workspace
- **SCSS** for responsive layouts, theme tokens, and component styling
- **Angular Material and CDK** dependencies, with the prebuilt Material theme configured
- **RxJS 7** and Angular platform APIs
- **Browser APIs** including `localStorage`, Clipboard, `Blob`, and object URLs
- **Jasmine and Karma** for unit tests

## How It Is Organized

The workspace component coordinates user actions and reactive state. JSON parsing and transformation live in pure utility functions, while editor, tree, diff, history, sample, and TypeScript views are reusable standalone components. Theme and history persistence are isolated behind injectable services.

```text
src/
  app/
    features/workspace/       Main workbench and guided tour
    shared/components/        Editor, tree, diff, history, samples, and output views
    services/                 Clipboard, history, and theme services
    models/                   Typed JSON and UI models
    utils/                    JSON validation and transformation functions
  assets/                     Bundled sample JSON documents
```

## Engineering Highlights

- **State and ownership:** Signals keep workspace state explicit, while computed values derive statuses and previews instead of duplicating state.
- **Separation of concerns:** Validation, formatting, minification, structural comparison, and TypeScript generation are implemented independently of the UI.
- **Reusable composition:** Standalone components have clear inputs and outputs, keeping editor actions and feature views easy to extend.
- **Defensive persistence:** History and theme services handle unavailable or malformed local storage without crashing the application.
- **User workflow:** The workspace supports keyboard shortcuts, clear validation feedback, sample data, copy/download actions, and a guided pointer tour.
- **Testing:** Unit tests exercise valid and invalid input, formatting, minification, nested differences, and TypeScript generation.

## Run Locally

Requirements: Node.js and npm compatible with the installed Angular CLI.

```bash
npm install
npm start
```

Open the local URL printed by Angular. If port `4200` is already occupied, Angular will prompt to use another available port.

## Build and Test

```bash
npm run build
npm test
```

The production build is written to `dist/jsonpilot`. The unit tests run with Karma; use `npm test -- --watch=false --browsers=ChromeHeadless` for a one-shot headless run when Chrome is installed.

## Interview Walkthrough

1. Start in **Demo** and run the pointer guide to see the actual controls and workflow.
2. Validate and format a sample, then inspect its nested data in Explorer.
3. Open TypeScript to review the interfaces inferred from the same JSON.
4. Compare the prefilled versions and explain how the recursive diff reports changes by path.
5. Save a document to Recent JSON and show how local persistence behaves after a reload.

This project demonstrates Angular feature composition, typed frontend state, reusable UI contracts, browser-side data processing, recursive TypeScript algorithms, and pragmatic test coverage.