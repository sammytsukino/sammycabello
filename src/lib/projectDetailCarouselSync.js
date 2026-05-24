export function clampParagraphIndex(index, paragraphCount) {
  if (paragraphCount <= 0) return 0
  return Math.max(0, Math.min(index, paragraphCount - 1))
}

export function paragraphIndexFromGalleryProgress(scroll, limit, paragraphCount) {
  if (paragraphCount <= 1 || limit <= 0) return 0
  const progress = scroll / limit
  return Math.round(progress * (paragraphCount - 1))
}

export function galleryScrollFromParagraphIndex(paragraphIndex, paragraphCount, limit) {
  if (paragraphCount <= 1 || limit <= 0) return 0
  const progress = paragraphIndex / (paragraphCount - 1)
  return progress * limit
}
