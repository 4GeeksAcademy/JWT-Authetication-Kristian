import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Login = () => {
    return (
        <div className="d-flex justify-content-center align-items-center my-4 login-form container card">
            <form>
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