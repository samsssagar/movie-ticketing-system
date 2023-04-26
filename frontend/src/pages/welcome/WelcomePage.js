import { useNavigate } from "react-router-dom";
import "./WelcomePage.css";

export const WelcomeScreen = () => {
    const navigate = useNavigate();

    const onLoginUser = () => {
        navigate("/user-login");
    }

    const onLoginAdmin = () => {
        navigate("/admin-login");
    }

    return (
        <div className="welcome-screen">
            <h1>Welcome to the Movie Ticket Application!</h1>
            <p>Please select your role:</p>
            <button onClick={onLoginUser}>Login as User</button>
            <button onClick={onLoginAdmin}>Login as Admin</button>
        </div>
    );
}
