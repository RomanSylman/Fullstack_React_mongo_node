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
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [id, setId] = useState(localStorage.getItem("id") || "");
  useEffect(() => {
    if (!username || !id) {
      axios.get("/profile").then(response => {
        setUsername(response.data.username);
        setId(response.data.id);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("id", response.data.id);
      }).catch(() => {
        
      });
    }
  }, [username, id]);

  return (
    <UserContext.Provider value={{ username, setUsername, id, setId }}>
      {children}
    </UserContext.Provider>
  );
}