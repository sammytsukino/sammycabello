export function PortfolioHeroTitle() {
  return (
    <div className="flex w-full min-w-0 justify-center overflow-x-clip overflow-y-visible">
      <h1
        className="font-editorial relative isolate z-0 box-border inline-block max-w-none min-w-0 whitespace-nowrap text-center font-normal tracking-tight uppercase text-black"
        style={{
          fontSize: 'clamp(2rem, 12vw, 20vw)',


          lineHeight: 0.92,
          paddingTop: '0.06em',
          paddingBottom: '0.1em',
        }}
      >
        <span className="relative z-[1] whitespace-nowrap">Portfolio 2026</span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-0 z-20 bg-portfolio-lime"
          style={{
            top: '50%',
            width: '2ch',
            height: '0.3em',
            transform: 'translateY(-100%)',
          }}
        />
      </h1>
    </div>
  )
}
