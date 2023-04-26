import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../pages/user-login/actions/user-login.actions";

export const Auth = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            navigate("/");
        } else {
            dispatch(loginUser({ username: user.username }));
        }
    }, []);

    return children;
}