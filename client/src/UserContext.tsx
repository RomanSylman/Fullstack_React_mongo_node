import { createContext, useEffect, useState } from "react";
import axios from "axios";

interface UserContextType {
  username: string;
  setUsername: (username: string) => void;
  id: string;
  setId: (id: string) => void;
}

export const UserContext = createContext<UserContextType>({
  username: "",
  setUsername: () => {},
  id: "",
  setId: () => {},
});

export function UserContextProvider({ children }: any) {
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  useEffect(() => {
    axios.get("/profile").then(response => {
      setUsername(response.data.username);
      setId(response.data.id);
      console.log(response.data);
      
    })
  }, [])

  return (
    <UserContext.Provider value={{ username, setUsername, id, setId }}>
      {children}
    </UserContext.Provider>
  );
}