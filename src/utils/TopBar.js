import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Link from "./Link";
import "./utils.scss";
import CreateNewList from "../components/CreateNewList/CreateNewList";
import useListName from "../hooks/use-listName-context";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useSelector } from "react-redux";

function Topbar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [modalShow, setModalShow] = useState(false);

  const { listNamesData } = useSelector((state) => {
    return {
      listNamesData: state.listNames.listNamesData,
    };
  });

  const renderedLinks = listNamesData.map((listName) => {
    return (
      <Link
        key={listName.label}
        to={listName.path}
        className="link mb-3"
        activeClassName="active"
      >
        {listName.label}
      </Link>
    );
  });

  return (
    <div
      className="topbar flex justify-between items-center px-4 py-3"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        backgroundColor: "white",
        boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className="flex-grow d-none d-lg-block ">{renderedLinks}</div>

      <div className="button-box">
        <button
          className="btn btn-light new-list-btn d-block d-lg-none"
          style={{
            maxHeight: "40px",
            paddingBottom: "40px !important",
          }}
          onClick={handleShow}
        >
          <AiOutlineMenu />
        </button>
        {/* <button
          type="button"
          className={`btn btn-light mb-1 new-list-btn ${
            listNamesData.length <= 77 ? "" : "disabled-btn"
          }`}
          onClick={() => setModalShow(true)}
        >
          New List
        </button> */}
      </div>

      {listNamesData.length <= 77 ? (
        <CreateNewList show={modalShow} onHide={() => setModalShow(false)} />
      ) : null}
      <div>
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>All Lists</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="menu-flex-grow">{renderedLinks}</div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </div>
  );
}

export default Topbar;
