import { Link } from "react-router-dom";

export const UsersNavbar = () => {
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