import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

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
                    <label for="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="d-flex justify-content-center">
                    <Link to="/usershome">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </Link>
                </div>
            </form>
        </div>
    )
}