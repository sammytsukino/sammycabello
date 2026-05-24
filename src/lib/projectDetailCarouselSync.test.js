import { describe, expect, it } from 'vitest'
import {
  clampParagraphIndex,
  galleryScrollFromParagraphIndex,
  paragraphIndexFromGalleryProgress,
} from './projectDetailCarouselSync.js'

describe('projectDetailCarouselSync', () => {
  it('clamps paragraph indices', () => {
    expect(clampParagraphIndex(-1, 4)).toBe(0)
    expect(clampParagraphIndex(2, 4)).toBe(2)
    expect(clampParagraphIndex(9, 4)).toBe(3)
  })

  it('maps gallery progress to paragraph index', () => {
    expect(paragraphIndexFromGalleryProgress(0, 900, 4)).toBe(0)
    expect(paragraphIndexFromGalleryProgress(450, 900, 4)).toBe(2)
    expect(paragraphIndexFromGalleryProgress(900, 900, 4)).toBe(3)
  })

  it('maps paragraph index to gallery scroll', () => {
    expect(galleryScrollFromParagraphIndex(0, 4, 900)).toBe(0)
    expect(galleryScrollFromParagraphIndex(2, 4, 900)).toBe(600)
    expect(galleryScrollFromParagraphIndex(3, 4, 900)).toBe(900)
  })
})
