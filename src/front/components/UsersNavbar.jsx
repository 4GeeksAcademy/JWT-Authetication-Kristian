import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const UsersNavbar = () => {
    const { dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: "logout" });
        navigate("/");
    };

    return (
        <nav className="navbar navbar-color">
            <div className="container">
                <Link to="/">
                    <span className="mb-0 h3 navbar-color">React Boilerplate</span>
                </Link>
                <div className="ml-auto">
                    <button className="btn btn-danger m-2" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </nav>
    );
};