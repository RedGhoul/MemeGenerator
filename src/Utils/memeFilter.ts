import { MemeTemplate } from '@/Type'

/**
 * Filter templates by a free-text query, matching against both the template
 * name and its keywords. An empty/whitespace query returns the list unchanged.
 */
export const filterMemesByQuery = (
  memes: MemeTemplate[],
  query: string
): MemeTemplate[] => {
  const q = query.trim().toLowerCase()
  if (!q) {
    return memes
  }
  return memes.filter((meme) => {
    if (meme.name?.toLowerCase().includes(q)) {
      return true
    }
    return (meme.keywords || []).some((keyword) =>
      keyword.toLowerCase().includes(q)
    )
  })
}

/** Filter templates to those tagged with the given keyword (case-insensitive). */
export const filterMemesByKeyword = (
  memes: MemeTemplate[],
  keyword: string
): MemeTemplate[] => {
  const k = keyword.trim().toLowerCase()
  if (!k) {
    return memes
  }
  return memes.filter((meme) =>
    (meme.keywords || []).some((value) => value.toLowerCase() === k)
  )
}

/**
 * Derive the most common keywords across the template set, used to build the
 * quick category-filter chips. Returns lowercased keywords sorted by frequency.
 */
export const getPopularKeywords = (
  memes: MemeTemplate[],
  limit = 8
): string[] => {
  const counts = new Map<string, number>()
  for (const meme of memes) {
    for (const keyword of meme.keywords || []) {
      const key = keyword.trim().toLowerCase()
      if (!key) {
        continue
      }
      counts.set(key, (counts.get(key) || 0) + 1)
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([keyword]) => keyword)
}
