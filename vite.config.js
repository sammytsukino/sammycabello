/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.js'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*.{js,jsx}'],
      exclude: [
        'src/main.jsx',
        'src/test/**',
        'src/assets/**',
        'src/lib/initLenis.js',
        'src/views/HomeView.jsx',
        'src/components/HomeDvdScreensaverSection.jsx',
        'src/components/HomeHeroSection.jsx',
        'src/components/HomeHeroImageTrail.jsx',
        'src/components/HomeInteractiveGallerySection.jsx',
        'src/components/HomeLandingFixedNav.jsx',
        'src/components/HomePageScrollBackdrop.jsx',
        'src/components/PostHeroSection.jsx',
        'src/components/NameDisplay.jsx',
        'src/data/homeDvdScreensaverImages.js',
        'src/data/homeHeroTrailImagesGreen.js',
        'src/data/homeHeroTrailImagesPink.js',
        'src/hooks/useDvdScreensaver.js',
      ],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 70,
        statements: 70,
      },
    },
  },
})
