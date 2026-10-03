import { Injectable } from '@angular/core';

import { JsonHistoryItem } from '../models/json.model';

@Injectable({ providedIn: 'root' })
export class JsonHistoryService {
  private readonly storageKey = 'jsonpilot-history';
  private readonly maxItems = 8;

  getHistory(): JsonHistoryItem[] {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) {
        return [];
      }

      const parsed = JSON.parse(raw) as JsonHistoryItem[];
      return Array.isArray(parsed) ? parsed.slice(0, this.maxItems) : [];
    } catch {
      return [];
    }
  }

  addEntry(title: string, content: string): JsonHistoryItem[] {
    const safeTitle = title.trim() || 'Recent JSON';
    const nextEntries = this.getHistory();
    const entry: JsonHistoryItem = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      title: safeTitle,
      content,
      createdAt: Date.now()
    };

    const filtered = nextEntries.filter((item) => item.content !== content || item.title !== safeTitle);
    const updated = [entry, ...filtered].slice(0, this.maxItems);

    this.persist(updated);
    return updated;
  }

  removeEntry(id: string): JsonHistoryItem[] {
    const updated = this.getHistory().filter((item) => item.id !== id);
    this.persist(updated);
    return updated;
  }

  clear(): JsonHistoryItem[] {
    this.persist([]);
    return [];
  }

  private persist(entries: JsonHistoryItem[]): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(entries));
    } catch {
      // Fail silently when storage is not available.
    }
  }
}
