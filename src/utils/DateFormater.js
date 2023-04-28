import { DateTime } from "luxon";

function formatDate(
  dateString = "31/12/2099",
  inputFormat = "dd/MM/yyyy",
  outputFormat = "MMM dd yy"
) {
  const date = DateTime.fromFormat(dateString, inputFormat);
  return date.toFormat(outputFormat);
}

export default formatDate;
