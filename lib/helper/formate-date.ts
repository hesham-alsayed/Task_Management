export function formatDate(dateString: string) {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatMonthDay(dateInput: string) {
  const date = new Date(dateInput);

  const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();

  const day = date.getDate();

  return `${month} ${day}`;
}

export const formatDateForInput = (date: string | null | undefined) => {
  if (!date) return null;

  return date.split("T")[0];
};