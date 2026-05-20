

<img src="https://res.cloudinary.com/dsy30p7gf/image/upload/v1779275349/Recurso_24outlinewhite_xftqec.svg" alt="portfolio-cover" width="200">


# sammycabello

Personal site for **Sammy Cabello**, built at the intersection of art, technology, and communication. The whole experience is framed as a **restaurant menu**: you do not browse a flat project list; you sit down, pick a mood, and choose what to taste from today’s offering.

## the food narrative

The site treats creative work like cooking. Copy on the home page talks about *“currently cooking”*, *whipping things quirky yet clean*, and *delicious experiences* for brands and audiences. That is not decorative wording; it structures how you move through the site.

**Two flavors (sweet & healthy)**  
At the top you can switch between **sweet** (pink) and **healthy** (green), like picking a craving before you order. The hero palette, image trail, scroll backdrop, accents, and even the **favicon** follow the active flavor. The toggle asks *“CRAVING SWEETS?”* or *“FEELING HEALTHY?”* depending on what you are not on yet.

**Today’s menu**  
The DVD-style section is the **menu board**: category labels bounce across the screen (desktop) or stack in a column (mobile). A cursor pill invites you to *“GRAB A BITE FROM TODAY’S MENU”*. Hover **Web Stuff** and it becomes *“NICE CHOICE!”*; that route is live. **Art & Design** and **Comms & PR** are still on the stove: struck through, greyed on hover, pill *“STILL COOKING :(”*, no navigation until those sections are filled in later.

**Courses & plates**  
- **Horizontal gallery**: a scroll-through of dishes (projects); open a case study in a **new tab** like pulling a recipe card off the pass.  
- **Post-hero**: editorial intro plus a looping square video: the visual “plate” between the side captions (*quirky* / *clean*).  
- **Overview (`/overview/web-stuff`)**: a design-report grid: numbered slots, thumbnails, footer line like *“DELICIOUS VISUALS, ROBUST RECIPES”*. All current web work lives here.  
- **Project detail (`/project/:slug`)**: full case study: story, palette, stack, media gallery, live demo and repo links when available.

Together, flavor + menu + gallery + overview turn the portfolio into a **meal you navigate**, not a spreadsheet of links.

## what’s on the menu (projects)

Eight pieces are served today, including Spora, Choreomania, SAS-SCII, Puella DB, CRAP-BOOK, The Mount Holly Estate, CHAR/ISMA, and XPlorer. Data lives in `src/data/homeGalleryItems.js`.

## Site map

| Route | Role |
|-------|------|
| `/` | Home: hero, post-hero, horizontal gallery, DVD menu |
| `/overview/web-stuff` | Web work grid (30-slot layout) |
| `/project/:slug` | Case study |
| `/contact` | Contact |

Art & Design and Comms & PR overviews exist in routing but are intentionally withheld from the DVD menu until content is ready.

## stack

| Layer | Tools |
|-------|--------|
| UI | React 19, React Router 7 |
| Build | Vite 8, React Compiler |
| Styling | Tailwind CSS 4 |
| Motion | GSAP (ScrollTrigger), Lenis smooth scroll |
| Media | Cloudinary |
| Extras | `tech-stack-icons`, custom DVD screensaver |

Smooth scroll and a flavor-aware backdrop desaturate the page as you leave the hero. **View Transitions** are used on supported navigations.

## project structure

```
src/
├── components/   # Hero, gallery, DVD menu, NameDisplay, flavor favicon, etc.
├── context/      # HomeHeroFlavorContext (sweet / healthy)
├── data/         # Projects, trails, DVD menu links
├── views/        # Home, Overview, ProjectDetail, Contact
├── router/
└── lib/          # Lenis, scroll helpers, flavor utilities
```

## local development

Requires **Node.js 18+** (20+ recommended).

```bash
npm install
npm run dev
```

Then open the URL Vite prints (default `http://localhost:5173`).

## scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server with HMR |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run unit tests (Vitest) |
| `npm run test:coverage` | Tests + coverage report (≥70% threshold) |

## license

Private project. Code and assets are for personal use unless stated otherwise.
