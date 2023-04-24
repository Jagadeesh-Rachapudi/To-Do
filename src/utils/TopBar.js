import { useState } from "react";
import Link from "./Link";
import "./utils.scss";
import CreateNewList from "../components/CreateNewList/CreateNewList";

function Topbar() {
  const [modalShow, setModalShow] = useState(false);

  const links = [
    { label: "Home", path: "/" },
    { label: "All Task", path: "/all" },
  ];

  const renderedLinks = links.map((link) => {
    return (
      <Link
        key={link.label}
        to={link.path}
        className="link mb-3"
        activeClassName="active"
      >
        {link.label}
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
      <div className="flex-grow">{renderedLinks}</div>
      <div className="flex justify-end">
        <button
          type="button"
          class="btn btn-light mb-1 new-list-btn"
          onClick={() => setModalShow(true)}
        >
          New List
        </button>
        <CreateNewList show={modalShow} onHide={() => setModalShow(false)} />
      </div>
    </div>
  );
}

export default Topbar;
