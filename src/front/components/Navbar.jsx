import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-color">
			<div className="container">
				<Link to="/">
					<span className="mb-0 h3 navbar-color">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/signup">
						<button className="btn btn-primary m-2">Sign Up</button>
					</Link>
					<Link to="/login">
						<button className="btn btn-primary">Login</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};