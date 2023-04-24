import { useContext } from "react";
import ListNameContext from "../context/ListData";

export default function useListName() {
  return useContext(ListNameContext);
}
