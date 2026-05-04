import { useCallback, useState } from 'react'

import locomotiveFontUrl from '../assets/LocomotiveNew_n0o5vm.ttf?url'

const NAME = 'SammyCabello'
const CONFIRMED_STYLISTIC_SETS = ['ss01', 'ss02', 'ss03', 'ss04', 'ss05']
const STYLE_VARIANTS = [null, ...CONFIRMED_STYLISTIC_SETS]
const ALTERNATE_COLORS = ['#4EF967', '#FF5FC6']
let colorIndex = 0

function nextColor() {
  const color = ALTERNATE_COLORS[colorIndex % 2]
  colorIndex++
  return color
}

const FOOTER_PINNED_GLYPHS = [
  {
    index: 2,
    match: (ch) => ch.toLowerCase() === 'm',
    ss: 'ss02',
    color: '#FF5FC6',
  },
  {
    index: 4,
    match: (ch) => ch.toLowerCase() === 'y',
    ss: 'ss01',
    color: '#4EF967',
  },
  {
    index: 7,
    match: (ch) => ch.toLowerCase() === 'b',
    ss: 'ss01',
    color: '#FF5FC6',
  },
  {
    index: 11,
    match: (ch) => ch.toLowerCase() === 'o',
    ss: 'ss01',
    color: '#4EF967',
  },
]

const FOOTER_LOCKED_LOCOMOTIVE_INDICES = new Set([0])
const FOOTER_HOVER_EXCLUDE = new Set([
  ...FOOTER_PINNED_GLYPHS.map((g) => g.index),
  ...FOOTER_LOCKED_LOCOMOTIVE_INDICES,
])

function footerPinAt(char, index) {
  for (const g of FOOTER_PINNED_GLYPHS) {
    if (g.index === index && g.match(char)) return g
  }
  return null
}

function pickNonAdjacentLetters(name, count = 3, excludeIndices = null) {
  const exclude =
    excludeIndices instanceof Set ? excludeIndices : new Set(excludeIndices ?? [])
  const letterIndices = []
  for (let i = 0; i < name.length; i++) {
    if (name[i] !== ' ' && !exclude.has(i)) letterIndices.push(i)
  }

  const shuffled = [...letterIndices].sort(() => Math.random() - 0.5)
  const selected = new Set()

  for (const idx of shuffled) {
    if (selected.size >= count) break
    if (!selected.has(idx - 1) && !selected.has(idx + 1)) {
      selected.add(idx)
    }
  }

  return selected
}

function randomSS() {
  return STYLE_VARIANTS[Math.floor(Math.random() * STYLE_VARIANTS.length)]
}

export default function NameDisplay({ variant = 'default' }) {
  const [alternateMap, setAlternateMap] = useState({})
  const isFooter = variant === 'footer'
  const isNavbar = variant === 'navbar'

  const handleMouseEnter = useCallback(() => {
    const footerExclude = isFooter ? FOOTER_HOVER_EXCLUDE : null

    const selected = pickNonAdjacentLetters(
      NAME,
      isFooter ? 2 : 3,
      footerExclude,
    )
    const map = {}
    for (const idx of selected) {
      map[idx] = { ss: randomSS(), color: nextColor() }
    }
    setAlternateMap(map)
  }, [isFooter])

  const handleMouseLeave = useCallback(() => {
    setAlternateMap({})
  }, [])

  const rootClassName = [
    'name-text',
    isFooter ? 'name-text--footer' : '',
    isNavbar ? 'name-text--navbar' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const styleBlock = `
        @font-face {
          font-family: 'LocomotiveNew';
          src: url('${locomotiveFontUrl}') format('truetype');
          font-weight: normal;
          font-style: normal;
        }

        @font-face {
          font-family: 'Allsorts';
          src: url('https://res.cloudinary.com/dsy30p7gf/raw/upload/v1776855947/ALLSORTS-Regular_colkut.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
        }

        .name-text {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          line-height: 1;
        }

        .name-text--footer {
          justify-content: flex-start;
          align-items: baseline;
          line-height: 0.82;
          white-space: nowrap;
        }

        .name-text--navbar {
          align-items: baseline;
        }

        .name-text--navbar .char {
          font-size: clamp(1.65rem, 5vw, 3.25rem);
        }

        .char {
          display: inline-block;
          font-family: 'LocomotiveNew', serif;
          font-size: clamp(1.125rem, 2.6vw, 3rem);
          font-weight: normal;
          color: #000000;
          line-height: 1;
          vertical-align: bottom;
        }

        .name-text--footer .char {
          flex: none;
          font-size: clamp(5rem, min(42vw, 46vh), 36rem);
          line-height: 0.82;
        }

        .char.space {
          width: 0.3em;
        }

        .name-text--footer .char.space {
          width: 0.22em;
        }

        .char.alternate {
          font-family: 'Allsorts', serif;
        }

        .name-text--footer .char.name-footer-pinned {
          font-family: 'Allsorts', serif !important;
          color: var(--nft-color) !important;
          font-feature-settings: var(--nft-feat) !important;
        }
  `

  return (
    <>
      <style>{styleBlock}</style>

      <div
        className={rootClassName}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {NAME.split('').map((char, i) => {
          const ss = alternateMap[i]
          const pin = isFooter ? footerPinAt(char, i) : null
          const footerLockedLocomotive =
            isFooter && FOOTER_LOCKED_LOCOMOTIVE_INDICES.has(i)
          const footerFixed = !!pin
          const isAlternate = !!ss && !footerFixed && !footerLockedLocomotive

          const pinnedStyle = pin
            ? {
                ['--nft-color']: pin.color,
                ['--nft-feat']: `"${pin.ss}" 1`,
              }
            : undefined

          const inlineStyle = isAlternate
            ? {
                fontFeatureSettings:
                  ss.ss != null ? `"${ss.ss}" 1` : 'normal',
                color: alternateMap[i].color,
              }
            : undefined

          return (
            <span
              key={i}
              className={[
                'char',
                char === ' ' ? 'space' : '',
                footerFixed ? 'name-footer-pinned' : '',
                footerFixed || isAlternate ? 'alternate' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              style={pinnedStyle ?? inlineStyle}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          )
        })}
      </div>
    </>
  )
}
