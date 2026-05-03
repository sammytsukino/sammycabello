import { Outlet } from 'react-router-dom'

import SiteFooter from '../components/SiteFooter.jsx'

export function RootLayout() {
  return (
    <div className="flex min-h-svh w-full max-w-none flex-col overflow-x-clip bg-portfolio-bg">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <Outlet />
      </div>
      <SiteFooter />
    </div>
  )
}
