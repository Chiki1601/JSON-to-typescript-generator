import { compareJson, formatJson, generateTypeScriptFromJson, minifyJson, validateJson } from './json-utils';

describe('JSON utility functions', () => {
  it('validates a well-formed JSON object', () => {
    const result = validateJson('{"name":"Pooja","active":true}');

    expect(result.valid).toBeTrue();
    expect(result.data).toEqual({ name: 'Pooja', active: true });
    expect(result.error).toBeUndefined();
  });

  it('rejects invalid JSON input', () => {
    const result = validateJson('{"name":');

    expect(result.valid).toBeFalse();
    expect(result.error).toContain('Unexpected');
  });

  it('handles empty input', () => {
    const result = validateJson('   ');

    expect(result.valid).toBeFalse();
    expect(result.error).toContain('empty');
  });

  it('formats nested JSON with indentation', () => {
    const result = formatJson('{"name":"Pooja","skills":["Angular","TypeScript"]}');

    expect(result.valid).toBeTrue();
    expect(result.formatted).toContain('\n  "name": "Pooja"');
  });

  it('minifies JSON string', () => {
    const result = minifyJson('{"name":"Pooja","skills":["Angular","TypeScript"]}');

    expect(result.valid).toBeTrue();
    expect(result.minified).toBe('{"name":"Pooja","skills":["Angular","TypeScript"]}');
  });

  it('detects added and changed properties in JSON diff', () => {
    const result = compareJson(
      { name: 'Pooja', age: 25 },
      { name: 'Pooja Patel', age: 26, city: 'Ahmedabad' }
    );

    expect(result.changed).toBeTrue();
    expect(result.items.some((item) => item.type === 'changed' && item.path === 'name')).toBeTrue();
    expect(result.items.some((item) => item.type === 'added' && item.path === 'city')).toBeTrue();
  });

  it('handles nested object diffs', () => {
    const result = compareJson(
      { profile: { name: 'Pooja', age: 25 } },
      { profile: { name: 'Pooja', age: 26 } }
    );

    expect(result.items.some((item) => item.type === 'changed' && item.path === 'profile.age')).toBeTrue();
  });

  it('generates TypeScript interfaces for primitive fields', () => {
    const result = generateTypeScriptFromJson({ id: 101, name: 'Pooja', active: true });

    expect(result.valid).toBeTrue();
    expect(result.code).toContain('interface Root');
    expect(result.code).toContain('id: number;');
    expect(result.code).toContain('name: string;');
    expect(result.code).toContain('active: boolean;');
  });

  it('generates TypeScript interfaces for nested objects and arrays of objects', () => {
    const input = {
      items: [
        { id: 1, name: 'A' },
        { id: 2, name: 'B' }
      ]
    };

    const result = generateTypeScriptFromJson(input);

    expect(result.valid).toBeTrue();
    expect(result.code).toContain('interface Root');
    expect(result.code).toContain('interface Item');
    expect(result.code).toContain('items: Item[];');
  });

  it('handles nullable values safely in TypeScript generation', () => {
    const result = generateTypeScriptFromJson({ name: 'Pooja', profile: null });

    expect(result.valid).toBeTrue();
    expect(result.code).toContain('profile?: null | object;');
  });
});
