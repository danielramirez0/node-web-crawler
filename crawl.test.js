const { test, expect } = require('@jest/globals');
const { normalizeURL } = require('./crawl.js');

test('URL normalization / and path', () => {
    expect(normalizeURL('http://example.com')).toBe('example.com');
    expect(normalizeURL('http://example.com/')).toBe('example.com');
    expect(normalizeURL('http://example.com/path')).toBe('example.com/path');
    expect(normalizeURL('http://example.com/path/')).toBe('example.com/path');
    expect(normalizeURL('https://example.com')).toBe('example.com');
})

test('URL normalization / and path with query', () => {
    expect(normalizeURL('http://example.com?query')).toBe('example.com');
    expect(normalizeURL('http://example.com/?query')).toBe('example.com');
    expect(normalizeURL('http://example.com/path?query')).toBe('example.com/path');
    expect(normalizeURL('http://example.com/path/?query')).toBe('example.com/path');
    expect(normalizeURL('https://example.com?query')).toBe('example.com');
})

test('URL normalization / and path with hash', () => {
    expect(normalizeURL('http://example.com#hash')).toBe('example.com');
    expect(normalizeURL('http://example.com/#hash')).toBe('example.com');
    expect(normalizeURL('http://example.com/path#hash')).toBe('example.com/path');
    expect(normalizeURL('http://example.com/path/#hash')).toBe('example.com/path');
    expect(normalizeURL('https://example.com#hash')).toBe('example.com');
})

test('URL normalization / and path with query and hash', () => {
    expect(normalizeURL('http://example.com?query#hash')).toBe('example.com');
    expect(normalizeURL('http://example.com/?query#hash')).toBe('example.com');
    expect(normalizeURL('http://example.com/path?query#hash')).toBe('example.com/path');
    expect(normalizeURL('http://example.com/path/?query#hash')).toBe('example.com/path');
    expect(normalizeURL('https://example.com?query#hash')).toBe('example.com');
})