import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import useListName from "../../hooks/use-listName-context";

function CreateNewList(props) {
  const [listName, setListName] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const { createListName } = useListName();
  const [Label, setLabel] = useState("");

  const handleListNameChange = (event) => {
    setListName(event.target.value);
    setShowWarning(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!listName) {
      setShowWarning(true);
    } else {
      props.onHide();
      console.log(listName.split(" ")[0]);
      createListName({
        label: listName.split(" ")[0],
        path: "/" + listName.split(" ")[0].toLocaleLowerCase(),
      });
      setListName("");
    }
  };

  const footer = (
    <Modal.Footer>
      <button
        onClick={handleSubmit}
        class="new-list-btn btn btn-light mb-1"
        type="submit"
        style={{ color: "black" }}
      >
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
          <Form.Group controlId="formListName" className="mb-3">
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
