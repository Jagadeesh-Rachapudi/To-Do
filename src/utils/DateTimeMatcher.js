import { useState, useEffect } from "react";
import { DateTime } from "luxon";

function DateTimeMatcher({ dueDate, dueTime }) {
  const dueDateTime = DateTime.fromFormat(
    `${dueDate} ${dueTime}`,
    "dd/MM/yyyy HH:mm"
  );
  const now = DateTime.local();
  const nowDate = now.toFormat("dd/MM/yyyy");
  const nowTime = now.toFormat("HH:mm");
  const formatedDueDate = dueDateTime.toFormat("dd/MM/yyyy");
  const formatedDueTime = dueDateTime.toFormat("HH:mm");
//   console.log(nowTime === dueTime, nowTime, dueTime);
  return nowDate == formatedDueDate && nowTime == formatedDueTime;
}

export default DateTimeMatcher;
