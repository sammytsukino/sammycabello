import { useHomeHeroFlavor } from '../context/HomeHeroFlavorContext.jsx'

const FLAVOR_TOGGLE_LABEL = Object.freeze({
  pink: 'CRAVING SWEETS?',
  green: 'FEELING HEALTHY?',
})

const pillBaseClass =
  `m-0 inline-flex w-max max-w-[min(92vw,12.5rem)] cursor-pointer items-center ` +
  `justify-center justify-self-end self-end rounded-full border-2 border-solid ` +
  `border-black bg-transparent px-[clamp(0.28rem,0.65vw,0.45rem)] ` +
  `py-[clamp(0.32rem,0.72vw,0.5rem)] text-center font-sans ` +
  `text-[clamp(0.58rem,2.2vw,0.72rem)] font-medium leading-tight tracking-normal ` +
  `text-black text-balance transition-colors duration-200 ease-out ` +
  `md:text-[clamp(0.52rem,1.55vw,0.64rem)] lg:text-[clamp(0.6rem,1.85vw,0.76rem)] ` +
  `desktop-std:lg:text-[clamp(0.54rem,1.6vw,0.68rem)] ` +
  `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ` +
  `focus-visible:outline-neutral-950/45`

const hoverAccentClass = Object.freeze({
  pink: 'hover:bg-black hover:text-portfolio-pink',
  green: 'hover:bg-black hover:text-portfolio-lime',
})

export function HomeHeroFlavorSwitch() {
  const { flavor, setFlavor } = useHomeHeroFlavor()
  const nextFlavor = flavor === 'pink' ? 'green' : 'pink'
  const label = FLAVOR_TOGGLE_LABEL[nextFlavor]

  return (
    <button
      type="button"
      className={`${pillBaseClass} ${hoverAccentClass[flavor]}`}
      aria-label={`Cambiar a versión ${nextFlavor === 'pink' ? 'rosa' : 'verde'}: ${label}`}
      onClick={() => setFlavor(nextFlavor)}
    >
      {label}
    </button>
  )
}
