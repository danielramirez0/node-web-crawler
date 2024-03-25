const { test, expect } = require('@jest/globals');
const { normalizeURL, getURLsFromHTML } = require('./crawl.js');

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

test('getURLsFromHTML absolute', () => {
    const inputURL = 'https://blog.boot.dev'
    const inputBody = '<html><body><a href="https://blog.boot.dev"><span>Boot.dev></span></a></body></html>'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = [ 'https://blog.boot.dev/' ]
    expect(actual).toEqual(expected)
  })
  
  test('getURLsFromHTML relative', () => {
    const inputURL = 'https://blog.boot.dev'
    const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a></body></html>'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = [ 'https://blog.boot.dev/path/one' ]
    expect(actual).toEqual(expected)
  })
  
  test('getURLsFromHTML both', () => {
    const inputURL = 'https://blog.boot.dev'
    const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = [ 'https://blog.boot.dev/path/one', 'https://other.com/path/one' ]
    expect(actual).toEqual(expected)
  })
  
  test('getURLsFromHTML handle error', () => {
    const inputURL = 'https://blog.boot.dev'
    const inputBody = '<html><body><a href="path/one"><span>Boot.dev></span></a></body></html>'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = [ ]
    expect(actual).toEqual(expected)
  })
