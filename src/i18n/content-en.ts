import {
  availability,
  lab,
  profile,
  projects,
  skillGroups,
  stats,
  tickerItems,
  timeline,
  type Project,
  type SkillGroup,
  type TimelineEntry,
} from "../data/portfolio";
import type { Locale } from "./locales";

/** Isi situs setelah overlay bahasa diterapkan: bentuknya sama dengan src/data/portfolio.ts. */
export type SiteContent = {
  profile: typeof profile;
  tickerItems: string[];
  stats: { value: number; label: string }[];
  projects: Project[];
  skillGroups: SkillGroup[];
  timeline: TimelineEntry[];
  availability: typeof availability;
  lab: typeof lab;
};

/**
 * Terjemahan Inggris untuk bagian yang berupa prosa. Namanya sendiri, URL, tahun,
 * dan teknologi tidak diduplikasi — itu tetap dibaca dari src/data/portfolio.ts.
 * Field yang tidak ada di sini otomatis jatuh kembali ke bahasa Indonesia, jadi
 * project baru tetap muncul di mode EN walau belum diterjemahkan.
 */
const enProfile: Partial<typeof profile> = {
  status: "Junior Web Developer",
  bio: [
    "I started coding from zero in 2022 — not from a classroom, but from looking at a student organisation website and thinking I could tidy it up myself. Three years of self-teaching later, I am now doing a B.Sc. in Information Systems at Universitas Abulyatama, and I still learn something every day: Always Learning Something New is not just a line on the homepage.",
    "So far I have built everything myself: designing the data structure, assembling the interface, wiring the API, and keeping the deployment alive the next morning. For the BEM FT UNAYA student organisation portal I own it from the database schema to the cron job; for the induction material site I deliberately used no framework so it stays light and opens fast on a student's phone. The tool is not what decides — solving the problem is.",
    "I am a perfectionist about details most people never notice: animation that genuinely runs on anime.js, text contrast that passes an accessibility audit, and a Lighthouse score of 100 on both mobile and desktop. What I want next is a project that a lot of people actually read — and a place where I can do code reviews while learning DevOps from people more experienced than me.",
  ],
};

const enStats = ["Public projects", "Technologies used", "One person behind all of it"];

const enProjects: Record<string, Partial<Project>> = {
  EduVerse: {
    role: "Designer & sole developer",
    summary:
      "A free programming-learning platform: a module catalogue, a code editor running in the browser, quizzes, a practice arena, and a discussion forum.",
  },
  "Portal Materi Teknik": {
    role: "Developer & content editor",
    summary:
      "An induction material site for engineering students: activity schedule, organisation structure, religious material, and the pledge text — lightweight, built without a framework.",
  },
  "Portal Organisasi Mahasiswa": {
    role: "Developer & system administrator",
    summary:
      "The official faculty organisation portal for event information, organisation documents, and member accounts, backed by a production database.",
  },
};

const enSkillGroups: Record<string, Partial<SkillGroup>> = {
  Frontend: { items: ["React", "TypeScript", "Tailwind CSS", "anime.js", "shadcn/ui", "Semantic HTML"] },
  "Backend & Data": {
    group: "Backend & Data",
    items: ["Node.js", "REST APIs", "MySQL", "PostgreSQL", "Schema design", "Cron jobs"],
  },
  "Alat Kerja": {
    group: "Tooling",
    items: ["Git & GitHub", "Vite", "Vercel", "Qoder / AI-assisted coding", "Figma"],
  },
};

const enTimeline: Record<string, Partial<TimelineEntry>> = {
  "MAS RUHUL ISLAM ANAK BANGSA": { note: "Islamic senior high school (MA equivalent)" },
  "Self Learning (Web Dev)": {
    period: "2022 - 2025",
    note: "Where I found web development",
  },
  "Universitas Abulyatama": {
    period: "2025 - Present",
    place: "Aceh Besar, Aceh",
    note: "B.Sc. Information Systems",
  },
};

const enAvailability: Partial<typeof availability> = {
  headline: "Got an idea? Send the details and I will reply with a work estimate.",
};

const enLabSteps = [
  "Read the brief",
  "Sketch the data structure",
  "Build the interface",
  "Connect the database",
  "Test it on a phone",
  "Deploy & maintain",
];

const base: SiteContent = {
  profile,
  tickerItems,
  stats,
  projects,
  skillGroups,
  timeline,
  availability,
  lab,
};

export function buildContent(locale: Locale): SiteContent {
  if (locale === "id") return base;
  return {
    profile: { ...profile, ...enProfile },
    tickerItems,
    stats: stats.map((stat, order) => ({ ...stat, label: enStats[order] ?? stat.label })),
    projects: projects.map((project) => ({ ...project, ...enProjects[project.title] })),
    skillGroups: skillGroups.map((group) => ({ ...group, ...enSkillGroups[group.group] })),
    timeline: timeline.map((entry) => ({ ...entry, ...enTimeline[entry.title] })),
    availability: { ...availability, ...enAvailability },
    lab: { ...lab, steps: enLabSteps.length === lab.steps.length ? enLabSteps : lab.steps },
  };
}
