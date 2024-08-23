import axios from "axios";
import "./App.css";
import { UserContextProvider } from "./UserContext";
import Routes from "./Routes";

function App() {
  axios.defaults.baseURL = "http://localhost:3030";
  axios.defaults.withCredentials = true;

  return (
    <>
      <UserContextProvider>
        <Routes/>
      </UserContextProvider>
    </>
  );
}

export default App;
