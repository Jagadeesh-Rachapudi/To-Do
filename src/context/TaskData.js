import { createContext, useState } from "react";
import axios from "axios";

const TaskContext = createContext();

function Provider({ children }) {
  const [data, setData] = useState([]);

  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:3001/data");
    setData(response.data);
  };

  const createTask = async ({
    taskTitle,
    dueDate,
    dueTime,
    description,
    important,
  }) => {
    const response = await axios.post("http://localhost:3001/data", {
      taskTitle,
      dueDate,
      dueTime,
      description,
      completed: true,
      important,
    });

    const updatedData = [...data, response.data];
    setData(updatedData);
  };

  const editTaskbyId = async (id, updatedTask) => {
    const response = await axios.put(
      `http://localhost:3001/data/${id}`,
      updatedTask
    );

    const updatedData = data.map((task) => {
      if (task.id === id) {
        return { ...task, ...response.data };
      }

      return task;
    });

    setData(updatedData);
  };

  const deleteTaskById = async (id) => {
    await axios.delete(`http://localhost:3001/data/${id}`);

    const updatedData = data.filter((task) => {
      return task.id !== id;
    });

    setData(updatedData);
  };

  const valueToShare = {
    data,
    fetchTasks,
    createTask,
    editTaskbyId,
    deleteTaskById,
  };

  return (
    <TaskContext.Provider value={valueToShare}>{children}</TaskContext.Provider>
  );
}

export { Provider };
export default TaskContext;
