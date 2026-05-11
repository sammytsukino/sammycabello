export function PostHeroSection() {
  return (
    <section
      id="post-hero"
      aria-label="Contenido principal"
      className="relative min-h-[120vh] bg-portfolio-pink px-[clamp(1rem,4vw,2rem)] py-[clamp(4rem,14vh,8rem)] [view-transition-name:post-hero]"
    >
      <div className="mx-auto flex min-h-[calc(120vh-clamp(8rem,28vh,16rem))] w-full max-w-[120rem] flex-col items-center justify-center gap-[clamp(2.5rem,6vh,5rem)]">
        <p className="m-0 max-w-[100rem] text-center font-editorial text-[clamp(3rem,4vw,5rem)] leading-[1.1] tracking-[-0.01em] text-black">
          Currently living <span className="text-portfolio-lime">🏠︎</span> at
          the intersection of art, technology{" "}
          <span className="text-portfolio-lime">🙵</span> communication. Focused{" "}
          <span className="text-portfolio-lime">𖦏</span> on creating impactful
          experiences for both brands and consumers{" "}
          <span className="text-portfolio-lime">✌︎</span>.
        </p>

        <div className="grid w-full grid-cols-1 items-center gap-y-0 md:grid-cols-[minmax(0,1fr)_minmax(280px,1200px)_minmax(0,1fr)] md:gap-x-[clamp(2rem,7vw,6rem)]">
          <p className="m-0 text-left font-editorial text-[clamp(2rem,2.7vw,3rem)] leading-[1.15] text-black md:text-left break-words">
            Keeping it quirky and whimsy...
          </p>

          <div
            aria-hidden="true"
            className="mx-auto aspect-4/3 w-full max-w-[2000px] bg-black"
          />

          <p className="m-0 text-right font-editorial text-[clamp(1.15rem,1.7vw,1.95rem)] leading-[1.15] text-black md:text-right break-words">
            Yet simple, clean and effective.
          </p>
        </div>
      </div>
    </section>
  );
}
