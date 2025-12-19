import { useEffect, useMemo, useState } from 'react';

type UseActiveSectionOptions = {
  /**
   * IntersectionObserver rootMargin. Useful to “shift” the active zone
   * to account for fixed headers.
   */
  rootMargin?: string;
  /**
   * Intersection threshold(s).
   */
  threshold?: number | number[];
};

/**
 * Tracks which section is most “in view” and returns its id.
 * Great for highlighting active nav items on a single-page site.
 */
export function useActiveSection(sectionIds: string[], options?: UseActiveSectionOptions) {
  const [activeId, setActiveId] = useState<string | null>(sectionIds[0] ?? null);

  const stableIds = useMemo(() => sectionIds.filter(Boolean), [sectionIds]);

  useEffect(() => {
    if (stableIds.length === 0) return;
    if (typeof window === 'undefined') return;

    const ratioById = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id;
          if (!id) continue;
          ratioById.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        // Pick the most-visible section.
        let bestId: string | null = null;
        let bestRatio = 0;

        for (const id of stableIds) {
          const ratio = ratioById.get(id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }

        if (bestId && bestId !== activeId) {
          setActiveId(bestId);
        }
      },
      {
        // Shift the “active zone” downward so the fixed navbar doesn’t throw off detection.
        rootMargin: options?.rootMargin ?? '-20% 0px -65% 0px',
        threshold: options?.threshold ?? [0.15, 0.25, 0.35, 0.5, 0.7],
      }
    );

    for (const id of stableIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stableIds.join('|')]);

  return activeId;
}





