import NameDisplay from '../components/NameDisplay.jsx'

const GRID_ITEMS = [
  { id: 1, col: 1, row: 1, w: '7.5rem', h: '6rem', tone: 'from-zinc-700 to-zinc-500' },
  { id: 2, col: 2, row: 1, w: '7rem', h: '6rem', tone: 'from-sky-700 to-sky-500' },
  { id: 3, col: 4, row: 1, w: '6rem', h: '2.5rem', tone: 'from-zinc-700 to-zinc-400' },
  { id: 4, col: 7, row: 1, w: '6rem', h: '4rem', tone: 'from-rose-700 to-rose-500' },
  { id: 5, col: 8, row: 1, w: '6rem', h: '6.5rem', tone: 'from-zinc-900 to-zinc-600' },
  { id: 6, col: 3, row: 2, w: '5.5rem', h: '3.5rem', tone: 'from-zinc-700 to-zinc-500' },
  { id: 7, col: 5, row: 2, w: '4rem', h: '5.5rem', tone: 'from-stone-600 to-stone-400' },
  { id: 8, col: 9, row: 2, w: '4.25rem', h: '3rem', tone: 'from-orange-700 to-orange-500' },
  { id: 9, col: 2, row: 3, w: '5rem', h: '5.5rem', tone: 'from-zinc-800 to-zinc-500' },
  { id: 10, col: 4, row: 3, w: '4.5rem', h: '5.5rem', tone: 'from-zinc-700 to-zinc-400' },
  { id: 11, col: 6, row: 3, w: '5rem', h: '3rem', tone: 'from-lime-700 to-lime-500' },
  { id: 12, col: 9, row: 3, w: '4.5rem', h: '5.5rem', tone: 'from-zinc-900 to-zinc-600' },
  { id: 13, col: 10, row: 3, w: '4rem', h: '5.5rem', tone: 'from-zinc-700 to-zinc-500' },
]
const GRID_ITEMS_BY_ID = new Map(GRID_ITEMS.map((item) => [item.id, item]))

export function OverviewView() {
  return (
    <main className="min-h-svh w-full overflow-x-hidden bg-portfolio-bg text-black md:h-svh md:overflow-hidden">
      <section className="flex h-[5vh] min-h-11 items-center border-b border-black/35 px-3 sm:px-6 md:px-10">
        <div className="relative h-9 w-[11.9rem] flex-none overflow-visible sm:w-[12rem] md:h-6 md:w-[24rem]">
          <div className="absolute left-0 top-1/2 origin-left -translate-y-1/2 scale-[0.64] sm:scale-[0.46] md:scale-[0.56]">
            <NameDisplay variant="navbar" />
          </div>
        </div>
        <div className="ml-2 hidden text-[0.56rem] uppercase tracking-[0.12em] sm:block md:ml-4 md:text-[0.65rem] md:tracking-[0.14em]">
          Design
          <br />
          Report
        </div>
        <div className="ml-3 text-[0.56rem] uppercase tracking-[0.12em] md:ml-8 md:text-[0.65rem] md:tracking-[0.14em]">
          v2
          <br />
          2026
        </div>
        <div className="ml-auto text-[0.62rem] uppercase tracking-[0.12em] sm:text-[0.72rem] md:text-[0.8rem] md:tracking-[0.14em]">
          1.1 Direct
        </div>
        <div className="ml-3 text-[0.72rem] sm:ml-5 md:ml-8 md:text-[0.9rem]">04</div>
      </section>

      <section className="min-h-[108vh] px-3 pb-4 pt-3 sm:px-6 md:h-[75vh] md:min-h-0 md:px-10">
        <div className="grid grid-cols-3 grid-rows-[repeat(10,minmax(6.2rem,auto))] gap-x-2 gap-y-4 sm:gap-x-3 sm:gap-y-6 md:h-full md:grid-cols-10 md:grid-rows-3 md:gap-y-8">
          {Array.from({ length: 30 }, (_, idx) => {
            const slotId = idx + 1
            const item = GRID_ITEMS_BY_ID.get(slotId)

            return (
              <div key={slotId}>
                <p className="mb-1 text-[0.48rem] tracking-[0.1em] text-black/80 sm:text-[0.52rem] sm:tracking-[0.12em]">
                  [{String(slotId).padStart(2, '0')}]
                </p>
                {item ? (
                  <div
                    className={`bg-gradient-to-br ${item.tone} shadow-[0_0_0_1px_rgba(0,0,0,0.2)]`}
                    style={{
                      width: 'min(100%, 7.5rem)',
                      height: 'clamp(2.4rem, 6.8vw, 6rem)',
                      maxWidth: item.w,
                      maxHeight: item.h,
                    }}
                  />
                ) : null}
              </div>
            )
          })}
        </div>
      </section>

      <footer className="flex h-[20vh] min-h-24 items-end justify-center px-4 pb-3 sm:px-6 md:px-10 md:pb-6">
        <p className="max-w-[24ch] text-center font-editorial text-[clamp(1.4rem,7.2vw,3rem)] uppercase leading-[0.95] tracking-[0.02em] md:max-w-none md:whitespace-nowrap md:text-[4.3rem]">
          "This is a placeholder for the footer text."
        </p>
      </footer>
    </main>
  )
}
