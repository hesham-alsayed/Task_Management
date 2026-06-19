const normalizeDate = (due_date: any) => {
  const date = new Date(due_date);
  date.setHours(0, 0, 0, 0);
  return date;
};

export function getDueDateStatus(dueDate?: string | null) {
  if (!dueDate) return "no-date";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);

  if (due.getTime() === today.getTime()) return "today";
  if (due.getTime() > today.getTime()) return "future";

  return "past";
}
