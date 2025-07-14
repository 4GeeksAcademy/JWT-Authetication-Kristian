import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const Login = () => {
    const navigate = useNavigate();
    const { dispatch } = useGlobalReducer();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginFailed, setLoginFailed] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${backendUrl}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            if (!res.ok) {
                setLoginFailed(true);
                return;
            }

            const data = await res.json();


            if (!data.access_token || data.access_token.split('.').length !== 3) {
                throw new Error("Invalid JWT token received from server");
            }

            dispatch({
                type: "login_success",
                payload: {
                    token: data.access_token,
                    user: data.user
                }
            });


            localStorage.setItem("token", data.access_token);
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate("/users/usershome");

        } catch (err) {
            console.error("Login error:", err);
            setLoginFailed(true);

            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
    };



    return (
        <div className="d-flex justify-content-center align-items-center my-4 login-form container card">
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input
                        className="form-control"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input
                        className="form-control"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}