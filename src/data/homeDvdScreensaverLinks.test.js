import { describe, expect, it } from 'vitest'
import { HOME_DVD_SCREENSAVER_LINKS } from './homeDvdScreensaverLinks.js'

describe('homeDvdScreensaverLinks', () => {
  it('lists menu categories with web stuff live', () => {
    expect(HOME_DVD_SCREENSAVER_LINKS).toHaveLength(3)

    const webStuff = HOME_DVD_SCREENSAVER_LINKS.find((l) => l.label === 'Web Stuff')
    expect(webStuff.to).toBe('/overview/web-stuff')
    expect(webStuff.comingSoon).toBeUndefined()

    const comingSoon = HOME_DVD_SCREENSAVER_LINKS.filter((l) => l.comingSoon)
    expect(comingSoon).toHaveLength(2)
  })
})
