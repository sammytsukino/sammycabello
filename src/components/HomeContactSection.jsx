const CONTACT_EMAIL = 'sammy.cabello.g@gmail.com'

function handleSubmit(e) {
  e.preventDefault()
  const form = e.currentTarget
  const fd = new FormData(form)
  const name = String(fd.get('name') ?? '').trim()
  const replyEmail = String(fd.get('email') ?? '').trim()
  const message = String(fd.get('message') ?? '').trim()

  if (!replyEmail || !message) return

  const subject = encodeURIComponent(
    `Portfolio · ${name || 'Sin nombre'}`,
  )
  const body = encodeURIComponent(
    `${message}\n\n— ${name}\n${replyEmail}`,
  )
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
}

export function HomeContactSection() {
  return (
    <section
      id="home-contact"
      aria-labelledby="home-contact-heading"
      className="relative isolate overflow-hidden bg-portfolio-lime px-site-x py-site-y-loose max-lg:py-site-y-tight"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[8%] top-[12%] select-none font-editorial text-[clamp(4rem,18vw,14rem)] font-normal leading-none text-black/[0.07]"
      >
        ✶
      </div>

      <div className="relative mx-auto w-full max-w-[90rem]">
        <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          <h2
            id="home-contact-heading"
            className="m-0 max-w-[min(100%,15ch)] font-editorial text-[clamp(1.85rem,calc(5.5vw+0.25rem),4.75rem)] font-normal leading-[0.95] tracking-[-0.02em] text-black lg:max-w-[15ch] lg:text-[clamp(2.25rem,6.5vw,4.75rem)]"
          >
            Escribe algo
            <span className="font-mono text-[0.35em] align-super tracking-normal">
              {' '}
              (casi)
            </span>{' '}
            serio
          </h2>

        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-[clamp(2.5rem,6vh,3.75rem)] max-w-[min(100%,42rem)] p-[clamp(1.25rem,3.5vw,2rem)] backdrop-blur-[2px] lg:-rotate-[0.2deg]"
        >
          <div className="grid gap-[clamp(1.25rem,3vh,1.75rem)]">
            <div className="grid gap-2 lg:grid-cols-[1fr_1.1fr] lg:gap-x-6">
              <div className="grid gap-1.5">
                <label
                  htmlFor="home-contact-name"
                  className="font-mono text-[10px] uppercase tracking-[0.22em] text-black/80"
                >
                  Quién eres
                </label>
                <input
                  id="home-contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="tu nombre o alias"
                  className="w-full border-2 border-black bg-white/90 px-3 py-2.5 font-editorial text-[clamp(1rem,2.8vw,1.15rem)] text-black placeholder:text-black/35 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20"
                />
              </div>
              <div className="grid gap-1.5 lg:mt-3">
                <label
                  htmlFor="home-contact-email"
                  className="font-mono text-[10px] uppercase tracking-[0.22em] text-black/80"
                >
                  Tu correo
                </label>
                <input
                  id="home-contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="para poder responderte"
                  className="w-full border-2 border-black bg-white/90 px-3 py-2.5 font-editorial text-[clamp(1rem,2.8vw,1.15rem)] text-black placeholder:text-black/35 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20"
                />
              </div>
            </div>

            <div className="grid gap-1.5">
              <label
                htmlFor="home-contact-message"
                className="font-mono text-[10px] uppercase tracking-[0.22em] text-black/80"
              >
                El mensaje
              </label>
              <textarea
                id="home-contact-message"
                name="message"
                required
                rows={5}
                placeholder="Ideas, fechas, presupuesto, moodboard, chisme tipográfico…"
                className="min-h-[9rem] w-full resize-y border-2 border-black bg-white/90 px-3 py-2.5 font-editorial text-[clamp(1rem,2.8vw,1.15rem)] leading-relaxed text-black placeholder:text-black/35 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20"
              />
            </div>

            <div className="flex flex-col items-start gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between sm:gap-6 lg:gap-8">
              <button
                type="submit"
                className="border-2 border-black bg-black px-8 py-3 font-mono text-[10px] lowercase tracking-[0.24em] text-portfolio-lime transition-colors hover:bg-transparent hover:text-black"
              >
                Abrir mail
              </button>
              <p className="m-0 max-w-[32ch] font-editorial text-[0.8125rem] leading-normal text-black">
                O si prefieres copiar y pegar:{' '}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-black underline decoration-black/30 underline-offset-[3px] transition-colors hover:decoration-black"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
