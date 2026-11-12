import { useLocale } from "../i18n/locale";

export function EmptyField({ path }: { path: string }) {
  const { ui } = useLocale();
  return (
    <p className="label inline-flex items-center gap-2 rounded-full border border-dashed border-[#ff5b3d]/60 px-3 py-1.5 text-[#ff9d88]">
      <span aria-hidden="true">◆</span>
      {ui.empty(path)}
    </p>
  );
}
