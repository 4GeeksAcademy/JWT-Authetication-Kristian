import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const SignUp = () => {
    return (
        <div className="d-flex justify-content-center align-items-center my-4">
            <form className="container card" style={{ width: "100%", maxWidth: "800px" }}>
                <div className="row mt-2">
                    <div className="col-6">

                        <label htmlFor="inputEmail4" className="form-label">Email</label>
                        <input type="email" name="email" className="form-control" id="inputEmail4" />
                    </div>
                    <div className="col-6">
                        <label htmlFor="inputPassword4" className="form-label">Password</label>
                        <input type="password" name="password" className="form-control" id="inputPassword4" />
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-6">
                        <label htmlFor="inputFullName" className="form-label">Full Name</label>
                        <input type="text" name="name" className="form-control" id="inputFullName" />
                    </div>
                    <div className="col-6">
                        <label htmlFor="inputPhone" className="form-label">Phone</label>
                        <input type="tel" name="phone" className="form-control" id="inputPhone" />
                    </div>
                </div>
                <div className="col-12 my-2 d-flex justify-content-center">
                    <Link to="/login">
                        <button type="submit" className="btn btn-primary">Sign up</button>
                    </Link>
                </div>
            </form>
        </div>
    )
}