import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EmptyField } from "./empty-field";
import { Magnetic } from "./anime/magnetic";
import { Reveal } from "./reveal";
import { Section } from "./section";
import { useLocale } from "../i18n/locale";

export function Contact() {
  const { ui, content } = useLocale();
  const profile = content.profile;
  const availability = content.availability;
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    if (!profile.email) return;
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Section
      id="kontak"
      index="06"
      eyebrow={ui.nav.contact}
      title={ui.contact.title}
      intro={<p>{availability.headline}</p>}
    >
      <div className="grid gap-12 lg:grid-cols-[2fr_1fr] lg:gap-16">
        <div className="space-y-8">
          {profile.email ? (
            <Reveal>
              <p className="label text-muted-foreground">Email</p>
              <a
                href={`mailto:${profile.email}`}
                className="display mt-3 block w-fit text-[clamp(1.4rem,5vw,3.4rem)] break-all text-foreground hover:text-primary"
              >
                {profile.email}
              </a>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Magnetic strength={0.2}>
                  <Button size="sm" variant="outline" className="rounded-full px-5" onClick={copyEmail}>
                    {ui.contact.copyEmail}
                  </Button>
                </Magnetic>
                <span role="status" aria-live="polite" className="label text-primary">
                  {copied ? ui.contact.copied : ""}
                </span>
              </div>
            </Reveal>
          ) : (
            <Reveal>
              <EmptyField path="profile.email" />
            </Reveal>
          )}

          {profile.whatsapp ? (
            <Reveal delay={80}>
              <div className="border-t border-border pt-8">
                <p className="label text-muted-foreground">WhatsApp</p>
                <a
                  href={`https://wa.me/${profile.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 block w-fit text-2xl hover:text-primary sm:text-3xl"
                >
                  {profile.whatsapp} <span aria-hidden="true">↗</span>
                </a>
              </div>
            </Reveal>
          ) : null}

          {availability.note ? (
            <Reveal delay={140}>
              <p className="max-w-xl border-t border-border pt-8 text-muted-foreground">
                {availability.note}
              </p>
            </Reveal>
          ) : null}
        </div>

        <Reveal delay={100}>
          <div>
            <p className="label text-muted-foreground">{ui.contact.elsewhere}</p>
            {profile.socials.length ? (
              <ul className="mt-5 space-y-3">
                {profile.socials.map((social) => (
                  <li key={social.url}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-baseline justify-between gap-4 border-b border-border pb-3 text-lg hover:border-primary"
                    >
                      {social.label}
                      <span aria-hidden="true" className="text-muted-foreground group-hover:text-primary">
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-5">
                <EmptyField path="profile.socials" />
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
