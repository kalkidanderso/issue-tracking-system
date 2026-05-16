import { createContext } from "react";

const data = localStorage.getItem("userData");
console.log("===========user data========", data);
export const UserContext = createContext(JSON.parse(data));
