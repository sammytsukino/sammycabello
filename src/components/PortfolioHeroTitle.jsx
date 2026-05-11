export function PortfolioHeroTitle() {
  return (
    <div className="flex w-full min-w-0 justify-center overflow-x-clip overflow-y-visible">
      <h1
        className={
          `font-editorial relative isolate z-0 box-border inline-block max-w-full min-w-0 ` +
          `text-balance text-center font-normal tracking-tight uppercase text-black ` +
          `max-lg:break-words lg:max-w-none lg:whitespace-nowrap ` +
          `text-[clamp(1.6rem,min(11vw,4.25rem),4.25rem)] ` +
          `lg:text-[clamp(2rem,7vw,20vw)]`
        }
        style={{
          lineHeight: 0.92,
          paddingTop: '0.06em',
          paddingBottom: '0.1em',
        }}
      >
        <span className="relative z-[1] max-lg:whitespace-normal lg:whitespace-nowrap">
          Portfolio 2026
        </span>
      </h1>
    </div>
  )
}
