import React, { useState } from "react";
import { ToastContainer } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import "./Notification.scss";
import useTasksContext from "../../hooks/use-task-context";

function Notification({
  onComplete,
  id,
  taskTitle,
  dueDate,
  dueTime,
  description,
  completed,
  important,
  showNoti,
}) {
  const [show, setShow] = useState({ showNoti });
  const { editTaskbyId } = useTasksContext();
  const handleUpdateCompelete = () => {
    onComplete();
  };

  const handleTimeChange = (hours) => {
    const [day, month, year] = dueDate.split("/");
    const dateObject = new Date(`${month}/${day}/${year}`);

    let updatedTime = "";
    const [hoursStr, minutesStr] = dueTime.split(":");

    let updatedHours = Number(hoursStr) + hours;

    if (updatedHours >= 24) {
      updatedHours -= 24;
      let updatedDate = new Date(dateObject.getTime() + 24 * 60 * 60 * 1000);
      updatedDate = updatedDate.toLocaleDateString("en-GB");

      updatedTime = updatedHours + ":" + minutesStr;

      editTaskbyId(id, {
        taskTitle,
        dueDate: updatedDate,
        dueTime: updatedTime,
        description,
        important,
        completed: false,
      });
    } else {
      updatedTime = updatedHours + ":" + minutesStr;
      editTaskbyId(id, {
        taskTitle,
        dueDate,
        dueTime: updatedTime,
        description,
        important,
        completed: false,
      });
    }
  };

  return (
    <Row className="notifications" >
      <Col xs={6}>
        <ToastContainer position="bottom-start">
          <Toast
            onClose={() => setShow(false)}
            show={show}
            bg="dark"
            className="ms-3 mb-3"
          >
            <Toast.Header>
              <strong className="me-auto">{taskTitle}</strong>
            </Toast.Header>
            <Toast.Body className=" links d-flex justify-content-between">
              <a className="text-white link" onClick={handleUpdateCompelete}>
                Complete Now
              </a>
              <a
                className="text-white link"
                onClick={() => {
                  handleTimeChange(1);
                }}
              >
                Snooze 1Hr
              </a>
              <a
                className="text-white link me-1"
                onClick={() => {
                  handleTimeChange(2);
                }}
              >
                Snooze 2Hr
              </a>
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </Col>
      <Col xs={6}>
        {/* <Button onClick={() => setShow(true)}>Show Toast</Button> */}
      </Col>
    </Row>
  );
}

export default Notification;
