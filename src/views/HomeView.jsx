import { HomeHeroSection } from '../components/HomeHeroSection.jsx'
import { PostHeroSection } from '../components/PostHeroSection.jsx'

export function HomeView() {
  return (
    <main className="min-h-svh min-w-0 bg-portfolio-bg">
      <HomeHeroSection />
      <PostHeroSection />
    </main>
  )
}
