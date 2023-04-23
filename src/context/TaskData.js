import { createContext, useState } from "react";
import axios from "axios";

const TaskContext = createContext();

function Provider({ children }) {
  const [data, setData] = useState([]);

  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:3001/data");
    setData(response.data);
  };

  //   const editTaskbyId = async (id, newTitle) => {
  //     const response = await axios.put(`http://localhost:3001/books/${id}`, {
  //       title: newTitle,
  //     });

  //     const updatedBooks = books.map((book) => {
  //       if (book.id === id) {
  //         return { ...book, ...response.data };
  //       }

  //       return book;
  //     });

  //     setBooks(updatedBooks);
  //   };

  //   const deleteBookById = async (id) => {
  //     await axios.delete(`http://localhost:3001/books/${id}`);

  //     const updatedBooks = books.filter((book) => {
  //       return book.id !== id;
  //     });

  //     setBooks(updatedBooks);
  //   };

  const createdTaskdata = {
    taskTitle: "Jagadeesh",
    dueDate: "25/04/2023",
    dueTime: "17:00",
    description: "Jagxy",
    completed: false,
    important: true,
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

  const valueToShare = {
    data,
    fetchTasks,
    createTask,
  };

  return (
    <TaskContext.Provider value={valueToShare}>{children}</TaskContext.Provider>
  );
}

export { Provider };
export default TaskContext;
