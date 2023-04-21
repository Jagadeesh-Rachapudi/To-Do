import React, { useState } from "react";
import { ToastContainer } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";

function Notification({ taskTitle, showNoti }) {
  const [show, setShow] = useState({ showNoti });

  return (
    <Row>
      <Col xs={6}>
        <ToastContainer position="bottom-start">
          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={10000}
            autohide
          >
            <Toast.Header>
              <strong className="me-auto">{taskTitle}</strong>
            </Toast.Header>
            <Toast.Body className="d-flex justify-content-between">
              <a>Complete Now</a>
              <a>Snooze 1Hr</a>
              <a>Snooze 2Hr</a>
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
