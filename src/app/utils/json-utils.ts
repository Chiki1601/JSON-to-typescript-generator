import {
  JsonDiffItem,
  JsonDiffResult,
  JsonValidationResult,
  TypeScriptGenerationResult
} from '../models/json.model';

export function validateJson(input: string): JsonValidationResult {
  const trimmed = input.trim();

  if (!trimmed) {
    return {
      valid: false,
      error: 'Input is empty. Paste a JSON document to continue.'
    };
  }

  try {
    const data = JSON.parse(trimmed);
    return {
      valid: true,
      data
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown JSON parsing error';
    const position = extractPosition(message);

    return {
      valid: false,
      error: `Invalid JSON: ${message}`,
      position
    };
  }
}

export function formatJson(input: string, indent = 2): JsonValidationResult {
  const result = validateJson(input);

  if (!result.valid || result.data === undefined) {
    return result;
  }

  return {
    ...result,
    formatted: JSON.stringify(result.data, null, indent)
  };
}

export function minifyJson(input: string): JsonValidationResult {
  const result = validateJson(input);

  if (!result.valid || result.data === undefined) {
    return result;
  }

  return {
    ...result,
    minified: JSON.stringify(result.data)
  };
}

export function compareJson(left: unknown, right: unknown): JsonDiffResult {
  const items = compareValues(left, right, '');

  return {
    items,
    changed: items.some((item) => item.type !== 'unchanged')
  };
}

export function generateTypeScriptFromJson(input: unknown): TypeScriptGenerationResult {
  const parsed = typeof input === 'string' ? JSON.parse(input) : input;
  const interfaces = new Map<string, string>();

  if (parsed === undefined || parsed === null) {
    return {
      valid: true,
      code: 'export type Root = null | object;',
      interfaces: ['Root']
    };
  }

  const buildName = (raw: string): string => {
    const value = raw.replace(/[^a-zA-Z0-9_]+/g, ' ').trim();
    const cleaned = value
      .split(/\s+/)
      .filter(Boolean)
      .map((segment, index) => {
        const normalized = segment.charAt(0).toUpperCase() + segment.slice(1);
        return index === 0 ? normalized : normalized;
      })
      .join('');

    return cleaned || 'Item';
  };

  const ensureInterfaceName = (baseName: string): string => {
    let attempt = baseName || 'Item';
    let suffix = 1;

    while (interfaces.has(attempt)) {
      attempt = `${baseName}${suffix}`;
      suffix += 1;
    }

    return attempt;
  };

  const parseValueType = (value: unknown, fieldName: string, seen = new Set<string>()): string => {
    if (value === null) return 'null | object';

    if (Array.isArray(value)) {
      if (value.length === 0) {
        return 'unknown[]';
      }

      const itemEntry = value[0];

      if (isPlainObject(itemEntry)) {
        const itemName = ensureInterfaceName(buildName(fieldName.replace(/s$/, '')) || 'Item');
        if (!seen.has(itemName)) {
          seen.add(itemName);
          const properties = Object.entries(itemEntry)
            .map(([key, nestedValue]) => {
              const optional = nestedValue === null ? '?' : '';
              return `  ${key}${optional}: ${parseValueType(nestedValue, key, seen)};`;
            })
            .join('\n');

          interfaces.set(itemName, `export interface ${itemName} {\n${properties}\n}`);
          seen.delete(itemName);
        }

        return `${itemName}[]`;
      }

      if (Array.isArray(itemEntry)) {
        return `${parseValueType(itemEntry, `${fieldName}Item`, seen)}[]`;
      }

      const itemTypes = Array.from(new Set(value.map((entry) => detectPrimitiveType(entry))));
      return itemTypes.length === 1 ? `${itemTypes[0]}[]` : `Array<${itemTypes.join(' | ')}>`;
    }

    if (isPlainObject(value)) {
      const interfaceName = ensureInterfaceName(buildName(fieldName) || 'Nested');
      if (!seen.has(interfaceName)) {
        seen.add(interfaceName);
        const properties = Object.entries(value)
          .map(([key, nestedValue]) => {
            const optional = nestedValue === null ? '?' : '';
            return `  ${key}${optional}: ${parseValueType(nestedValue, key, seen)};`;
          })
          .join('\n');

        interfaces.set(interfaceName, `export interface ${interfaceName} {\n${properties}\n}`);
        seen.delete(interfaceName);
      }

      return interfaceName;
    }

    return detectPrimitiveType(value);
  };

  const rootName = 'Root';
  const rootProperties = isPlainObject(parsed)
    ? Object.entries(parsed)
        .map(([key, value]) => {
          const optional = value === null ? '?' : '';
          return `  ${key}${optional}: ${parseValueType(value, key)};`;
        })
        .join('\n')
    : `  value: ${detectPrimitiveType(parsed)};`;

  const rootInterface = `export interface ${rootName} {\n${rootProperties}\n}`;
  const code = [rootInterface, ...Array.from(interfaces.values())].join('\n\n');

  return {
    valid: true,
    code,
    interfaces: [rootName, ...Array.from(interfaces.keys())]
  };
}

function compareValues(left: unknown, right: unknown, path: string): JsonDiffItem[] {
  if (left === right) {
    return [{ path, type: 'unchanged', leftValue: left, rightValue: right }];
  }

  if (Array.isArray(left) && Array.isArray(right)) {
    const maxLength = Math.max(left.length, right.length);
    const result: JsonDiffItem[] = [];

    for (let index = 0; index < maxLength; index += 1) {
      const nextPath = buildPath(path, index, true);

      if (index >= left.length) {
        result.push({ path: nextPath, type: 'added', rightValue: right[index] });
        continue;
      }

      if (index >= right.length) {
        result.push({ path: nextPath, type: 'removed', leftValue: left[index] });
        continue;
      }

      const nested = compareValues(left[index], right[index], nextPath);
      result.push(...nested);
    }

    return result;
  }

  if (isPlainObject(left) && isPlainObject(right)) {
    const keys = Array.from(new Set([...Object.keys(left), ...Object.keys(right)])).sort();
    const result: JsonDiffItem[] = [];

    for (const key of keys) {
      const nextPath = buildPath(path, key, false);

      if (!Object.prototype.hasOwnProperty.call(left, key)) {
        result.push({ path: nextPath, type: 'added', rightValue: right[key] });
        continue;
      }

      if (!Object.prototype.hasOwnProperty.call(right, key)) {
        result.push({ path: nextPath, type: 'removed', leftValue: left[key] });
        continue;
      }

      const nested = compareValues(left[key], right[key], nextPath);
      result.push(...nested);
    }

    return result;
  }

  return [{ path, type: 'changed', leftValue: left, rightValue: right }];
}

function buildPath(path: string, segment: string | number, isArray: boolean): string {
  if (!path) {
    return isArray ? `[${segment}]` : String(segment);
  }

  if (isArray) {
    return `${path}[${segment}]`;
  }

  return `${path}.${segment}`;
}

function detectPrimitiveType(value: unknown): string {
  if (typeof value === 'string') return 'string';
  if (typeof value === 'number') return Number.isInteger(value) ? 'number' : 'number';
  if (typeof value === 'boolean') return 'boolean';
  if (Array.isArray(value)) return 'unknown[]';
  if (value === null) return 'null | object';
  return 'unknown';
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function extractPosition(message: string): number | undefined {
  const match = /position\s+(\d+)/i.exec(message);

  if (!match) {
    return undefined;
  }

  return Number(match[1]);
}
