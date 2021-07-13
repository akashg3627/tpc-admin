//pkg
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
// import { authContext } from '../../App';
import Login from "../Login/Login";
import Home from "../Home/Home";
import { useSelector } from "react-redux";

//files
import Header from "../Header/Header";
import JobComponent from "../Jobs/JobComponent";
import NotificationsComponent from "../Notifications/NotificationsComponent";
// import CalendarComponent from '../Calendar/CalendarComponent';
import StudentsComponent from "../Students/StudentsComponent";
import CalendarComponent from "../Calendar/CalendarComponent";
//extra comp

function PrivateRoute({ children, ...rest }) {
	let isAuth = useSelector((state) => state.user.isAuth);
	let isAdmin = useSelector((state) => state.user.isAdmin);
	return (
		<Route
			{...rest}
			render={({ location }) =>
				isAuth && isAdmin ? (
					children
				) : (
					<Redirect
						to={{
							pathname: "/login",
							state: { from: location },
						}}
					/>
				)
			}
		/>
	);
}

function Main(props) {
	let isAuth = useSelector((state) => state.user.isAuth);
	let isAdmin = useSelector((state) => state.user.isAdmin);
	return (
		<>
			{isAuth && isAdmin ? <Header /> : null}
			<Switch>
				<Route path="/login" component={Login} />
				<PrivateRoute exact path="/home">
					<Home />{" "}
				</PrivateRoute>
				<PrivateRoute exact path="/notifications">
					<NotificationsComponent />
				</PrivateRoute>
				{/* <PrivateRoute exact path="/calendar">
						<CalendarComponent /> 
					</PrivateRoute> */}
				<PrivateRoute exact path="/jobs/:id">
					<JobComponent />
				</PrivateRoute>
				<PrivateRoute exact path="/students">
					<StudentsComponent />
				</PrivateRoute>
				<PrivateRoute exact path="/calendar">
					<CalendarComponent />
				</PrivateRoute>
				<Redirect to="/home" />
			</Switch>
		</>
	);
}

export default Main;
