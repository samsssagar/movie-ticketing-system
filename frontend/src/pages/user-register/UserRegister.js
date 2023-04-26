import { useState } from "react";
import "./UserRegister.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const UserRegisterScreen = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid email address.");
            return;
        }
        // Submit form data
        axios.post(`${process.env.BASE_URL}/user`, {
            "username": username,
            "email": email,
            "password": password,
            "isAdmin": false
        }).then(() => {
            navigate("/user-login")
        })
        console.log(`Username: ${username}\nEmail: ${email}\nPassword: ${password}`);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError("");
    };

    return (
        <div className="container d-flex align-items-center vh-100">
            <div className="card p-5 mx-auto">
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" value={email} onChange={handleEmailChange} className={emailError ? "form-control is-invalid" : "form-control"} required />
                        {emailError && <div className="invalid-feedback">{emailError}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
}
