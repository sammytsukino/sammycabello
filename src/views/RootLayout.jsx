import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import { FlavorFavicon } from '../components/FlavorFavicon.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import { HomeHeroFlavorProvider } from '../context/HomeHeroFlavorContext.jsx'

export function RootLayout() {
  const { pathname } = useLocation()
  const showGlobalFooter = !pathname.startsWith('/overview') && !pathname.startsWith('/project')
  const homeShellTransparent = pathname === '/'

  return (
    <HomeHeroFlavorProvider>
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>
      <FlavorFavicon />
      <div
        className={
          `flex min-h-svh w-full max-w-none flex-col overflow-x-clip ` +
          (homeShellTransparent ? 'bg-transparent' : 'bg-portfolio-bg')
        }
      >
        <div className="relative flex min-h-0 min-w-0 flex-1 flex-col">
          <Outlet />
        </div>
        {showGlobalFooter ? <SiteFooter /> : null}
      </div>
    </HomeHeroFlavorProvider>
  )
}
