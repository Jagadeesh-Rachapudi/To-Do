import { createContext, useState } from "react";
import axios from "axios";

const TaskContext = createContext();

function TaskPovider({ children }) {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:3001/tasks");
    setTasks(response.data);
  };

  const createTask = async ({
    taskTitle,
    dueDate,
    dueTime,
    description,
    important,
    listName,
  }) => {
    const response = await axios.post("http://localhost:3001/tasks", {
      taskTitle,
      dueDate,
      dueTime,
      description,
      completed: false,
      important,
      listName,
    });

    const updatedTasks = [...tasks, response.data];
    setTasks(updatedTasks);
  };

  const editTaskbyId = async (id, updatedTask) => {
    const response = await axios.put(`http://localhost:3001/tasks/${id}`, {
      ...updatedTask,
    });
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, ...response.data };
      }

      return task;
    });

    setTasks(updatedTasks);
  };

  const deleteTaskById = async (id) => {
    await axios.delete(`http://localhost:3001/tasks/${id}`);

    const updatedtasks = tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(updatedtasks);
  };

  const getTaskById = (Id) => tasks.find((task) => task.id === Id);

  const valueToShare = {
    tasks,
    fetchTasks,
    createTask,
    editTaskbyId,
    deleteTaskById,
    getTaskById,
  };

  return (
    <TaskContext.Provider value={valueToShare}>{children}</TaskContext.Provider>
  );
}

export { TaskPovider };
export default TaskContext;
