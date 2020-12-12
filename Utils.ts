const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function formatDate(
  dateString: string,
  withDay: boolean = false
): string {
  const segments = dateString.split("-").map((s) => parseInt(s));
  return `${MONTHS[segments[1] - 1]}${withDay ? ` ${segments[2]},` : ""} ${
    segments[0]
  }`;
}
