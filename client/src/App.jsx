import axios from "axios";
import { UserContextProvider } from "./UserContext";
import Routes from "./Routes";

axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3030';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes />
    </UserContextProvider>
  );
}

export default App;
