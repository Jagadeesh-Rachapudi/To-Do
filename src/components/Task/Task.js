import { VscCircleLargeFilled } from "react-icons/vsc";
import React, { useEffect, useState } from "react";
import { AiOutlineStar, AiFillStar, AiOutlineEdit } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import "./Task.scss";
import Card from "react-bootstrap/Card";
import Notification from "../Notification/Notification";
import formatDate from "../../utils/DateFormater";
import DateTimeMatcher from "../../utils/DateTimeMatcher";
import useTasksContext from "../../hooks/use-task-context";
import Confetti from "react-confetti";
import { RxCross1 } from "react-icons/rx";
import EditTask from "../EditTask/EditTask.js";

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
  const [hoveredCheck, setHoveredCheck] = useState(false);
  const [formattedDueDate, setFromatedDueDate] = useState(formatDate(dueDate));
  const [taskDoneNow, settaskDoneNow] = useState(false);
  const { editTaskbyId, deleteTaskById } = useTasksContext();
  const [pieces, setPieces] = useState(500);
  const [onEdit, setOnEdit] = useState(false);

  const handleImportantChange = () => {
    console.log("before", important);
    editTaskbyId(id, {
      taskTitle,
      dueDate,
      dueTime,
      description,
      completed,
      important: !important,
    });
    console.log("after", important);
  };

  const handleCompletedChange = () => {
    settaskDoneNow(true);
    setPieces(500);
    editTaskbyId(id, {
      taskTitle,
      dueDate,
      dueTime,
      description,
      important,
      completed: !completed,
    });
  };

  const stopConfetti = () => {
    setTimeout(() => {
      setPieces(0);
    }, 5000);
  };

  useEffect(() => {
    stopConfetti();
  }, [taskDoneNow, pieces]);

  let pageHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );

  const handleDeleteTask = () => {
    deleteTaskById(id);
  };

  const handleEditTask = (task) => {
    setOnEdit(true);
  };

  const editComponent = onEdit ? (
    <>
      <EditTask showModel={true} taskID={id} />
    </>
  ) : null;

  const showNotification = DateTimeMatcher({ dueDate, dueTime });
  return (
    <div>
      <Card className="task ">
        <RxCross1 className="text-xl cross me-3 " onClick={handleDeleteTask} />
        <div className="mt-auto">
          <AiOutlineEdit
            className="text-xl edit ms-2"
            onClick={handleEditTask}
          />
          {!completed && !hoveredCheck ? (
            <AiOutlineCheck
              className="not-completed ms-2 mb-1"
              onClick={handleCompletedChange}
              onMouseEnter={() => setHoveredCheck(true)}
              onMouseLeave={() => setHoveredCheck(false)}
            />
          ) : !completed && hoveredCheck ? (
            <VscCircleLargeFilled
              className="not-completed ms-2 mb-1"
              onClick={handleCompletedChange}
              onMouseEnter={() => setHoveredCheck(true)}
              onMouseLeave={() => setHoveredCheck(false)}
            />
          ) : completed && hoveredCheck ? (
            <AiOutlineCheck
              className="completed ms-2 mb-1"
              onClick={handleCompletedChange}
              onMouseEnter={() => setHoveredCheck(true)}
              onMouseLeave={() => setHoveredCheck(false)}
            />
          ) : (
            <VscCircleLargeFilled
              className="completed ms-2 mb-1"
              onClick={handleCompletedChange}
              onMouseEnter={() => setHoveredCheck(true)}
              onMouseLeave={() => setHoveredCheck(false)}
            />
          )}
        </div>
        <div className="content">
          <div
            className={`taskTitle ${
              completed
                ? taskDoneNow
                  ? "taskDoneNow"
                  : "taskDoneBefore"
                : "taskNotDone"
            }`}
          >
            {taskTitle}
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div>{formattedDueDate}</div>
            <div className="mx-3 desc">{description && description}</div>
            <div>{dueTime}</div>
          </div>
        </div>
        <div className="mt-auto" onClick={handleImportantChange}>
          {important && !hoveredStar ? (
            <AiFillStar
              className="default-star me-2 mb-1 cursor-pointer"
              onMouseEnter={() => setHoveredStar(true)}
              onMouseLeave={() => setHoveredStar(false)}
            />
          ) : important && hoveredStar ? (
            <AiOutlineStar
              className="hover-star me-2 mb-1 cursor-pointer"
              onMouseEnter={() => setHoveredStar(true)}
              onMouseLeave={() => setHoveredStar(false)}
            />
          ) : !important && hoveredStar ? (
            <AiFillStar
              className="hover-star me-2 mb-1 cursor-pointer"
              onMouseEnter={() => setHoveredStar(true)}
              onMouseLeave={() => setHoveredStar(false)}
            />
          ) : (
            <AiOutlineStar
              className="default-star me-2 mb-1 cursor-pointer"
              onMouseEnter={() => setHoveredStar(true)}
              onMouseLeave={() => setHoveredStar(false)}
            />
          )}
        </div>
      </Card>
      {showNotification && (
        <Notification taskTitle={taskTitle} showNoti={showNotification} />
      )}
      {taskDoneNow ? (
        <Confetti gravity={0.2} numberOfPieces={pieces} height={pageHeight} />
      ) : null}

      {editComponent}
    </div>
  );
};

export default Task;
