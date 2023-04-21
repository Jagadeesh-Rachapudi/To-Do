import React from "react";
import Task from "../Task/Task";
import "./TaskList.scss";
import useTasksContext from "../../hooks/use-task-context";

function TaskList() {
  const { data } = useTasksContext();

  // const data2 = [
  //   {
  //     id: 1,
  //     taskTitle: "Task 1",
  //     completed: false,
  //     important: false,
  //     details: [
  //       {
  //         reminder: true,
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     taskTitle: "Task 2Task 2Task 2Task 2Task 2Task 2Task 2Task 2Task 2Task ",
  //     completed: false,
  //     important: false,
  //     details: [
  //       {
  //         reminder: true,
  //       },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     taskTitle: "Task 3",
  //     completed: false,
  //     important: false,
  //     details: [
  //       {
  //         reminder: true,
  //       },
  //     ],
  //   },
  //   {
  //     id: 4,
  //     taskTitle: "Task 4Task 4",
  //     completed: false,
  //     important: false,
  //     details: [
  //       {
  //         reminder: true,
  //         dueDate: new Date("April 21, 2023  18:45:41"),
  //       },
  //     ],
  //   },
  // ];

  const renderTasks = data.map(
    ({
      id,
      taskTitle,
      dueDate,
      dueTime,
      description,
      completed,
      important,
    }) => {
      console.log(taskTitle);
      return (
        <Task
          id={id}
          taskTitle={taskTitle}
          dueDate={dueDate}
          dueTime={dueTime}
          description={description}
          completed={completed}
          important={important}
          details={details}
        />
      );
    }
  );
  // console.log(tasks.length);
  return <div className="taskList">{renderTasks}</div>;
}

export default TaskList;
