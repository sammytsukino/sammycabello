import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { HomeContactSection } from '../components/HomeContactSection.jsx'
import { HomeDvdScreensaverSection } from '../components/HomeDvdScreensaverSection.jsx'
import { HomeInteractiveGallerySection } from '../components/HomeInteractiveGallerySection.jsx'
import { HomeHeroSection } from '../components/HomeHeroSection.jsx'
import { PostHeroSection } from '../components/PostHeroSection.jsx'
import { scrollToIdWithTransition } from '../lib/scrollWithViewTransition.js'

export function HomeView() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (pathname !== '/') return
    const id = hash?.replace(/^#/, '') ?? ''
    if (!id) return
    const t = window.setTimeout(() => scrollToIdWithTransition(id), 90)
    return () => window.clearTimeout(t)
  }, [pathname, hash])

  return (
    <main className="min-h-svh min-w-0 bg-portfolio-bg">
      <HomeHeroSection />
      <PostHeroSection />
      <HomeInteractiveGallerySection />
      <HomeDvdScreensaverSection />
      <HomeContactSection />
    </main>
  )
}
