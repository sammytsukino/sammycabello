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
      className="box-border flex w-full max-w-full min-w-0 justify-between gap-1 px-0 sm:gap-2"
    >
      {WORK_TILES.map((tile, index) => (
        <figure
          key={`${tile.caption}-${index}`}
          className={`m-0 aspect-auto size-[min(26vw,28vh,340px)] shrink-0 overflow-hidden min-w-0 md:size-[min(24vw,min(26vh))] ${tile.accent}`}
        >
          <figcaption className="sr-only">{tile.caption}</figcaption>
        </figure>
      ))}
    </div>
  )
}
