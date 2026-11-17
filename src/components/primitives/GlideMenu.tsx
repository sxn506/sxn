import { useRef, useState, type FocusEvent, type PointerEvent, type ReactNode } from "react";

/* ─────────────────────────────────────────────────────────
 * GLIDE MENU
 * A vertical menu that glides a single highlight behind whichever
 * row is hovered or focused, instead of toggling a background per
 * row. Rows opt in with the `data-menu-row` attribute.
 * ───────────────────────────────────────────────────────── */

export default function GlideMenu({
  children,
  className = "",
  highlightClassName = "",
}: {
  children: ReactNode;
  className?: string;
  /** Position classes for the moving plate, e.g. "inset-x-0 rounded-control bg-hover" */
  highlightClassName?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [plate, setPlate] = useState<{ top: number; height: number } | null>(null);

  const glideTo = (event: PointerEvent<HTMLDivElement> | FocusEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement | null;
    const row = target?.closest<HTMLElement>("[data-menu-row]");
    const container = containerRef.current;
    if (!row || !container) return;

    const c = container.getBoundingClientRect();
    const r = row.getBoundingClientRect();
    setPlate({ top: r.top - c.top, height: r.height });
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onPointerOver={glideTo}
      onFocus={glideTo}
      onPointerLeave={() => setPlate(null)}
      onBlur={() => setPlate(null)}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute z-0 transition-[top,height,opacity] duration-200 ease-out ${highlightClassName}`}
        style={{
          top: plate?.top ?? 0,
          height: plate?.height ?? 0,
          opacity: plate ? 1 : 0,
        }}
      />
      {children}
    </div>
  );
}
