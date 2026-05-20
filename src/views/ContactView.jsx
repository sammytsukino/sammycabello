import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

const MAIL = 'sammy.cabello.g@gmail.com'

export function ContactView() {
  useDocumentTitle('Contacto')

  return (
    <main
      id="main-content"
      className="min-h-svh bg-portfolio-bg px-[var(--hero-frame-inset)] py-[clamp(3rem,12svh,6rem)] text-black"
    >
      <h1 className="m-0 font-editorial text-[clamp(2rem,8vw,4rem)] leading-tight tracking-[-0.02em]">
        Contacto
      </h1>
      <p className="mt-6 max-w-[42ch] font-sans text-[clamp(0.95rem,2.5vw,1.125rem)] leading-relaxed">
        Puedes escribirme por correo o usar los enlaces del pie de página en la home.
      </p>
      <nav className="mt-8 flex flex-col gap-3 font-sans text-[clamp(0.9rem,2.2vw,1rem)]" aria-label="Opciones de contacto">
        <a
          href={`mailto:${MAIL}`}
          className="w-max text-inherit underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950/45"
        >
          {MAIL}
        </a>
        <Link
          to="/#footer-contact"
          className="w-max text-inherit underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950/45"
        >
          Ir al bloque de contacto en la home
        </Link>
      </nav>
    </main>
  )
}
