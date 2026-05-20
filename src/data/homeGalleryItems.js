export const HOME_GALLERY_ITEMS = [
  {
    slug: 'spora',
    src: 'https://res.cloudinary.com/dsy30p7gf/image/upload/v1778926540/cover_yginat.png',
    pal: [
      [0.9411764705882353, 0.9411764705882353, 0.9411764705882353],
      [0.5647058823529412, 0.5647058823529412, 0.5647058823529412],
      [0.12549019607843137, 0.12549019607843137, 0.12549019607843137],
      [0.3764705882352941, 0.3764705882352941, 0.3764705882352941],
    ],
    paragraphs: [
      "SPORA is a collaborative web platform where written text becomes generative art. Each published work is a Flora: a visual piece shaped by the text’s sentiment, rhythm, and structure, not by manual design alone. The tagline captures the intent: text becomes generative art; collaboration without destruction",
      "Creators write in the Laboratory, preview the generative output, and publish. Visitors explore works in the Garden and Greenhouse, read them in the Flora Reader (with optional voice playback), and connect through profiles and follows. Admins moderate the ecosystem via a dedicated panel.",
      "Collaboration is non-destructive: new branches can grow from existing Floras while lineage and authorship stay traceable. The original work isn’t overwritten; the family tree of ideas remains visible.",
      "The project is full stack (React/TypeScript client, Node/Express API, MongoDB), built for my end of degree project (2025-2026). The platform treats writing as something that can grow and branch, like organic matter, rather than a fixed file to edit in place."
    ],
    gallery: [
      "https://res.cloudinary.com/dsy30p7gf/image/upload/v1778926978/Captura_de_pantalla_2026-05-16_122252_m6v8qf.png",
      "https://res.cloudinary.com/dsy30p7gf/video/upload/v1769447110/FLORA-SCAN_kgj7ht.mp4",
      "https://res.cloudinary.com/dsy30p7gf/image/upload/v1778926794/Captura_de_pantalla_2026-05-16_121938_cp7lmp.png",
      "https://res.cloudinary.com/dsy30p7gf/video/upload/v1776937681/example1_ye6cd9.mp4",
      "https://res.cloudinary.com/dsy30p7gf/image/upload/v1778926874/Captura_de_pantalla_2026-05-16_122105_ltfzi2.png",
      "https://res.cloudinary.com/dsy30p7gf/image/upload/v1778926925/Captura_de_pantalla_2026-05-16_122158_bb134e.png",
      "https://res.cloudinary.com/dsy30p7gf/image/upload/v1778927502/Captura_de_pantalla_2026-05-16_123129_cd2qxf.png"
    ],
    liveUrl: "https://spora.sammycabello.com",
    githubUrl: "https://github.com/sammytsukino/spora-client",
    stack: ["react", "typescript", "vitejs", "tailwindcss", "nodejs", "expressjs", "mongodb", "jest", "p5js", "threejs", "gsap", "adobeillustrator", "cloudinary"]
  },
  {
    slug: 'choreomania',
    src: 'https://res.cloudinary.com/dsy30p7gf/image/upload/v1779013786/cover_qblyp3.png',
    pal: [
      [0.9411764705882353, 0.9411764705882353, 0.9411764705882353],
      [0.5647058823529412, 0.5647058823529412, 0.5647058823529412],
      [0.12549019607843137, 0.12549019607843137, 0.12549019607843137],
      [0.3764705882352941, 0.3764705882352941, 0.3764705882352941],
    ],
    paragraphs: [
      "Choreomania is a short web narrative where sixteen contestants face four trials for a single ticket to the New Esperanza, framed as a dark, retro-futuristic ceremony led by disco-obsessed humanoid rabbits.",
      "Gameplay centers on a sound-driven \"Wheel of Hope\" raffle that narrows players (16→8→4→2→1) with persistent JavaScript state, synchronized audio, and cinematic visuals.",
      "Built with HTML5, CSS3, and Vanilla JS, the project includes Jest tests, SweetAlert2 modals, Figma designs, and an Agile three-sprint workflow documented in the repo.",
      "Deployed on Vercel as a playable demo, the project outlines expansions (leaderboards, customization, localization) and serves as a polished group showcase of front-end game design and audio storytelling."
    ],
    gallery: [
      "https://res.cloudinary.com/dsy30p7gf/image/upload/v1779266473/Captura_de_pantalla_2026-05-20_100507_n5v1nw.png",
      "https://res.cloudinary.com/dsy30p7gf/image/upload/v1779266480/Captura_de_pantalla_2026-05-20_100339_rejxmd.png",
      "https://res.cloudinary.com/dsy30p7gf/video/upload/v1779269974/CHOREOMANIA__The_last_ascent_-_Google_Chrome_2026-05-20_10-00-30_ao4hih.mov",

      "https://res.cloudinary.com/dsy30p7gf/image/upload/v1779266477/Captura_de_pantalla_2026-05-20_100402_xt117c.png",
      "https://res.cloudinary.com/dsy30p7gf/video/upload/v1779269973/CHOREOMANIA__The_last_ascent_-_Google_Chrome_2026-05-20_10-01-18_mppggf.mov",

    ],
    liveUrl: "https://choreomania.vercel.app/main/welcome.html",
    githubUrl: "https://github.com/sammytsukino/Choreomania",
    stack: ["html5", "css3", "js", "jest", "figma", "vercel"]
  },




  {
    slug: 'sasscii',
    src: 'https://res.cloudinary.com/dsy30p7gf/image/upload/v1779013884/cover_tsv99j.png',
    pal: [
      [0.9411764705882353, 0.9411764705882353, 0.9411764705882353],
      [0.5647058823529412, 0.5647058823529412, 0.5647058823529412],
      [0.12549019607843137, 0.12549019607843137, 0.12549019607843137],
      [0.3764705882352941, 0.3764705882352941, 0.3764705882352941],
    ],
    paragraphs: [
      "SAS-SCII is an interactive web application that transforms 3D models, images, and videos into customizable ASCII art by analyzing pixel luminance values and mapping them to ASCII characters and colors.",
      "The application supports multiple input sources: eight 3D model presets, image uploads, and video processing. This versatility allows users to experiment with different visual content formats and convert them into ASCII representations.",
      "The customization system offers six gray value mapping levels (Black, Dark, Medium, Light, Very Light, White), each with configurable glyphs, colors, and value ranges. Advanced features include glyph wave animation, grayscale inversion, transparent backgrounds, and real-time controls through lil-gui.",
      "Built with modern technologies, SAS-SCII combines React for the interface, Three.js for 3D rendering, and specialized media processing tools to deliver an accessible and powerful ASCII art generation platform."
    ],
    gallery: [
      "https://res.cloudinary.com/dsy30p7gf/image/upload/v1779267166/Captura_de_pantalla_2026-05-20_105240_ovc44t.png",
      "https://res.cloudinary.com/dsy30p7gf/video/upload/v1779270013/SAS-SCII_-_Google_Chrome_2026-05-20_10-46-14_tzbtim.mov",
      "https://res.cloudinary.com/dsy30p7gf/image/upload/v1779267213/Captura_de_pantalla_2026-05-20_105328_fjojkc.png",
      "https://res.cloudinary.com/dsy30p7gf/image/upload/v1779266986/Captura_de_pantalla_2026-05-20_104928_nvl3nv.png",
      "https://res.cloudinary.com/dsy30p7gf/video/upload/v1779270018/SAS-SCII_-_Google_Chrome_2026-05-20_10-47-18_qmikwn.mov",
    ],
    liveUrl: "https://sas-scii.vercel.app/",
    githubUrl: "https://github.com/sammytsukino/SAS-SCII",
    stack: ["react", "threejs", "vitejs"]
  },



  {
    slug: 'puelladatabase',
    src: 'https://res.cloudinary.com/dsy30p7gf/image/upload/v1779014473/cover_eq1xua.png',
    pal: [
      [0.9411764705882353, 0.9411764705882353, 0.9411764705882353],
      [0.5647058823529412, 0.5647058823529412, 0.5647058823529412],
      [0.12549019607843137, 0.12549019607843137, 0.12549019607843137],
      [0.3764705882352941, 0.3764705882352941, 0.3764705882352941],
    ],
    paragraphs: [
      "マギカ-DB is a Django web application that manages data for magical girls, witches, and familiars from the anime \"Puella Magi Madoka Magica\". It provides a complete CRUD interface and REST API capabilities for organizing and accessing character information.",
      "The application allows users to create, update, and delete records for three entity types: Magical Girls (with attributes like soul gem color and power level), Witches (characterized by barrier type and danger level), and Familiars. It includes user authentication through login and registration features.",
      "Built with Django 4.x and Python 3.x, the project follows the MTV architecture pattern using Django Templates for rendering and SQLite for data persistence. The codebase is organized into models, views, forms, and templates for clean, maintainable code.",
      "Installation is simple: clone the repository, set up a Python virtual environment, install dependencies from requirements.txt, run migrations, and start the development server."
    ],
    gallery: [
      "https://res.cloudinary.com/dsy30p7gf/image/upload/v1779014708/Captura_de_pantalla_2026-05-17_124321_yzcynq.png",
      "https://res.cloudinary.com/dsy30p7gf/video/upload/v1779263740/puella_2_tb9nw8.mp4",
      "https://res.cloudinary.com/dsy30p7gf/image/upload/v1779014691/Captura_de_pantalla_2026-05-17_124336_nvghup.png",
      "https://res.cloudinary.com/dsy30p7gf/image/upload/v1779014880/Captura_de_pantalla_2026-05-17_124422_pfymbx.png",
      "https://res.cloudinary.com/dsy30p7gf/image/upload/v1779014880/Captura_de_pantalla_2026-05-17_124410_fvtpxx.png",
      "https://res.cloudinary.com/dsy30p7gf/image/upload/v1779263278/Captura_de_pantalla_2026-05-20_094734_w1mdpl.png"

    ],
    githubUrl: "https://github.com/sammytsukino/madoka-app-django",
    stack: ["django", "python", "sqlite"]
  },





  {
    slug: 'crap-book',
    src: 'https://res.cloudinary.com/dsy30p7gf/image/upload/v1779015131/cover_o7tnbi.png',
    pal: [
      [0.9411764705882353, 0.9411764705882353, 0.9411764705882353],
      [0.5647058823529412, 0.5647058823529412, 0.5647058823529412],
      [0.12549019607843137, 0.12549019607843137, 0.12549019607843137],
      [0.3764705882352941, 0.3764705882352941, 0.3764705882352941],
    ],
    paragraphs: [
      "CRAP-BOOK is a whimsical goal-tracking web app that turns a basic to-do list into a scrapbook-style experience. It mixes productivity with humor and a bold visual identity inspired by purikura and early-2000s collage aesthetics.",
      "Instead of static lists, goals appear as draggable sticky notes on a free-form canvas. Notes use random visual variations, so each board feels handmade, playful, and unique.",
      "Its standout feature is the ironic “reality check” mechanic: when you complete goals, the app can generate new humorous ones. A modal then lets users keep going with the joke or remove generated goals and start fresh.",
      "The project is lightweight and fully client-side, with persistent local storage and no account required. It works on desktop and mobile, including touch interactions."
    ],
    gallery: [
      "https://res.cloudinary.com/dsy30p7gf/image/upload/v1779267425/Captura_de_pantalla_2026-05-20_105521_tmiltq.png",
      "https://res.cloudinary.com/dsy30p7gf/video/upload/v1779270001/CRAP-BOOK_-_Google_Chrome_2026-05-20_10-56-12_km0h0l.mov",
      "https://res.cloudinary.com/dsy30p7gf/image/upload/v1779267427/Captura_de_pantalla_2026-05-20_105527_kc2ail.png",
      "https://res.cloudinary.com/dsy30p7gf/image/upload/v1779267430/Captura_de_pantalla_2026-05-20_105549_gr2g3m.png",
      "https://res.cloudinary.com/dsy30p7gf/image/upload/v1779267500/Captura_de_pantalla_2026-05-20_105815_gzb5iw.png"

    ],
    liveUrl: "https://crap-book.vercel.app/",
    githubUrl: "https://github.com/sammytsukino/CRAP-BOOK",
    stack: ["html5", "css3", "js"]
  },


  {
    slug: 'mtholly',
    src: 'https://res.cloudinary.com/dsy30p7gf/image/upload/v1779015593/cover_deywz4.png',
    pal: [
      [0.9411764705882353, 0.9411764705882353, 0.9411764705882353],
      [0.5647058823529412, 0.5647058823529412, 0.5647058823529412],
      [0.12549019607843137, 0.12549019607843137, 0.12549019607843137],
      [0.3764705882352941, 0.3764705882352941, 0.3764705882352941],
    ],
    paragraphs: [
      "Highly inspired by Dogubomb's Blue Prince, this project is a browser-based puzzle game set inside Mt. Holly Estate, where the player takes the role of the Crown-Bearer and must reach Room 46 to win. It combines exploration, strategy, and a blueprint-inspired visual theme.",
      "Gameplay is driven by terminal-style commands. The player can move, rotate, report status, place blocking rooms, and reset the session, while the estate changes dynamically as red rooms appear and reshape the path.",
      "The board is a 5x9 grid with wraparound movement at the edges. The objective is simple but challenging: navigate from the entrance to the final room without getting trapped by the shifting layout.",
      "The experience is presented through a custom UI that mixes a blueprint aesthetic with a retro terminal interface. It includes a home screen, an interactive game view, status feedback, and accessibility-focused structure for keyboard and screen reader support."
    ],
    gallery: [
      
      "https://res.cloudinary.com/dsy30p7gf/video/upload/v1779270598/The_Mount_Holly_Estate_-_A_Blueprint_Adventure_-_Google_Chrome_2026-05-20_11-02-00_ogs5bs.mov",
      "https://res.cloudinary.com/dsy30p7gf/image/upload/v1779267762/Captura_de_pantalla_2026-05-20_105925_prjwbq.png",
      "https://res.cloudinary.com/dsy30p7gf/image/upload/v1779267797/Captura_de_pantalla_2026-05-20_105947_xuh1oy.png",
      "https://res.cloudinary.com/dsy30p7gf/image/upload/v1779267801/Captura_de_pantalla_2026-05-20_105930_gu3b21.png",
      "https://res.cloudinary.com/dsy30p7gf/image/upload/v1779267804/Captura_de_pantalla_2026-05-20_110029_fsmlck.png",
    ],
    liveUrl: "https://the-mount-holly-estate.vercel.app/",
    githubUrl: "https://github.com/sammytsukino/the-mount-holly-estate",
    stack: ["react", "vitejs", "tailwindcss", "postcss"]
  },



  {
    slug: 'charisma',
    src: 'https://res.cloudinary.com/dsy30p7gf/image/upload/v1779015974/cover_cfwcl7.png',
    pal: [
      [0.9411764705882353, 0.9411764705882353, 0.9411764705882353],
      [0.5647058823529412, 0.5647058823529412, 0.5647058823529412],
      [0.12549019607843137, 0.12549019607843137, 0.12549019607843137],
      [0.3764705882352941, 0.3764705882352941, 0.3764705882352941],
    ],
    paragraphs: [
      "CHAR/ISMA is a simple yet powerful web application that transforms images, videos, and webcam footage into ASCII and pixel art. Designed with a distinctive brutalist aesthetic, it allows users to create unique visual art from any multimedia content.",
      "The app analyzes the brightness values of your source media and maps them to different representations based on your settings. Dark areas become one style (background), while light areas become another (elements).",
      "Built with vanilla JavaScript, HTML5 Canvas, and CSS, it demonstrates how powerful creative tools can be constructed using standard web technologies.",
    ],
    gallery: [
      "https://res.cloudinary.com/dsy30p7gf/video/upload/v1779270066/CHAR_ISMA_-_Google_Chrome_2026-05-20_11-10-49_qkffya.mov",
      "https://res.cloudinary.com/dsy30p7gf/image/upload/v1779268429/Captura_de_pantalla_2026-05-20_111324_oofyah.png",
      "https://res.cloudinary.com/dsy30p7gf/image/upload/v1779270216/Captura_de_pantalla_2026-05-20_114329_viymn5.png",
      "https://res.cloudinary.com/dsy30p7gf/image/upload/v1779270339/Captura_de_pantalla_2026-05-20_114534_hqerfv.png",
    ],
    liveUrl: "https://char-isma.vercel.app/",
    githubUrl: "https://github.com/sammytsukino/char-isma",
    stack: ["html5", "css3", "js"]
  },


  {
    slug: 'xplorer',
    src: 'https://res.cloudinary.com/dsy30p7gf/image/upload/v1779016142/img-6_mbjqnu.png',
    pal: [
      [0.9411764705882353, 0.9411764705882353, 0.9411764705882353],
      [0.5647058823529412, 0.5647058823529412, 0.5647058823529412],
      [0.12549019607843137, 0.12549019607843137, 0.12549019607843137],
      [0.3764705882352941, 0.3764705882352941, 0.3764705882352941],
    ],
    paragraphs: [
      "XPlorer is a conceptual UI/UX and branding project for an interdimensional travel agency. It transforms video game worlds into real-life tourist destinations. The interface bridges the gap between a sci-fi premise and a seamless booking experience, proving that you are no longer just a spectator. You are a traveler.",
      "Designed to make interdimensional travel as intuitive as booking a standard flight. Users can easily browse 20 iconic game worlds, schedule their trip, and get routed to their nearest XPlorators®, the physical departure portals conveniently located across major Spanish airports.",
      "To avoid choice paralysis, the app features an interactive personality test. By analyzing playstyles and adrenaline tolerance, XPerience® curates personalized itineraries. Whether users seek a Peaceful Paradise or a Dark Terror getaway, this gamified flow matches every traveler with their ideal destination.",
      "As a pure UI/UX exercise built entirely in Figma, this case study focuses on visual hierarchy, immersive branding, and intuitive user flows. Through compelling imagery and structured layouts, the design successfully sells the illusion of a futuristic, fully functional travel app."
    ],
    gallery: [
      "https://res.cloudinary.com/dsy30p7gf/video/upload/v1779270038/XPLORER_-_Entrega_final_-_Mockup_Web_Ver._-_Google_Chrome_2025-03-03_17-54-40_f6w5oz.mov",
      "https://res.cloudinary.com/dsy30p7gf/image/upload/v1779268708/Captura_de_pantalla_2026-05-20_111702_postqo.png",
      "https://res.cloudinary.com/dsy30p7gf/image/upload/v1779268714/Captura_de_pantalla_2026-05-20_111727_ukvvdo.png",
      "https://res.cloudinary.com/dsy30p7gf/image/upload/v1779268595/Rectangle_1_tasbrb.png",
      "https://res.cloudinary.com/dsy30p7gf/image/upload/v1779268718/Captura_de_pantalla_2026-05-20_111815_hkt9do.png",
    ],
    liveUrl: "https://www.figma.com/proto/TAP0cyNz8kO9AsdBAqP77K/XPLORER-Entrega-final?node-id=1-2&p=f&t=IkngQ3nsHx7qs1bk-0&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A52961",
    stack: ["figma", "adobeillustrator", "adobeaftereffects"]
  },


]

export function paletteToRgbCss(pal) {
  return pal.map(([r, g, b]) => {
    const R = Math.round(r * 255)
    const G = Math.round(g * 255)
    const B = Math.round(b * 255)
    return `rgb(${R} ${G} ${B})`
  })
}


