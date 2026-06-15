export type PageItem = number | "...";

export function getPagination(current: number, total: number): PageItem[] {
  const pages: PageItem[] = [];

  const add = (p: number) => {
    if (p >= 1 && p <= total && !pages.includes(p as PageItem)) {
      pages.push(p as PageItem);
    }
  };

  add(1);
  add(2);
  add(3);

  add(current - 1);
  add(current);
  add(current + 1);

  add(total);

  pages.sort((a, b) => (a as number) - (b as number));

  const result: PageItem[] = [];

  for (let i = 0; i < pages.length; i++) {
    const currentPage = pages[i];
    const nextPage = pages[i + 1];

    result.push(currentPage);

    if (nextPage && (nextPage as number) - (currentPage as number) > 1) {
      result.push("...");
    }
  }

  return result;
}
