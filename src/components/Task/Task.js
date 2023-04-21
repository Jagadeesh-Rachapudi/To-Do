import { VscCircleLargeFilled } from "react-icons/vsc";
import React, { useState } from "react";
import {
  AiOutlineStar,
  AiFillStar,
  AiOutlineBell,
  AiTwotoneBell,
} from "react-icons/ai";
import "./Task.scss";
import Card from "react-bootstrap/Card";
import Notification from "../Notification/Notification";

const Task = ({id,taskTitle,dueDate,dueTime,description,completed,important}) => {
  const [hoveredStar, setHoveredStar] = useState(false);
  const [hoveredReminderIcon, setHoveredReminderIcon] = useState(false);

  const currentDate = new Date();
  const showNotification = details.some(
    (detail) =>
      detail.dueDate &&
      Math.floor(Math.abs(detail.dueDate - currentDate) / 1000 / 60) <= 1
  );

  // const renderDetails = details.map((detail) => (
  //   <div key={detail.label} className="flex mx-auto my-auto ">
  //     <div className="me-2 ">
  //       {detail.dueDate ? (
  //         <p className="my-auto">
  //           {detail.dueDate.toLocaleDateString("en-US", {
  //             month: "short",
  //             day: "numeric",
  //             year: "numeric",
  //           })}
  //         </p>
  //       ) : null}
  //     </div>
  //     <div className="reminder">
  //       {detail.reminder && !hoveredReminderIcon ? (
  //         <AiOutlineBell
  //           className="default-reminder-icon cursor-pointer"
  //           onMouseEnter={() => setHoveredReminderIcon(true)}
  //           onMouseLeave={() => setHoveredReminderIcon(false)}
  //         />
  //       ) : (
  //         <AiTwotoneBell
  //           className="hover-reminder-icon cursor-pointer"
  //           onMouseEnter={() => setHoveredReminderIcon(true)}
  //           onMouseLeave={() => setHoveredReminderIcon(false)}
  //         />
  //       )}
  //     </div>
  //   </div>
  // ));

  return (
    <div>
      <Card className="task ">
        <div className="my-auto">
          <VscCircleLargeFilled className="completed ms-3 " />
        </div>
        <div className="content">
          <div className="taskTitle">{taskTitle}</div>
          <div className="details">{renderDetails}</div>
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
