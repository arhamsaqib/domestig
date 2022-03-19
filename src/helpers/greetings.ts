import moment from 'moment';

export function generateGreetings() {
  var currentHour: any = moment().format('HH');
  console.log(currentHour);
  if (currentHour >= 3 && currentHour < 12) {
    return 'Good Morning';
  } else if (currentHour >= 12 && currentHour < 15) {
    return 'Good Afternoon';
  } else if (currentHour >= 15 && currentHour < 20) {
    return 'Good Evening';
  } else if (currentHour >= 20 && currentHour < 24) {
    return 'Good Night';
  } else if (currentHour >= 0 && currentHour < 3) {
    return 'Good Night';
  } else {
    return 'Hello';
  }
}
