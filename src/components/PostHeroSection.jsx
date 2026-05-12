export function PostHeroSection() {
  return (
    <section
      id="post-hero"
      aria-label="Contenido principal"
      className="relative min-h-0 bg-transparent px-site-x py-site-y-tight [view-transition-name:post-hero] lg:min-h-[min(120vh,1400px)] lg:py-site-y-loose"
    >
      <div className="mx-auto flex min-h-0 w-full max-w-[120rem] flex-col items-center justify-center gap-[clamp(2rem,5svh,5rem)] lg:min-h-[calc(120vh-clamp(8rem,28vh,16rem))]">
        <p className="m-0 max-w-[100rem] text-center font-editorial text-pretty leading-[1.12] tracking-[-0.01em] text-black text-[clamp(1.15rem,calc(2.85vw+0.45rem),5rem)] max-lg:max-w-[min(100%,36rem)] md:text-[clamp(1.02rem,calc(2.35vw+0.38rem),3.5rem)] lg:text-[clamp(3rem,4vw,5rem)] lg:leading-[1.1] lg:max-w-none">
          Currently cooking <span className="text-portfolio-lime">🏠︎</span> at
          the intersection of art, technology{" "}
          <span className="text-portfolio-lime">🙵</span> communication. Focused{" "}
          <span className="text-portfolio-lime">𖦏</span> on creating delicious
          experiences for both brands and consumers{" "}
          <span className="text-portfolio-lime">✌︎</span>.
        </p>

        <div className="grid w-full max-w-[100rem] grid-cols-1 items-center gap-y-8 max-lg:max-w-[min(100%,42rem)] lg:grid-cols-[minmax(0,1fr)_minmax(260px,52rem)_minmax(0,1fr)] lg:gap-x-[clamp(2rem,7vw,6rem)] lg:gap-y-0">
          <p className="m-0 text-center font-editorial text-[clamp(1.05rem,calc(2.35vw+0.3rem),3rem)] leading-[1.15] text-black text-pretty md:text-[clamp(0.95rem,calc(2.05vw+0.26rem),2.45rem)] lg:text-[clamp(1.35rem,calc(3.2vw+0.25rem),3rem)] lg:text-left">
            Whipping it quirky and fun...
          </p>

          <div
            aria-hidden="true"
            className="mx-auto aspect-4/3 w-full max-w-[min(100%,440px)] bg-black lg:max-w-[min(100%,min(52rem,46vw))]"
          />

          <p className="m-0 text-center font-editorial text-[clamp(1.05rem,calc(2.35vw+0.3rem),3rem)] leading-[1.15] text-black text-pretty md:text-[clamp(0.95rem,calc(2.05vw+0.26rem),2.45rem)] lg:text-[clamp(1.35rem,calc(3.2vw+0.25rem),3rem)] lg:text-right">
            Yet effective, simple and clean.
          </p>
        </div>
      </div>
    </section>
  );
}
