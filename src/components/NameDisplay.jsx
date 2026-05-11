import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import locomotiveFontUrl from '../assets/LocomotiveNew_n0o5vm.ttf?url'

const DEFAULT_NAME = 'SammyCabello'
const CONFIRMED_STYLISTIC_SETS = ['ss01', 'ss02', 'ss03', 'ss04', 'ss05']
const STYLE_VARIANTS = [null, ...CONFIRMED_STYLISTIC_SETS]
const ALTERNATE_COLORS = ['#4EF967', '#FF5FC6']

function accentColorAt(accent, alternatingIndex) {
  if (accent === 'green') return ALTERNATE_COLORS[0]
  if (accent === 'pink') return ALTERNATE_COLORS[1]
  return ALTERNATE_COLORS[alternatingIndex % ALTERNATE_COLORS.length]
}

const HOVER_CURSOR_DINGBAT = String.fromCodePoint(0x2729)
const AUTO_DEFAULT_INTERVAL_MS = 500

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

function fixedDingbatCursor() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><rect width="100%" height="100%" fill="transparent"/><text x="16" y="22" text-anchor="middle" font-size="22" font-family="serif">${HOVER_CURSOR_DINGBAT}</text></svg>`
  const encodedSvg = encodeURIComponent(svg)
  return `url("data:image/svg+xml,${encodedSvg}") 16 16, pointer`
}

export default function NameDisplay({
  variant = 'default',
  trigger = 'hover',
  autoIntervalMs = AUTO_DEFAULT_INTERVAL_MS,
  text = DEFAULT_NAME,
  accent = 'alternate',
}) {
  const resolvedAccent =
    accent === 'green' || accent === 'pink' ? accent : 'alternate'

  const [alternateMap, setAlternateMap] = useState({})
  const [cursorStyle, setCursorStyle] = useState('pointer')
  const [prevText, setPrevText] = useState(text)
  const [prevAccent, setPrevAccent] = useState(resolvedAccent)
  const autoOrderRef = useRef([])
  const lastAutoIndexRef = useRef(null)

  if (text !== prevText || resolvedAccent !== prevAccent) {
    setPrevText(text)
    setPrevAccent(resolvedAccent)
    setAlternateMap({})
  }

  const isFooter = variant === 'footer'
  const isNavbar = variant === 'navbar'
  const isScreensaver = variant === 'screensaver'
  const isAuto = trigger === 'auto'
  const footerSammyExtras = isFooter && text === DEFAULT_NAME

  const eligibleIndices = useMemo(() => {
    const indices = []
    for (let i = 0; i < text.length; i++) {
      if (text[i] === ' ') continue
      if (footerSammyExtras && FOOTER_HOVER_EXCLUDE.has(i)) continue
      indices.push(i)
    }
    return indices
  }, [footerSammyExtras, text])

  const handleMouseEnter = useCallback(() => {
    if (isAuto) return
    const footerExclude = footerSammyExtras ? FOOTER_HOVER_EXCLUDE : null

    const selected = pickNonAdjacentLetters(
      text,
      isFooter ? 2 : 3,
      footerExclude,
    )
    const ordered = [...selected].sort((a, b) => a - b)
    const map = {}
    ordered.forEach((idx, pos) => {
      map[idx] = {
        ss: randomSS(),
        color: accentColorAt(resolvedAccent, pos),
      }
    })
    setAlternateMap(map)
    setCursorStyle(isScreensaver ? 'pointer' : fixedDingbatCursor())
  }, [footerSammyExtras, isAuto, isFooter, isScreensaver, resolvedAccent, text])

  const handleMouseLeave = useCallback(() => {
    if (isAuto) return
    setAlternateMap({})
    setCursorStyle('pointer')
  }, [isAuto])

  useEffect(() => {
    if (!isAuto) return
    if (eligibleIndices.length === 0) return

    autoOrderRef.current = []
    lastAutoIndexRef.current = null

    const maxActive = isFooter ? 2 : 3
    const intervalId = window.setInterval(() => {
      setAlternateMap((prev) => {
        const activeIndices = Object.keys(prev).map((k) => Number(k))
        const withoutLast = eligibleIndices.filter(
          (i) => i !== lastAutoIndexRef.current,
        )
        const candidatePool = withoutLast.length > 0 ? withoutLast : eligibleIndices
        const inactivePool = candidatePool.filter((i) => !activeIndices.includes(i))
        const sourcePool = inactivePool.length > 0 ? inactivePool : candidatePool
        const idx = sourcePool[Math.floor(Math.random() * sourcePool.length)]

        const next = { ...prev }
        const alreadyActive = Object.prototype.hasOwnProperty.call(next, idx)
        next[idx] = alreadyActive
          ? { ...next[idx], ss: randomSS() }
          : { ss: randomSS(), color: accentColorAt(resolvedAccent, 0) }

        autoOrderRef.current = [...autoOrderRef.current.filter((k) => k !== idx), idx]
        while (autoOrderRef.current.length > maxActive) {
          const oldest = autoOrderRef.current.shift()
          if (oldest == null) break
          delete next[oldest]
        }
        const allowedKeys = new Set(
          autoOrderRef.current.slice(-maxActive).map((key) => String(key)),
        )
        for (const key of Object.keys(next)) {
          if (!allowedKeys.has(key)) {
            delete next[key]
          }
        }

        const orderedActive = autoOrderRef.current.slice(-maxActive)
        const sortedByCharIndex = [...orderedActive].sort((a, b) => a - b)
        const withAlternatingColors = {}
        for (let p = 0; p < sortedByCharIndex.length; p++) {
          const k = sortedByCharIndex[p]
          const entry = next[k]
          if (!entry) continue
          withAlternatingColors[k] = {
            ss: entry.ss,
            color: accentColorAt(resolvedAccent, p),
          }
        }

        lastAutoIndexRef.current = idx
        return withAlternatingColors
      })
    }, autoIntervalMs)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [
    autoIntervalMs,
    eligibleIndices,
    isAuto,
    isFooter,
    resolvedAccent,
    text,
  ])

  useEffect(() => {
    autoOrderRef.current = []
    lastAutoIndexRef.current = null
  }, [text, resolvedAccent])

  useEffect(() => {
    if (isAuto) return
    autoOrderRef.current = []
    lastAutoIndexRef.current = null
  }, [isAuto])

  const rootClassName = [
    'name-text',
    isFooter ? 'name-text--footer' : '',
    isNavbar ? 'name-text--navbar' : '',
    isScreensaver ? 'name-text--screensaver' : '',
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
          cursor: pointer;
          user-select: none;
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

        .name-text--screensaver {
          display: inline-flex;
          align-items: center;
          line-height: 1;
        }

        .name-text--screensaver .char {
          font-size: clamp(6rem, 12vw, 10rem);
          font-weight: normal;
          color: #000000;
          line-height: 1;
          letter-spacing: 0.04em;
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
        style={{ cursor: cursorStyle }}
      >
        {text.split('').map((char, i) => {
          const ss = alternateMap[i]
          const pin =
            footerSammyExtras ? footerPinAt(char, i) : null
          const footerLockedLocomotive =
            footerSammyExtras && FOOTER_LOCKED_LOCOMOTIVE_INDICES.has(i)
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
                color: ss.color,
                WebkitTextFillColor: ss.color,
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
