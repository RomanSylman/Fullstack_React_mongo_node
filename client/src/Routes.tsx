import RegistrationAndLogin from "./components/Registration/Registration";
import {useContext} from "react";
import {UserContext} from "./UserContext";

export default function Routes() {
    const {username, id} = useContext(UserContext);

    if (username) {
        return "logged in " + username;
    }

    return (
        <RegistrationAndLogin />
    );
}