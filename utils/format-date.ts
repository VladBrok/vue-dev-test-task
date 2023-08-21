export function formatDate(date: Date | string): string {
  const dateObj = new Date(date);
  return new Intl.DateTimeFormat(navigator.language || "en-US", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(dateObj);
}
