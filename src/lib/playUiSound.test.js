import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  playChompSound,
  playContactBellSound,
  playTwinkleSound,
  resetUiSoundsForTests,
} from './playUiSound.js'

describe('playUiSound', () => {
  afterEach(() => {
    resetUiSoundsForTests()
    vi.restoreAllMocks()
  })

  it('reuses one Audio element per src and replays from the start', () => {
    const play = vi.fn().mockResolvedValue(undefined)
    const AudioMock = vi.fn(function AudioMock(src) {
      this.src = src
      this.preload = ''
      this.currentTime = 0
      this.play = play
    })

    vi.stubGlobal('Audio', AudioMock)

    playContactBellSound()
    playContactBellSound()
    playTwinkleSound()
    playChompSound()

    expect(AudioMock).toHaveBeenCalledTimes(3)
    expect(AudioMock).toHaveBeenNthCalledWith(1, '/sounds/contact-bell.mp3')
    expect(AudioMock).toHaveBeenNthCalledWith(2, '/sounds/twinkle.mp3')
    expect(AudioMock).toHaveBeenNthCalledWith(3, '/sounds/chomp.mp3')
    expect(play).toHaveBeenCalledTimes(4)
  })
})
