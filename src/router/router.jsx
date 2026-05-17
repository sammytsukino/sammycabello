import { Navigate, Route, Routes } from 'react-router-dom'
import { ContactView } from '../views/ContactView.jsx'
import { HomeView } from '../views/HomeView.jsx'
import { OverviewView } from '../views/OverviewView.jsx'
import { ProjectDetailView } from '../views/ProjectDetailView.jsx'
import { RootLayout } from '../views/RootLayout.jsx'

export default function Router() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<HomeView />} />
        <Route path="/overview" element={<Navigate to="/overview/web-stuff" replace />} />
        <Route path="/overview/:category" element={<OverviewView />} />
        <Route path="/project/:slug" element={<ProjectDetailView />} />
        <Route path="/contact" element={<ContactView />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
