import { DragBoard } from "./anime/drag-board";
import { LineDraw } from "./anime/line-draw";
import { MorphBlob } from "./anime/morph-blob";
import { ScrollScrub } from "./anime/scroll-scrub";
import { Section } from "./section";
import { lab } from "../data/portfolio";

export function Lab() {
  return (
    <Section
      id="lab"
      index="04"
      eyebrow="Lab"
      title="Gerak di situs ini bukan CSS acak"
      intro={
        <p>
          Semua animasi di halaman ini jalan lewat anime.js {lab.version} — dipakai langsung di
          komponennya, bukan lewat library pembungkus. Coba arahkan kursor, geser stiker, dan scroll
          bagian paling bawah.
        </p>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="lab-card" data-reveal>
          <LineDraw label="createDrawable + stagger — garis menggambar dirinya sendiri" />
          <p className="label mt-4 text-muted-foreground">svg.createDrawable · draw "0 1"</p>
        </div>

        <div className="lab-card" data-reveal data-reveal-delay={90}>
          <div className="morph-host">
            <MorphBlob />
          </div>
          <p className="label mt-4 text-muted-foreground">morphTo · timeline loop · inOutSine</p>
        </div>

        <div className="lab-card lg:col-span-2" data-reveal>
          <h3 className="display text-[clamp(1.3rem,3vw,2rem)]">Serak stikernya</h3>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Tiap stiker adalah instance <span className="text-foreground">createDraggable</span> dengan{" "}
            <span className="text-foreground">snap</span> 26 px dan{" "}
            <span className="text-foreground">releaseEase</span> elastic — lepas di tengah, dia
            mengunci ke kisi sendiri.
          </p>
          <div className="mt-6">
            <DragBoard stickers={lab.stickers} />
          </div>
        </div>

        <div className="lab-card lg:col-span-2" data-reveal>
          <h3 className="display text-[clamp(1.3rem,3vw,2rem)]">Proses saya, di-scrub scroll</h3>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Satu <span className="text-foreground">timeline</span> yang progress-nya diikat ke{" "}
            <span className="text-foreground">onScroll(&#123; sync: true &#125;)</span>: maju saat
            kamu scroll ke bawah, mundur saat kamu scroll ke atas.
          </p>
          <div className="mt-8">
            <ScrollScrub steps={lab.steps} />
          </div>
        </div>
      </div>
    </Section>
  );
}
