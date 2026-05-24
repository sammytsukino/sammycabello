import { useEffect } from 'react'

const SITE_NAME = 'SammyCabello'
const TITLE_SEPARATOR = ' ★ '

export function useDocumentTitle(title = '') {
  useEffect(() => {
    const previous = document.title
    document.title = title ? `${title}${TITLE_SEPARATOR}${SITE_NAME}` : SITE_NAME
    return () => {
      document.title = previous
    }
  }, [title])
}
