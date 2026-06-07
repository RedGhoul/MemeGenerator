/**
 * Unit tests for the pure meme filtering/derivation helpers.
 *
 * @format
 */
import {
  filterMemesByKeyword,
  filterMemesByQuery,
  getPopularKeywords,
} from '@/Utils/memeFilter'
import { MemeTemplate } from '@/Type'

const makeTemplate = (
  id: string,
  name: string,
  keywords: string[]
): MemeTemplate => ({
  id,
  name,
  lines: 2,
  overlays: 0,
  styles: [],
  blank: `https://example.com/${id}.png`,
  example: { text: [], url: '' },
  source: null,
  keywords,
  _self: '',
})

const templates: MemeTemplate[] = [
  makeTemplate('doge', 'Doge', ['dog', 'animal']),
  makeTemplate('grumpy', 'Grumpy Cat', ['cat', 'animal']),
  makeTemplate('drake', 'Drake Hotline Bling', ['music', 'reaction']),
]

describe('filterMemesByQuery', () => {
  it('returns the full list for an empty query', () => {
    expect(filterMemesByQuery(templates, '')).toHaveLength(3)
    expect(filterMemesByQuery(templates, '   ')).toHaveLength(3)
  })

  it('matches against the template name (case-insensitive)', () => {
    const result = filterMemesByQuery(templates, 'drake')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('drake')
  })

  it('matches against keywords', () => {
    const result = filterMemesByQuery(templates, 'animal')
    expect(result.map((t) => t.id)).toEqual(['doge', 'grumpy'])
  })

  it('returns nothing when there is no match', () => {
    expect(filterMemesByQuery(templates, 'spongebob')).toHaveLength(0)
  })
})

describe('filterMemesByKeyword', () => {
  it('keeps only templates tagged with the exact keyword', () => {
    const result = filterMemesByKeyword(templates, 'cat')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('grumpy')
  })

  it('is case-insensitive', () => {
    expect(filterMemesByKeyword(templates, 'ANIMAL')).toHaveLength(2)
  })
})

describe('getPopularKeywords', () => {
  it('returns keywords ordered by frequency', () => {
    const result = getPopularKeywords(templates)
    // "animal" appears twice and should rank first.
    expect(result[0]).toBe('animal')
    expect(result).toContain('cat')
    expect(result).toContain('music')
  })

  it('respects the limit', () => {
    expect(getPopularKeywords(templates, 2)).toHaveLength(2)
  })
})
