export function scrollToElementWithTransition(element) {
  if (!element || typeof window === 'undefined') return

  const run = () =>
    element.scrollIntoView({
      behavior: 'instant',
      block: 'start',
    })

  if (typeof document.startViewTransition === 'function') {
    document.startViewTransition(run)
  } else {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export function scrollToIdWithTransition(id) {
  scrollToElementWithTransition(document.getElementById(id))
}
