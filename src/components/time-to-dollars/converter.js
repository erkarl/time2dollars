function convertTimeToDollars(hourlyRate, hoursWorked, minutesWorked, secondsWorked) {
  let secondsInMinutes = secondsWorked / 60;
  let minutesInHours = (secondsInMinutes + minutesWorked) / 60;
  let totalSum = hourlyRate * (hoursWorked + minutesInHours);
  let convertedTotalSum = Math.round(totalSum * 100) / 100;
  return convertedTotalSum;
}

export default convertTimeToDollars;
