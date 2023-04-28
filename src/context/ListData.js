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

    const updatedListNames = [...listNames, response.data];
    setListNames(updatedListNames);
  };

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
