import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './UserLoginScreen.css';
import { Link } from 'react-router-dom';
import { loginUser } from './actions/user-login.actions';

const UserLoginScreen = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(loginUser({ username: username, password: password })).then((res) => {
            const userDetails = JSON.stringify(
                {
                    "email": res.payload.email,
                    "access_token": res.payload.access_token,
                }
            )
            localStorage.setItem("user", userDetails);
            alert("Login successful");
        });
    };

    return (
        <div className="container d-flex align-items-center vh-100">
            <div className="card p-5 mx-auto">
                <h1>User Login</h1>
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            // className={`form-control ${emailError ? 'is-invalid' : ''}`}
                            id="username"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {/* {emailError && (
                            <div className="invalid-feedback">{emailError}</div>
                        )} */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                    <p>Don't have an account yet? <Link to="/user-register">Register</Link></p>
                </form>
            </div>
        </div>
    );
};

export default UserLoginScreen;
