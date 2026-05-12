import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { HomeDvdScreensaverSection } from '../components/HomeDvdScreensaverSection.jsx'
import { HomeInteractiveGallerySection } from '../components/HomeInteractiveGallerySection.jsx'
import { HomeHeroSection } from '../components/HomeHeroSection.jsx'
import { HomeLandingFixedNav } from '../components/HomeLandingFixedNav.jsx'
import { HomePageScrollBackdrop } from '../components/HomePageScrollBackdrop.jsx'
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
    <>
      <HomePageScrollBackdrop />
      {pathname === '/' ? <HomeLandingFixedNav /> : null}
      <main className="relative z-10 min-h-svh min-w-0 bg-transparent">
        <HomeHeroSection />
        <PostHeroSection />
        <HomeInteractiveGallerySection />
        <HomeDvdScreensaverSection />
      </main>
    </>
  )
}
