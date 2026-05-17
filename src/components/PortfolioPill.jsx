const pillClass =
  `origin-top-left box-border inline-flex w-max max-w-[min(92vw,calc(100vw-2rem))] ` +
  `items-center justify-center rounded-full border-2 border-solid border-black ` +
  `bg-portfolio-bg px-[clamp(0.4rem,0.95vw,0.65rem)] py-[clamp(0.48rem,1.2vw,0.78rem)] ` +
  `text-center font-sans text-[clamp(0.72rem,3.2vw,1.05rem)] font-medium ` +
  `sm:text-[clamp(0.82rem,2.75vw,1.1rem)] ` +
  `md:text-[clamp(0.7rem,2.05vw,0.92rem)] ` +
  `lg:text-[clamp(0.88rem,2.5vw,1.2rem)] ` +
  `leading-tight tracking-normal text-black text-balance`

export function PortfolioPill({ as: Component = 'span', className = '', ...props }) {
  return (
    <Component
      className={className ? `${pillClass} ${className}` : pillClass}
      {...props}
    />
  )
}
