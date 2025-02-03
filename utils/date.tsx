export function getOrdinal(n: number) {
  let ord = "th";

  if (n % 10 == 1 && n % 100 != 11) {
    ord = "st";
  } else if (n % 10 == 2 && n % 100 != 12) {
    ord = "nd";
  } else if (n % 10 == 3 && n % 100 != 13) {
    ord = "rd";
  }

  return n + ord;
}

export function getLastDayOfTheMonth() {
  // Create a new Date object representing the last day of the specified month
  // By passing m + 1 as the month parameter and 0 as the day parameter, it represents the last day of the specified month
  const currDate = new Date();
  return new Date(currDate.getFullYear(), currDate.getMonth() + 1, 0).getDate();
}
