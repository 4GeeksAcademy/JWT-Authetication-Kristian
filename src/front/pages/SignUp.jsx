import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const SignUp = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form data to be sent:", formData);

        try {
            console.log("Form data to be sent:", formData);
            console.log("Backend URL:", backendUrl);
            const resp = await fetch(backendUrl + "/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await resp.json();

            if (resp.ok) {
                alert("Registration successful!");
                navigate("/login");
            } else {
                alert(data.message || "Registration failed! Please try again..");
            }
        } catch (err) {
            console.error("Server error while registering:", err);
            alert("Server error! Registration could not be completed..");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center my-4">
            <form className="container card" style={{ width: "100%", maxWidth: "800px" }} onSubmit={handleSubmit}>
                <div className="row mt-2">
                    <div className="col-6">

                        <label htmlFor="inputEmail4" className="form-label">Email</label>
                        <input type="email" name="email" className="form-control" id="inputEmail4" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="col-6">
                        <label htmlFor="inputPassword4" className="form-label">Password</label>
                        <input type="password" name="password" className="form-control" id="inputPassword4" value={formData.password} onChange={handleChange} />
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-6">
                        <label htmlFor="inputFullName" className="form-label">Full Name</label>
                        <input type="text" name="name" className="form-control" id="inputFullName" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="col-6">
                        <label htmlFor="inputPhone" className="form-label">Phone</label>
                        <input type="text" name="phone" className="form-control" id="inputPhone" value={formData.phone} onChange={handleChange} />
                    </div>
                </div>
                <div className="col-12 my-2 d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary">Sign up</button>
                </div>
            </form>
        </div>
    )
}