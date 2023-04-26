import { VscCircleLargeFilled } from "react-icons/vsc";
import React, { useEffect, useState } from "react";
import { AiOutlineStar, AiFillStar, AiOutlineEdit } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import "./Task.scss";
import Card from "react-bootstrap/Card";
import Notification from "../Notification/Notification";
import formatDate from "../../utils/DateFormater";
import DateTimeMatcher from "../../utils/DateTimeMatcher";
import Confetti from "react-confetti";
import { RxCross1 } from "react-icons/rx";
import EditTask from "../EditTask/EditTask.js";
import { pageHeight } from "../../utils/commonFunctions";
import { editTaskbyId } from "../../store/thunks/editTask";
import { deleteTask } from "../../store";
import { useThunk } from "../../hooks/use-thunk";

const Task = ({
  id,
  taskTitle,
  dueDate,
  dueTime,
  description,
  completed,
  important,
  listID,
}) => {
  const [hoveredStar, setHoveredStar] = useState(false);
  const [hoveredCheck, setHoveredCheck] = useState(false);
  const [formattedDueDate, setFromatedDueDate] = useState(formatDate(dueDate));
  const [doEditTask] = useThunk(editTaskbyId);
  const [doDeleteTask] = useThunk(deleteTask);
  const [pieces, setPieces] = useState(500);
  const [onEdit, setOnEdit] = useState(false);
  const [taskDoneNow, setTaskDoneNow] = useState(false);

  const handleImportantChange = () => {
    doEditTask({
      id,
      updatedTask: {
        taskTitle,
        dueDate,
        dueTime,
        description,
        completed,
        important: !important,
        listID,
      },
    });
  };

  const handleCompletedChange = async () => {
    if (!completed) {
      setPieces(500);
    }
    setTaskDoneNow(true);
    doEditTask({
      id,
      updatedTask: {
        taskTitle,
        dueDate,
        dueTime,
        description,
        important,
        completed: !completed,
        listID,
      },
    });
  };

  const stopConfetti = () => {
    setTimeout(() => {
      setPieces(0);
    }, 3000);
  };

  useEffect(() => {
    stopConfetti();
  }, [taskDoneNow, pieces]);

  const handleDeleteTask = () => {
    doDeleteTask(id);
  };

  const handleEditTask = (task) => {
    setOnEdit(true);
  };

  const editComponent = onEdit ? (
    <>
      <EditTask showModel={true} taskID={id} />
    </>
  ) : null;

  useEffect(() => {
    setFromatedDueDate(formatDate(dueDate));
  }, [dueDate]);

  const showNotification = DateTimeMatcher({ dueDate, dueTime });
  return (
    <div>
      {taskDoneNow === true ? (
        <>
          <Confetti gravity={0.2} numberOfPieces={pieces} height={pageHeight} />
        </>
      ) : null}
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
              onClick={async () => {
                await handleCompletedChange();
              }}
              onMouseEnter={() => setHoveredCheck(true)}
              onMouseLeave={() => setHoveredCheck(false)}
            />
          ) : !completed && hoveredCheck ? (
            <VscCircleLargeFilled
              className="not-completed ms-2 mb-1"
              onClick={async () => {
                await handleCompletedChange();
              }}
              onMouseEnter={() => setHoveredCheck(true)}
              onMouseLeave={() => setHoveredCheck(false)}
            />
          ) : completed && hoveredCheck ? (
            <AiOutlineCheck
              className="completed ms-2 mb-1"
              onClick={async () => {
                await handleCompletedChange();
              }}
              onMouseEnter={() => setHoveredCheck(true)}
              onMouseLeave={() => setHoveredCheck(false)}
            />
          ) : (
            <VscCircleLargeFilled
              className="completed ms-2 mb-1"
              onClick={async () => {
                await handleCompletedChange();
              }}
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
        <div className="mt-auto">
          {important && !hoveredStar ? (
            <AiFillStar
              className="default-star me-2 mb-1 cursor-pointer"
              onClick={handleImportantChange}
              onMouseEnter={() => setHoveredStar(true)}
              onMouseLeave={() => setHoveredStar(false)}
            />
          ) : important && hoveredStar ? (
            <AiOutlineStar
              className="hover-star me-2 mb-1 cursor-pointer"
              onClick={handleImportantChange}
              onMouseEnter={() => setHoveredStar(true)}
              onMouseLeave={() => setHoveredStar(false)}
            />
          ) : !important && hoveredStar ? (
            <AiFillStar
              className="hover-star me-2 mb-1 cursor-pointer"
              onClick={handleImportantChange}
              onMouseEnter={() => setHoveredStar(true)}
              onMouseLeave={() => setHoveredStar(false)}
            />
          ) : (
            <AiOutlineStar
              className="default-star me-2 mb-1 cursor-pointer"
              onClick={handleImportantChange}
              onMouseEnter={() => setHoveredStar(true)}
              onMouseLeave={() => setHoveredStar(false)}
            />
          )}
        </div>
      </Card>
      {showNotification && !completed && (
        <Notification
          onComplete={handleCompletedChange}
          taskTitle={taskTitle}
          id={id}
          dueDate={dueDate}
          dueTime={dueTime}
          description={description}
          completed={completed}
          important={important}
          showNoti={showNotification}
        />
      )}
      {editComponent}
    </div>
  );
};

export default Task;
