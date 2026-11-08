export type ProjectLink = {
  label: string;
  url: string;
};

export type Project = {
  title: string;
  year: string;
  role: string;
  summary: string;
  stack: string[];
  links: ProjectLink[];
  featured?: boolean;
};

export type SkillGroup = {
  group: string;
  items: string[];
};

export type TimelineEntry = {
  period: string;
  title: string;
  place: string;
  note: string;
};

/**
 * Satu-satunya file yang perlu diedit untuk mengganti seluruh isi situs.
 * Kolom yang masih "" atau [] ditandai chip "Belum diisi" di halaman.
 */
export const profile = {
  name: "Hafiz Syauqi",
  handle: "hafiz-syq",
  nameLines: [] as string[],
  roles: [
    "Web Developer",
    "Perakit Antarmuka",
    "Penjaga Basis Data",
    "Pembelajar Terus",
  ],
  status: "Web Dev Junior",
  location: "Banda Aceh, Indonesia",
  tagline: "Always Learning Something New",
  bio: [] as string[],
  email: "hafizsyq@gmail.com",
  whatsapp: "083127596144",
  resumeUrl: "",
  socials: [
    { label: "GitHub", url: "https://github.com/hafiz-syq/MyPortofolio" },
    { label: "Instagram", url: "https://www.instagram.com/hafiz.syq/"},
  ] as ProjectLink[],
};

export const tickerItems = [
  "anime.js",
  "React",
  "TypeScript",
  "Vite",
  "Tailwind CSS",
  "shadcn/ui",
  "Node.js",
  "PostgreSQL",
  "MySQL",
  "Git",
  "Vercel",
];

export const stats = [
  { value: 3, label: "Project publik" },
  { value: 11, label: "Teknologi dipakai" },
  { value: 1, label: "Orang di balik ini semua" },
];

export const projects: Project[] = [
  {
    title: "EduVerse",
    year: "2026",
    role: "Perancang & pengembang tunggal",
    summary:
      "Platform belajar pemrograman gratis: katalog modul, editor kode langsung di browser, kuis, arena latihan, dan forum diskusi.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "PostgreSQL"],
    links: [],
    featured: true,
  },
  {
    title: "Portal Materi Teknik",
    year: "2026",
    role: "Pengembang & pengelola konten",
    summary:
      "Situs materi induksi mahasiswa teknik: jadwal kegiatan, struktur organisasi, materi keagamaan, dan teks ikrar — ringan, tanpa framework.",
    stack: ["HTML", "CSS", "JavaScript"],
    links: [],
  },
  {
    title: "Portal Organisasi Mahasiswa",
    year: "2026",
    role: "Pengembang & pengelola sistem",
    summary:
      "Portal resmi organisasi fakultas untuk informasi kegiatan, dokumen organisasi, dan akun anggota, dengan basis data produksi.",
    stack: ["Next.js", "Vercel", "MySQL", "Cron job"],
    links: [],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    group: "Frontend",
    items: ["React", "TypeScript", "Tailwind CSS", "anime.js", "shadcn/ui", "HTML semantik"],
  },
  {
    group: "Backend & Data",
    items: ["Node.js", "API REST", "MySQL", "PostgreSQL", "Desain skema", "Cron job"],
  },
  {
    group: "Alat Kerja",
    items: ["Git & GitHub", "Vite", "Vercel", "Qoder / AI-assisted coding", "Figma"],
  },
];

export const timeline: TimelineEntry[] = [
  {
    period: "2019 - 2022",
    title: "MAS RUHUL ISLAM ANAK BANGSA",
    place: "Aceh, Aceh Besar",
    note: "SMA/MA Sederajat",
  },
  {
    period: "2022 - 2025",
    title: "Self Learning (Web Dev)",
    place: "Aceh, Banda Aceh",
    note: "Mulai mengenal dunia Web Developer",
  },
  {
    period: "2025 - Sekarang",
    title: "Universitas Abulyatama",
    place: "Aceh, Aceh Besar",
    note: "S1 Sistem Informasi",
  },
];

export const availability = {
  headline: "Punya ide? Kirim detailnya, saya balas dengan estimasi kerja.",
  note: "",
};

/** Isi bagian "Lab" — semua angka di bawah dipakai langsung oleh komponen anime.js. */
export const lab = {
  version: "4.5.0",
  steps: [
    "Baca kebutuhan",
    "Sketsa struktur data",
    "Bangun antarmuka",
    "Sambung basis data",
    "Uji di HP",
    "Deploy & rawat",
  ],
  stickers: [
    { label: "anime.js", x: 6, y: 12 },
    { label: "stagger()", x: 44, y: 8 },
    { label: "timeline()", x: 72, y: 18 },
    { label: "morphTo()", x: 14, y: 46 },
    { label: "onScroll()", x: 52, y: 54 },
    { label: "spring()", x: 76, y: 44 },
    { label: "createDrawable()", x: 8, y: 74 },
    { label: "scrambleText()", x: 46, y: 78 },
  ],
};
