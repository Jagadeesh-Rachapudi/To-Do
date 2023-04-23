import { VscCircleLargeFilled } from "react-icons/vsc";
import React, { useState } from "react";
import { useMemo } from "react";
import {
  AiOutlineStar,
  AiFillStar,
  AiOutlineBell,
  AiTwotoneBell,
} from "react-icons/ai";
import "./Task.scss";
import Card from "react-bootstrap/Card";
import Notification from "../Notification/Notification";
import formatDate from "../../utils/DateFormater";
import DateTimeMatcher from "../../utils/DateTimeMatcher";
const Task = ({
  id,
  taskTitle,
  dueDate,
  dueTime,
  description,
  completed,
  important,
}) => {
  const [hoveredStar, setHoveredStar] = useState(false);
  const [formattedDueDate, setFromatedDueDate] = useState(formatDate(dueDate));

  const showNotification = DateTimeMatcher({ dueDate, dueTime });
  return (
    <div>
      <Card className="task ">
        <div className="my-auto">
          <VscCircleLargeFilled className="completed ms-3 " />
        </div>
        <div className="content">
          <div className="taskTitle">{taskTitle}</div>
          <div className="d-flex justify-content-between align-items-center">
            <div>{formattedDueDate}</div>
            <div className="mx-3 desc">{description && description}</div>
            <div>{dueTime}</div>
          </div>
        </div>
        <div className="my-auto">
          {!hoveredStar ? (
            <AiOutlineStar
              className="default-star me-3 cursor-pointer"
              onMouseEnter={() => setHoveredStar(true)}
              onMouseLeave={() => setHoveredStar(false)}
            />
          ) : (
            <AiFillStar
              className="hover-star me-3 cursor-pointer"
              onMouseEnter={() => setHoveredStar(true)}
              onMouseLeave={() => setHoveredStar(false)}
            />
          )}
        </div>
      </Card>
      {showNotification && (
        <Notification taskTitle={taskTitle} showNoti={showNotification} />
      )}
    </div>
  );
};

export default Task;
