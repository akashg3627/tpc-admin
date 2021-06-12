// import * as ActionTypes from "../../ActionTypes";
import axios from "axios";
import { baseURL } from "../../../Assets/Data";


// const fetchNotificationRequest = () => ({
// 	type: ActionTypes.NOTIFY_LOADING,
// });
// const notificationsFetched = (notifications) => ({
// 	type: ActionTypes.FETCH_NOTIFY,
// 	payload: notifications,
// });
// const notificationsFailed = (err) => ({
// 	type: ActionTypes.NOTIFY_FAILED,
// 	payload: err,
// });

// export const fetchNotifications = () => {
// 	let token = localStorage.getItem("token");
// 	return function (dispatch) {
// 		dispatch(fetchNotificationRequest());
// 		axios
// 			.get(baseURL + "student/mynotifications", { headers: { "x-auth-token": token } })
// 			.then((response) => {
// 				const res = response.data;
// 				// console.log(res.notifications);
// 				dispatch(notificationsFetched(res.notifications));
// 			})
// 			.catch((error) => {
// 				dispatch(notificationsFailed(error.message));
// 				// alert("Session Expired! Please login to continue...");
// 				dispatch(logout());
// 			});
// 	};
// };



export const postNotificationsBranch = (notifications, togglePost) => {
	let token = localStorage.getItem("token");
	return function (dispatch) {
		console.log("I am here");
		axios
			.post(baseURL + "student/addNotificationBranch", notifications, { headers: { "x-auth-token": token } })
			.then((response) => {
				// console.log(response.data);
				togglePost('1');
			})
			.catch((error) => {
				console.log(error.message);
				togglePost('2');
			});
	};
};

export const postNotificationsArray = (data, togglePost) => {
	let token = localStorage.getItem("token");
	return function (dispatch) {
		// console.log("I am here");

		// data = {
		//    emails: [],
		// 	  subject: "",
		// 	  text: "",
		// };

		axios
			.post(baseURL + "student/addNotificationArray", data, { headers: { "x-auth-token": token } })
			.then((response) => {
				// console.log(response.data);
				togglePost('1');
			})
			.catch((error) => {
				console.log(error.message);
				togglePost('2');
			});
	};
};
