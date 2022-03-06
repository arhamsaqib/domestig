export const Months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const WeekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function ConvertDateToObject(dte: any) {
  const date = new Date(dte);
  //console.log(date);
  const d = date.getDate();
  const month = Months[date.getMonth()];
  const year = date.getFullYear();
  const Day = WeekDays[date.getDay()];
  const hours = date.getHours();
  const mins = date.getMinutes();
  return {
    date: d,
    day: Day,
    year: year,
    month: month,
    hours: hours,
    minutes: mins,
  };
}
