import { useAnimationFrame } from 'framer-motion'
import { createExpoIn, reversed } from '@popmotion/easing'

export const powerOut4 = reversed(createExpoIn(4))

export function useAnimationLoop(callback) {
  useAnimationFrame(callback)
}

export function centerTransform(_, generated) {
  return `translate(-50%, -50%) ${generated ?? ''}`
}

function generateNumber(base, range) {
  return base - range / 2 + Math.round(Math.random() * range)
}

export function generateTrailImageSize() {
  const maxSide = generateNumber(250, 44)
  return {
    maxWidth: maxSide,
    maxHeight: maxSide,
  }
}
