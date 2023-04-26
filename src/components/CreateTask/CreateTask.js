import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import "./CreateTask.scss";
import { CgMathPlus } from "react-icons/cg";
import { addTask } from "../../store";
import TimePicker from "./TimePicker.js";
import { convertTo24HourFormat } from "../../utils/commonFunctions";
import useNavigation from "../../hooks/useNavigation";
import { useThunk } from "../../hooks/use-thunk";

function CreateTask({ showModel = false }) {
  const [show, setShow] = useState(false);
  const [important, setImportant] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({
    taskTitle: "",
    dueDate: "",
    dueTime: "",
  });
  const [isClicked, setIsClicked] = useState(false);
  const [doAddTask, isAddingTask] = useThunk(addTask);
  const [timeEntered, setTimeEntered] = useState("");
  const { currentPath } = useNavigation();

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

  const handleSubmit = async (e) => {
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
        errors.dueTime = "Please enter a valid time in HH:MM:AM/PM format.";
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
          errors.dueTime = "Please enter a valid time in HH:MM:AM/PM format.";
        }
      }
    }

    const dueTime24hr = convertTo24HourFormat({ time: dueTime });

    if (Object.keys(errors).length === 0) {
      await doAddTask({
        taskTitle,
        dueDate,
        dueTime: dueTime24hr,
        description,
        important,
        listName: currentPath,
      });

      handleClose();
    } else {
      setErrors(errors);
    }
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
        Create Task
      </Button>
    </Modal.Footer>
  );

  const handleToggle = () => {
    setIsClicked(!isClicked);
    setShow(!show);
  };

  const handleImportantChange = (event) => {
    setImportant(event.target.value);
    setImportant(!important);
  };

  return (
    <>
      <button
        className={`create-button ${isClicked ? "clicked" : ""}`}
        onClick={handleToggle}
      >
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <CgMathPlus className="text-black text-5xl" />
          </div>
        </div>
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Adding new task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
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
            {/* <div className="mb-3">
              <label htmlFor="due-time" className="form-label">
                Due Time:
              </label>
              <Datetime
                inputProps={{
                  className: "form-control",
                  id: "due-time",
                  name: "dueTime",
                }}
                dateFormat={false}
                timeFormat="hh:mm A"
                value={dueTime}
                onChange={handleTimeChange}
              />
              
            </div> */}
            <div className="mb-3">
              <label htmlFor="due-date" className="form-label">
                Due Time in 12:45 AM format:
              </label>
              {/* <DatePicker
                id="due-date"
                name="dueDate"
                value={dueTime}
                onChange={handleTimeChange}
                showTimeSelect
                timeFormat="HH:mm"
                dateFormat="MM/DD/YYYY HH:mm"
              /> */}
              <TimePicker
                className="form-control"
                name="dueDate"
                value={timeEntered}
                onChange={handleTimeChange}
                timeFormat="hh:mm A"
              />

              {errors.dueTime && !dueTime && (
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
              />
            </div>
            {footer}
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreateTask;
