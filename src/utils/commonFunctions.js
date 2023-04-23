export const convertTo24HourFormat = ({ time }) => {
  const [timeStr, meridiem] = time.split(" ");
  const [hoursStr, minutesStr] = timeStr.split(":");
  let hours = parseInt(hoursStr);
  const minutes = parseInt(minutesStr);

  if (!meridiem || isNaN(hours) || isNaN(minutes)) {
    return null;
  }

  if (meridiem.toLowerCase() === "pm" && hours < 12) {
    hours += 12;
  } else if (meridiem.toLowerCase() === "am" && hours === 12) {
    hours = 0;
  }

  const hoursFormatted = hours.toString().padStart(2, "0");
  const minutesFormatted = minutes.toString().padStart(2, "0");

  console.log(`${hoursFormatted}:${minutesFormatted}`);
  return `${hoursFormatted}:${minutesFormatted}`;
};

export const convertTo12HourFormat = ({timeString}) => {
  let [hours, minutes] = timeString.split(":");
  const suffix = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  hours = hours.toString().padStart(2, "0");
  minutes = minutes.toString().padStart(2, "0");

  return `${hours}:${minutes} ${suffix}`;
};
