import { useContext, useState } from "react";
import "./Registration.css";
import axios from "axios";
import { UserContext } from "../../UserContext";

function RegistrationAndLogin() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoginRegister, setIsLoginRegister] = useState("register");
  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const url = isLoginRegister === "register" ? "/register" : "/login";
    const { data } = await axios.post(url, {
      username,
      email,
      password,
    });
    setLoggedInUsername(username);
    setId(data.id);
  }

  return (
    <>
      <form className="form" onSubmit={ handleSubmit }>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
          className="form__input"
        />
        {isLoginRegister === "register" && (
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email"
            className="form__input"
          />
        )}
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
          className="form__input"
        />
        <button className="form__button">
          {isLoginRegister === "register" ? "Register" : "Login"}
        </button>
        <p>
          {isLoginRegister === "register"
            ? "Already have an account?"
            : "Don't have an account?"}
          <button
            onClick={() =>
              setIsLoginRegister(
                isLoginRegister === "register" ? "login" : "register"
              )
            }
            style={{ marginLeft: "5px" }}
          >
            {isLoginRegister === "register" ? "Login" : "Register"}
          </button>
        </p>
      </form>
    </>
  );
}

export default RegistrationAndLogin;
