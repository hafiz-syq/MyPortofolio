import { profile } from "../data/portfolio";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
        <p className="label text-muted-foreground">
          © {year} {profile.name || "Nama kamu"}
        </p>
        <p className="label text-muted-foreground">React · Vite · Tailwind CSS</p>
        <a href="#atas" className="label text-primary hover:text-foreground">
          Kembali ke atas ↑
        </a>
      </div>
    </footer>
  );
}
