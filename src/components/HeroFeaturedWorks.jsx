const WORK_TILES = [
  { accent: 'bg-portfolio-lime', caption: 'Proyecto destacado 1' },
  { accent: 'bg-portfolio-pink', caption: 'Proyecto destacado 2' },
  { accent: 'bg-portfolio-lime', caption: 'Proyecto destacado 3' },
]

export function HeroFeaturedWorks() {
  return (
    <div
      aria-label="Selección de trabajos"
      role="group"
      className="box-border flex w-full max-w-full min-w-0 flex-col items-center gap-4 px-0 sm:flex-row sm:items-end sm:justify-between sm:gap-2 lg:gap-3"
    >
      {WORK_TILES.map((tile, index) => (
        <figure
          key={`${tile.caption}-${index}`}
          className={`m-0 aspect-[4/3] w-full max-w-[min(100%,280px)] shrink-0 overflow-hidden sm:aspect-auto sm:max-w-none sm:size-[min(26vw,28vh,340px)] lg:size-[min(24vw,min(26vh))] ${tile.accent}`}
        >
          <figcaption className="sr-only">{tile.caption}</figcaption>
        </figure>
      ))}
    </div>
  )
}
