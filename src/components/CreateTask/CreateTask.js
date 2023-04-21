import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";

function CreateTask() {
  const [show, setShow] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({
    taskTitle: "",
    dueDate: "",
    dueTime: "",
  });

  const handleClose = () => {
    setShow(false);
    setTaskTitle("");
    setDueDate("");
    setDueTime("");
    setDescription("");
    setErrors({});
  };
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!taskTitle) {
      errors.taskTitle = "Task Title is required.";
    }
    if (!dueDate) {
      errors.dueDate = "valid Due Date is required.";
    }
    if (!dueTime) {
      errors.dueTime = "valid Due Time is required.";
    }
    console.log(JSON.stringify(errors.taskTitle));
    if (Object.keys(errors).length === 0) {
      console.log(dueTime);
      console.log(dueDate);
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
    if (moment.isMoment(value)) {
      setDueTime(value.format("HH:mm"));
    } else {
      setDueTime("");
    }
  };

  const footer = (
    <Modal.Footer>
      <Button variant="primary" onClick={handleSubmit}>
        Create Task
      </Button>
    </Modal.Footer>
  );

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
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
                }}
                dateFormat="DD/MM/YYYY"
                timeFormat={false}
                value={dueDate}
                onChange={handleDateChange}
              />
              {errors.dueTime && !dueTime && (
                <p className="text-danger">{errors.dueTime}</p>
              )}
            </div>
            <div className="mb-3">
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
                value={dueTime}
                onChange={handleTimeChange}
              />
              {errors.dueDate && !dueDate && (
                <p className="text-danger">{errors.dueDate}</p>
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
            {footer}
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreateTask;
