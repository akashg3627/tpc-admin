import React from 'react';
import GoogleLogin from "react-google-login";

//files
import './Login.css';
// import {authContext} from '../../App';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { login } from '../../Redux/Reducer/User/userReducer';


function Login(props) {
	// let auth = useContext(authContext);
	let history = useHistory();
	let dispatch = useDispatch();

	let handleLogin = (res) => {
		// console.log(res);
		if (res.tokenId) {
			dispatch(login(res.tokenId, history));
		}
	};

	return (
		<div id="loginContainer">
			<div id="loginCard">
				<p>LogIn with your Institute Id</p>
				<GoogleLogin
					clientId="426765416256-u16jr867e7ucq9q3s6vg64a89oice4q6.apps.googleusercontent.com"
					buttonText="LogIn with Google"
					onSuccess={handleLogin}
					onFailure={handleLogin}
					className="googleBtn"
					scope="profile email"
					icon={true}
				/>
			</div>
		</div>
	);
}

export default Login;