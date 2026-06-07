import { describe, expect, it } from 'vitest'
import {
  cldImage,
  cldVideo,
  cldVideoPoster,
  optimizeCloudinaryUrl,
} from './cloudinaryUrl.js'

const PNG =
  'https://res.cloudinary.com/dsy30p7gf/image/upload/v1778934376/pink-0_cfmcln.png'
const SVG =
  'https://res.cloudinary.com/dsy30p7gf/image/upload/v1778581291/Recurso_11estrellarellena_aoc12t.svg'
const FONT =
  'https://res.cloudinary.com/dsy30p7gf/raw/upload/v1776855947/ALLSORTS-Regular_colkut.ttf'
const VIDEO =
  'https://res.cloudinary.com/dsy30p7gf/video/upload/v1779347245/lumenbn2_1_spiba3.mp4'
const POSTER =
  'https://res.cloudinary.com/dsy30p7gf/video/upload/so_0,q_auto,f_jpg/v1779272918/lumenbn3_glzije.jpg'

describe('cloudinaryUrl', () => {
  it('adds trail preset to raster images', () => {
    const out = cldImage(PNG, 'trail')
    expect(out).toContain('c_limit,w_512')
    expect(out).toContain('f_auto/q_auto')
    expect(out).toContain('v1778934376/pink-0_cfmcln.png')
  })

  it('leaves SVG URLs unchanged', () => {
    expect(cldImage(SVG, 'icon')).toBe(SVG)
  })

  it('leaves raw font URLs unchanged', () => {
    expect(optimizeCloudinaryUrl(FONT, 'icon')).toBe(FONT)
  })

  it('adds video delivery transforms', () => {
    const out = cldVideo(VIDEO)
    expect(out).toContain('q_auto/vc_auto/f_auto:video')
    expect(out).toContain('v1779347245/lumenbn2_1_spiba3.mp4')
  })

  it('extends video poster without replacing f_jpg', () => {
    const out = cldVideoPoster(POSTER)
    expect(out).toContain('so_0,q_auto,f_jpg')
    expect(out).toContain('c_limit,w_800')
    expect(out).not.toContain('f_auto')
  })

  it('returns non-cloudinary URLs unchanged', () => {
    expect(cldImage('/local.png', 'trail')).toBe('/local.png')
  })
})
