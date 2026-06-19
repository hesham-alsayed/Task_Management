export const formatEpicTitle = (title: string, lengthNeeded: number = 100) => {
  if (!title) return "";
  return title.length > lengthNeeded
    ? title.slice(0, lengthNeeded) + "..."
    : title;
};
