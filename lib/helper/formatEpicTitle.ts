export const formatEpicTitle = (title: string) => {
  if (!title) return "";
  return title.length > 100 ? title.slice(0, 100) + "..." : title;
};
