export type JsonTab = 'validate' | 'format' | 'compare' | 'typescript' | 'explorer';
export type ThemeMode = 'light' | 'dark';
export type JsonDiffType = 'added' | 'removed' | 'changed' | 'unchanged';

export interface JsonValidationResult {
  valid: boolean;
  data?: unknown;
  error?: string;
  position?: number;
  formatted?: string;
  minified?: string;
}

export interface JsonDiffItem {
  path: string;
  type: JsonDiffType;
  leftValue?: unknown;
  rightValue?: unknown;
}

export interface JsonDiffResult {
  items: JsonDiffItem[];
  changed: boolean;
}

export interface TypeScriptGenerationResult {
  valid: boolean;
  code: string;
  interfaces: string[];
  error?: string;
}

export interface JsonSample {
  id: string;
  label: string;
  description: string;
  path: string;
}

export interface JsonHistoryItem {
  id: string;
  title: string;
  content: string;
  createdAt: number;
}
