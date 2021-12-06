type RelativeTimeFormatUnit =
  | "year"
  | "years"
  | "quarter"
  | "quarters"
  | "month"
  | "months"
  | "week"
  | "weeks"
  | "day"
  | "days"
  | "hour"
  | "hours"
  | "minute"
  | "minutes"
  | "second"
  | "seconds";

export const presentInteger = (number: number): string => {
  return new Intl.NumberFormat("en-US", { signDisplay: "exceptZero" }).format(number);
}

export const formatTimeAgo = (date: string): string | undefined => {
  const formatter = new Intl.RelativeTimeFormat(undefined, {
    numeric: "auto",
  });

  const DIVISIONS: Array<{ amount: number; name: RelativeTimeFormatUnit }> = [
    { amount: 60, name: "minutes" },
    { amount: 24, name: "hours" },
    { amount: 7, name: "days" },
    { amount: 4.34524, name: "weeks" },
    { amount: 12, name: "months" },
    { amount: Number.POSITIVE_INFINITY, name: "years" },
  ];

  const dateParse = new Date(date);
  const hours = dateParse.getHours();
  const minutes = dateParse.getMinutes();
  const UTC = -(dateParse.getTimezoneOffset() / 60);

  let duration = (dateParse.getTime() - new Date().getTime()) / 60000;

  for (let i = 0; i <= DIVISIONS.length; i++) {
    const division: { amount: number; name: RelativeTimeFormatUnit } =
      DIVISIONS[i];
    if (Math.abs(duration) < division.amount) {
      return (
        formatter.format(Math.round(duration), division.name) +
        ", " +
        hours +
        ":" +
        minutes +
        " i-GMT" +
        presentInteger(UTC)
      );
    }
    duration /= division.amount;
  }
};
