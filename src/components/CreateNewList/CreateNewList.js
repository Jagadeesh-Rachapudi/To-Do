import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function CreateNewList(props) {
  const [listName, setListName] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  const handleListNameChange = (event) => {
    setListName(event.target.value);
    setShowWarning(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!listName) {
      setShowWarning(true);
      return;
    }
    console.log(listName);
    props.onHide();
    setListName("");
  };

  const footer = (
    <Modal.Footer>
      <button onClick={props.onHide} class="btn btn-light mb-1 new-list-btn">
        Add List
      </button>
    </Modal.Footer>
  );

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{
        maxWidth: "500px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create New List
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formListName">
            <Form.Label>List Name</Form.Label>
            <Form.Control
              type="text"
              value={listName}
              onChange={handleListNameChange}
              placeholder="Enter list name"
              isInvalid={showWarning}
              autocomplete="off"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a list name.
            </Form.Control.Feedback>
          </Form.Group>
          {footer}
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CreateNewList;
