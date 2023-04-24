import React from "react";
import CreateTask from "../components/CreateTask/CreateTask";

function Home() {
  return (
    <div>
      <div className="intro">
        <h1>Welcome to TO-DO List</h1>
        <p>A new aay to organise your day</p>
      </div>
      <div>
        <CreateTask />
      </div>
    </div>
  );
}

export default Home;
