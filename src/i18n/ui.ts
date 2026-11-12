import type { Locale } from "./locales";

/**
 * Semua teks antarmuka (label navigasi, judul bagian, tombol, teks a11y) ada di sini.
 * Proza isi situs (bio, ringkasan project) tidak ada di file ini — itu overlay di
 * content-en.ts yang jatuh kembali ke src/data/portfolio.ts kalau belum diterjemahkan.
 */
const idCopy = {
  meta: {
    title: "Hafiz Syauqi — Portofolio dan hasil project",
    description: "Portofolio pribadi: siapa saya, apa yang saya bangun, dan semua hasil project saya.",
  },
  skipLink: "Lewati ke daftar project",
  nav: {
    about: "Tentang",
    projects: "Project",
    skills: "Keahlian",
    lab: "Lab",
    journey: "Perjalanan",
    work: "Karya",
    contact: "Hubungi",
    mainLabel: "Navigasi utama",
    compactLabel: "Navigasi utama versi ringkas",
    toTop: "Ke bagian atas",
  },
  language: {
    groupLabel: "Bahasa",
  },
  hero: {
    year: "Portofolio",
    nameFallback: ["Nama", "Kamu"],
    scroll: "Scroll",
    selected: (count: number) => `${count} project terpilih`,
    viewProjects: "Lihat project",
    talk: "Ngobrol dulu",
    downloadCv: "Unduh CV",
    taglineHint: "Satu baris tentang apa yang kamu bangun dan untuk siapa — tulis di tagline di src/data/portfolio.ts.",
  },
  about: {
    greeting: (name: string) => `Halo, saya ${name}.`,
    greetingBare: "Tentang saya",
    hint: "Isi 2–3 paragraf: latar belakangmu, apa yang kamu kerjakan sekarang, dan jenis project yang ingin kamu terima. Ganti contoh di",
  },
  projects: {
    title: "Semua hasil project saya",
    intro: (count: number) =>
      `${count} project yang saya rancang dan bangun sendiri. Tiap baris menampilkan peran saya, isinya, dan teknologinya — klik chip di bawah untuk menyaringnya, barisnya akan berpindah dengan animasi FLIP anime.js.`,
    all: "Semua",
    featured: "Utama",
    shown: (shown: number, total: number) => `${shown} dari ${total} project`,
  },
  skills: {
    title: "Yang saya pakai sehari-hari",
    intro: "Bukan daftar kata kunci: ini alat yang benar-benar saya pakai untuk mengirim project sampai jalan di server.",
  },
  lab: {
    title: "Gerak di situs ini bukan CSS acak",
    intro: (version: string) =>
      `Semua animasi di halaman ini jalan lewat anime.js ${version} — dipakai langsung di komponennya, bukan lewat library pembungkus. Coba arahkan kursor, geser stiker, dan scroll bagian paling bawah.`,
    drawable: "createDrawable + stagger — garis menggambar dirinya sendiri",
    stickers: "Serak stikernya",
    scrub: "Proses saya, di-scrub scroll",
  },
  timeline: {
    title: "Pendidikan & pengalaman",
    intro: "Urut dari yang terbaru — pendidikan, organisasi, dan pekerjaan yang membentuk caraku bekerja.",
  },
  contact: {
    title: "Ngobrolin projectnya",
    copyEmail: "Salin email",
    copied: "Tersalin",
    elsewhere: "Ada di mana saja",
  },
  footer: {
    backToTop: "Kembali ke atas ↑",
    nameFallback: "Nama kamu",
  },
  empty: (path: string) => `Belum diisi — ${path}`,
};

export type UiCopy = typeof idCopy;

export const ui: Record<Locale, UiCopy> = {
  id: idCopy,
  en: {
    meta: {
      title: "Hafiz Syauqi — Portfolio and projects",
      description:
        "Personal portfolio: who I am, what I build, and every project I have shipped.",
    },
    skipLink: "Skip to the project list",
    nav: {
      about: "About",
      projects: "Projects",
      skills: "Skills",
      lab: "Lab",
      journey: "Journey",
      work: "Work",
      contact: "Contact",
      mainLabel: "Main navigation",
      compactLabel: "Compact main navigation",
      toTop: "Back to top",
    },
    language: {
      groupLabel: "Language",
    },
    hero: {
      year: "Portfolio",
      nameFallback: ["Your", "Name"],
      scroll: "Scroll",
      selected: (count: number) =>
        count === 1 ? "1 featured project" : `${count} featured projects`,
      viewProjects: "See the projects",
      talk: "Let's talk",
      downloadCv: "Download CV",
      taglineHint:
        "One line about what you build and for whom — write it in tagline in src/data/portfolio.ts.",
    },
    about: {
      greeting: (name: string) => `Hi, I'm ${name}.`,
      greetingBare: "About me",
      hint: "Fill in 2–3 paragraphs: your background, what you work on now, and the kind of projects you want. Replace the samples in",
    },
    projects: {
      title: "Everything I have built",
      intro: (count: number) =>
        `${count} projects I designed and built myself. Each row shows my role, what is in it, and the tech behind it — click a chip below to filter, and the rows move with an anime.js FLIP animation.`,
      all: "All",
      featured: "Featured",
      shown: (shown: number, total: number) => `${shown} of ${total} projects`,
    },
    skills: {
      title: "What I use day to day",
      intro:
        "Not a keyword list: these are the tools I actually use to ship a project until it runs on a server.",
    },
    lab: {
      title: "The motion here is not random CSS",
      intro: (version: string) =>
        `Every animation on this page runs on anime.js ${version} — used directly in the components, not through a wrapper library. Move the cursor around, drag the stickers, and scroll the bottom card.`,
      drawable: "createDrawable + stagger — the line draws itself",
      stickers: "Push the stickers around",
      scrub: "My process, scrubbed by scroll",
    },
    timeline: {
      title: "Education & experience",
      intro:
        "Newest first — the schooling, organisations, and work that shaped how I get things done.",
    },
    contact: {
      title: "Let's talk about the project",
      copyEmail: "Copy email",
      copied: "Copied",
      elsewhere: "Elsewhere",
    },
    footer: {
      backToTop: "Back to top ↑",
      nameFallback: "Your name",
    },
    empty: (path: string) => `Not filled in — ${path}`,
  },
};
