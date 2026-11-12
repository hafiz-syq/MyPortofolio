import { DragBoard } from "./anime/drag-board";
import { LineDraw } from "./anime/line-draw";
import { MorphBlob } from "./anime/morph-blob";
import { ScrollScrub } from "./anime/scroll-scrub";
import { Section } from "./section";
import { useLocale } from "../i18n/locale";

export function Lab() {
  const { locale, ui, content } = useLocale();
  return (
    <Section
      id="lab"
      index="04"
      eyebrow={ui.nav.lab}
      title={ui.lab.title}
      intro={<p>{ui.lab.intro(content.lab.version)}</p>}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="lab-card" data-reveal>
          <LineDraw label={ui.lab.drawable} />
          <p className="label mt-4 text-muted-foreground">svg.createDrawable · draw "0 1"</p>
        </div>

        <div className="lab-card" data-reveal data-reveal-delay={90}>
          <div className="morph-host">
            <MorphBlob />
          </div>
          <p className="label mt-4 text-muted-foreground">morphTo · timeline loop · inOutSine</p>
        </div>

        <div className="lab-card lg:col-span-2" data-reveal>
          <h3 className="display text-[clamp(1.3rem,3vw,2rem)]">{ui.lab.stickers}</h3>
          <p className="mt-2 max-w-xl text-muted-foreground">
            {locale === "en" ? (
              <>
                Every sticker is its own <span className="text-foreground">createDraggable</span>{" "}
                instance with <span className="text-foreground">snap</span> at 26 px and an elastic{" "}
                <span className="text-foreground">releaseEase</span> — drop it anywhere in the middle
                and it locks back onto its own grid.
              </>
            ) : (
              <>
                Tiap stiker adalah instance <span className="text-foreground">createDraggable</span>{" "}
                dengan <span className="text-foreground">snap</span> 26 px dan{" "}
                <span className="text-foreground">releaseEase</span> elastic — lepas di tengah, dia
                mengunci ke kisi sendiri.
              </>
            )}
          </p>
          <div className="mt-6">
            <DragBoard stickers={content.lab.stickers} />
          </div>
        </div>

        <div className="lab-card lg:col-span-2" data-reveal>
          <h3 className="display text-[clamp(1.3rem,3vw,2rem)]">{ui.lab.scrub}</h3>
          <p className="mt-2 max-w-xl text-muted-foreground">
            {locale === "en" ? (
              <>
                One <span className="text-foreground">timeline</span> whose progress is bound to{" "}
                <span className="text-foreground">onScroll(&#123; sync: true &#125;)</span>: it moves
                forward when you scroll down, backward when you scroll up.
              </>
            ) : (
              <>
                Satu <span className="text-foreground">timeline</span> yang progress-nya diikat ke{" "}
                <span className="text-foreground">onScroll(&#123; sync: true &#125;)</span>: maju saat
                kamu scroll ke bawah, mundur saat kamu scroll ke atas.
              </>
            )}
          </p>
          <div className="mt-8">
            <ScrollScrub steps={content.lab.steps} />
          </div>
        </div>
      </div>
    </Section>
  );
}
