import RegistrationAndLogin from "./components/Registration/Registration";
import {useContext} from "react";
import {UserContext} from "./UserContext";
import ChatPage from "./components/ChatPage/ChatPage";

export default function Routes() {
    const {username, id} = useContext(UserContext);

    if (username) {
        return <ChatPage/>
    }

    return (
        <RegistrationAndLogin />
    );
}