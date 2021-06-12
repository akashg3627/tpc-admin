import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { authContext } from "../../App";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from "reactstrap";
import "./Header.css";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/Reducer/User/userReducer";

function Header(props) {
	// let auth = useContext(authContext);

	const dispatch = useDispatch();
	const [collapsed, setCollapsed] = useState(true);

	const toggleNavbar = () => setCollapsed(!collapsed);

	return (
		<Navbar className="header" expand="md" dark>
			<div className="container-fluid" style={{ padding: "5px 20px" }}>
				<NavbarBrand href="/" className="mr-auto spLink">
					The Placement Cell : Admin
				</NavbarBrand>
				<NavbarToggler onClick={toggleNavbar} className="mr-2" />
				<Collapse isOpen={!collapsed} navbar>
					<Nav navbar>
						<NavItem>
							<Link to="/home">JOBS</Link>
						</NavItem>
						<NavItem>
							<Link to="/students">STUDENTS</Link>
						</NavItem>
						<NavItem>
							<Link to="/notifications">NOTIFICATIONS</Link>
						</NavItem>


						<NavItem>
							<Link
								to="/login"
								style={{ cursor: "pointer" }}
								onClick={() => {
									dispatch(logout());
								}}
							>
								LOGOUT
							</Link>
						</NavItem>
					</Nav>
				</Collapse>
			</div>
		</Navbar>
	);
}

export default Header;
