const CLOUDINARY_UPLOAD_RE =
  /^(https:\/\/res\.cloudinary\.com\/[^/]+\/(image|video|raw)\/upload\/)(.+)$/

/** @type {Record<string, string>} */
export const CLOUDINARY_PRESETS = Object.freeze({
  /** Nav icons, bells, stars (~64px CSS, 2x) */
  icon: 'c_limit,w_128/f_auto/q_auto',
  /** Favicon (~32px CSS, 2x) */
  favicon: 'c_limit,w_64/f_auto/q_auto',
  /** Hero image trail (~250px CSS, 2x) */
  trail: 'c_limit,w_512/f_auto/q_auto',
  /** DVD screensaver food (~580px CSS, 2x) */
  screensaver: 'c_limit,w_1160/f_auto/q_auto',
  /** Gallery card covers (~640px CSS, 2x) */
  galleryCover: 'c_limit,w_1280/f_auto/q_auto',
  /** Project screenshots & lightbox (~960px CSS, 2x) */
  galleryMedia: 'c_limit,w_1920/f_auto/q_auto',
  /** Video delivery */
  video: 'q_auto/vc_auto/f_auto:video',
  /** Video poster frame (keeps existing f_jpg when present) */
  videoPoster: 'c_limit,w_800/q_auto',
})

function isSvgUrl(url) {
  return /\.svg($|[?#])/i.test(url)
}

function splitCloudinarySuffix(suffix) {
  const match = suffix.match(/^(.*?)(v\d+\/.+)$/)
  if (match) {
    return {
      existing: match[1].replace(/\/$/, ''),
      versionPath: match[2],
    }
  }
  if (/^v\d+\//.test(suffix)) {
    return { existing: '', versionPath: suffix }
  }
  return null
}

function mergeTransformComponents(existing, additions) {
  const parts = [
    ...(existing ? existing.split('/').filter(Boolean) : []),
    ...additions.split('/').filter(Boolean),
  ]
  return parts.join('/')
}

function isCloudinaryVideoUrl(url) {
  return /\/video\/upload\//.test(url)
}

/**
 * Applies Cloudinary delivery best practices:
 * - Raster images: c_limit + width cap, f_auto, q_auto
 * - Videos: q_auto, vc_auto, f_auto:video
 * - Skips SVG and raw assets (fonts)
 */
export function optimizeCloudinaryUrl(url, preset = 'galleryMedia') {
  if (!url || typeof url !== 'string') return url

  const match = url.match(CLOUDINARY_UPLOAD_RE)
  if (!match) return url

  const [, prefix, assetType, suffix] = match
  if (assetType === 'raw') return url
  if (assetType === 'image' && isSvgUrl(url)) return url

  const split = splitCloudinarySuffix(suffix)
  if (!split) return url

  if (assetType === 'video' || isCloudinaryVideoUrl(url)) {
    if (preset === 'videoPoster' || /\.jpe?g($|[?#])/i.test(split.versionPath)) {
      const merged = mergeTransformComponents(split.existing, CLOUDINARY_PRESETS.videoPoster)
      return `${prefix}${merged}/${split.versionPath}`
    }
    const merged = mergeTransformComponents(split.existing, CLOUDINARY_PRESETS.video)
    return `${prefix}${merged}/${split.versionPath}`
  }

  const presetTransforms = CLOUDINARY_PRESETS[preset]
  if (!presetTransforms) return url

  const merged = mergeTransformComponents(split.existing, presetTransforms)
  return `${prefix}${merged}/${split.versionPath}`
}

export function cldImage(url, preset = 'galleryMedia') {
  return optimizeCloudinaryUrl(url, preset)
}

export function cldVideo(url) {
  return optimizeCloudinaryUrl(url, 'video')
}

export function cldVideoPoster(url) {
  return optimizeCloudinaryUrl(url, 'videoPoster')
}
