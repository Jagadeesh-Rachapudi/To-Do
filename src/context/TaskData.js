import { createContext, useState } from "react";
import axios from "axios";

const TaskContext = createContext();

function Provider({ children }) {
  const [data, setTasks] = useState([]);

  const fetchTasks = async () => {
    console.log("hello");
    const response = await axios.get("http://localhost:3001/data");
    setTasks(response.data);
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

  // const createBook = async (title) => {
  //     const response = await axios.post("http://localhost:3001/books", {
  //       title,
  //     });

  //     const updatedBooks = [...books, response.data];
  //     setBooks(updatedBooks);
  //   };

  const valueToShare = {
    data,
    fetchTasks,
  };

  return (
    <TaskContext.Provider value={valueToShare}>{children}</TaskContext.Provider>
  );
}

export { Provider };
export default TaskContext;
