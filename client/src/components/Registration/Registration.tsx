import { useContext, useState } from "react";
import "./Registration.css";
import axios from "axios";
import { UserContext } from "../../UserContext";

function Registration() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);

  async function register(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { data } = await axios.post("/register", {
      username,
      email,
      password,
    });
    setLoggedInUsername(username);
    setId(data.id);
  }

  return (
    <>
      <form className="form" onSubmit={register}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
          className="form__input"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="your@mail"
          className="form__input"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
          className="form__input"
        />
        <button className="form__button">Register</button>
      </form>
    </>
  );
}

export default Registration;
