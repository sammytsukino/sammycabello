import { describe, expect, it } from 'vitest'
import { formatStackLabel, getProjectTitle } from './projectLabels.js'

describe('projectLabels', () => {
  it('maps known slugs to readable titles', () => {
    expect(getProjectTitle('spora')).toBe('Spora')
    expect(getProjectTitle('sasscii')).toBe('SAS-SCII')
    expect(getProjectTitle('unknown')).toBe('unknown')
  })

  it('formats stack icon names for screen readers', () => {
    expect(formatStackLabel('tailwindcss')).toBe('Tailwindcss')
    expect(formatStackLabel('nodejs')).toBe('Nodejs')
  })
})
