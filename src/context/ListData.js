import { createContext, useState } from "react";
import axios from "axios";

const ListNameContext = createContext();

function ListNameProvider({ children }) {
  const [listNames, setListNames] = useState([]);

  const fetchListNames = async () => {
    const response = await axios.get("http://localhost:3001/listNames");
    setListNames(response.data);
  };

  const createListName = async ({ label, path }) => {
    const response = await axios.post("http://localhost:3001/listNames", {
      label,
      path,
    });

    console.log(response);
    const updatedListNames = [...listNames, response.data];
    setListNames(updatedListNames);
  };

  //   const editbyId = async (id, updatedTask) => {
  //     const response = await axios.put(`http://localhost:3001/data/${id}`, {
  //       ...updatedTask,
  //     });
  //     const updatedData = data.map((task) => {
  //       if (task.id === id) {
  //         return { ...task, ...response.data };
  //       }

  //       return task;
  //     });

  //     console.log(response.data);

  //     setData(updatedData);
  //   };

  //   const deleteTaskById = async (id) => {
  //     await axios.delete(`http://localhost:3001/data/${id}`);

  //     const updatedData = data.filter((task) => {
  //       return task.id !== id;
  //     });

  //     setData(updatedData);
  //   };

  const getListNamebById = (Id) =>
    listNames.find((listName) => listName.id === Id);

  const valueToShare = {
    listNames,
    getListNamebById,
    fetchListNames,
    createListName,
  };

  return (
    <ListNameContext.Provider value={valueToShare}>
      {children}
    </ListNameContext.Provider>
  );
}

export { ListNameProvider };
export default ListNameContext;
