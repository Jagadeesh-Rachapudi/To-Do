import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import "../CreateTask/CreateTask.scss";
import { useDispatch } from "react-redux";
import TimePicker from "../CreateTask/TimePicker.js";
import {
  convertTo24HourFormat,
  convertTo12HourFormat,
} from "../../utils/commonFunctions";
import { editTaskbyId } from "../../store";
import { useSelector } from "react-redux";

function EditTask({ showModel = false, taskID }) {
  const [show, setShow] = useState(showModel);
  const [important, setImportant] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [description, setDescription] = useState("");
  const [listName, setlistName] = useState("");
  const [errors, setErrors] = useState({
    taskTitle: "",
    dueDate: "",
    dueTime: "",
  });
  const [isClicked, setIsClicked] = useState(false);
  const [timeEntered, setTimeEntered] = useState("");
  const dispatch = useDispatch();

  const { isLoading, data, error } = useSelector((state) => {
    return state.tasks;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!taskTitle) {
      errors.taskTitle = "Task Title is required.";
    }

    if (!dueDate) {
      errors.dueDate = "valid Due Time is required.";
    }

    if (!dueTime) {
      errors.dueTime = "Valid Due Time is required.";
    } else {
      const regex = /^(1[0-2]|0?[1-9]):([0-5][0-9])\s?(am|pm)?$/i;
      if (!dueTime.match(regex)) {
        errors.dueTime = "Please enter a valid time in 12:45 AM format.";
      } else {
        const [timeStr, meridiem] = dueTime.split(/\s*(am|pm)?\s*/i);
        const [hoursStr, minutesStr] = dueTime.split(":");
        const hours = parseInt(hoursStr);
        const minutes = parseInt(minutesStr);
        if (
          isNaN(hours) ||
          hours < 1 ||
          hours > 12 ||
          isNaN(minutes) ||
          minutes < 0 ||
          minutes > 59
        ) {
          errors.dueTime = "Please enter a valid time in 12:45 AM format.";
        }
      }
    }

    const dueTime24hr = convertTo24HourFormat({ time: dueTime });

    if (Object.keys(errors).length === 0) {
      console.log(taskID);
      dispatch(
        editTaskbyId({
          id: taskID,
          updatedTask: {
            taskTitle: taskTitle,
            dueDate: dueDate,
            dueTime: dueTime24hr,
            description: description,
            important: important,
            listName,
          },
        })
      );
      handleClose();
    } else {
      setErrors(errors);
    }
  };

  const handleClose = () => {
    setIsClicked(!isClicked);
    setShow(false);
    setTaskTitle("");
    setDueDate("");
    setDueTime("");
    setDescription("");
    setErrors({});
    setImportant(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    switch (name) {
      case "taskTitle":
        setTaskTitle(value);
        break;
      case "description":
        setDescription(value);
        break;
      default:
        break;
    }
  };

  const handleDateChange = (value) => {
    if (moment.isMoment(value)) {
      setDueDate(value.format("DD/MM/YYYY"));
    } else {
      setDueDate("");
    }
  };

  const handleTimeChange = (value) => {
    setDueTime(value);
  };

  const footer = (
    <Modal.Footer>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Update Task
      </Button>
    </Modal.Footer>
  );

  const handleImportantChange = (event) => {
    setImportant(event.target.value);
    setImportant(!important);
  };

  useEffect(() => {
    const task = data.find((task) => task.id === taskID);
    setTaskTitle(task.taskTitle);
    setDueDate(task.dueDate);
    setDueTime(convertTo12HourFormat({ timeString: task.dueTime }));
    setDescription(task.description);
    setImportant(task.important);
    setlistName(task.listName);
  }, []);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log("Sun");
            }}
          >
            <div className="mb-3">
              <label htmlFor="task-title" className="form-label">
                Task Title:
              </label>
              <input
                type="text"
                className="form-control"
                id="task-title"
                name="taskTitle"
                onChange={handleInputChange}
                autocomplete="off"
                value={taskTitle}
              />
              {errors.taskTitle && !taskTitle && (
                <p className="text-danger">{errors.taskTitle}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="due-date" className="form-label">
                Due Date:
              </label>
              <Datetime
                inputProps={{
                  className: "form-control",
                  id: "due-date",
                  name: "dueDate",
                  autocomplete: "off",
                }}
                dateFormat="DD/MM/YYYY"
                timeFormat={false}
                value={dueDate}
                onChange={handleDateChange}
              />
              {errors.dueDate && !dueDate && (
                <p className="text-danger">{errors.dueDate}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="due-date" className="form-label">
                Due Time in 12:45 AM format:
              </label>

              <TimePicker
                className="form-control"
                name="dueDate"
                value={timeEntered || dueTime}
                onChange={handleTimeChange}
                timeFormat="hh:mm A"
              />

              {errors.dueTime && (
                <p className="text-danger">{errors.dueTime}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description:
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                onChange={handleInputChange}
                value={description}
              />
            </div>
            <div class="form-check form-switch mb-3">
              <label class="form-check-label" for="flexSwitchCheckChecked">
                Important Task
              </label>
              <input
                class="form-check-input cursor-pointer"
                type="checkbox"
                id="flexSwitchCheckChecked"
                checked={important}
                onChange={handleImportantChange}
                autocomplete="off"
                value={important}
              />
            </div>
            {footer}
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditTask;
