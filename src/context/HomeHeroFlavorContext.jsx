import { createContext, useContext, useMemo, useState } from 'react'
import { HOME_HERO_FLAVORS } from '../data/homeHeroFlavors.js'
import { randomHomeHeroFlavor } from '../lib/homeHeroFlavor.js'

const HomeHeroFlavorContext = createContext(null)

export function HomeHeroFlavorProvider({ children }) {
  const [flavor, setFlavor] = useState(() => randomHomeHeroFlavor())

  const value = useMemo(
    () => ({
      flavor,
      config: HOME_HERO_FLAVORS[flavor],
      setFlavor,
    }),
    [flavor],
  )

  return (
    <HomeHeroFlavorContext.Provider value={value}>
      {children}
    </HomeHeroFlavorContext.Provider>
  )
}

export function useHomeHeroFlavor() {
  const ctx = useContext(HomeHeroFlavorContext)
  if (!ctx) {
    throw new Error('useHomeHeroFlavor must be used within HomeHeroFlavorProvider')
  }
  return ctx
}
