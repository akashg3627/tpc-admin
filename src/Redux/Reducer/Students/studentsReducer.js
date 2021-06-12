import * as ActionTypes from "../../ActionTypes";
import axios from "axios";
import { logout } from '../User/userReducer';
import { baseURL } from "../../../Assets/Data";

const fetchStudentsRequest = () => ({
	type: ActionTypes.STUDENTS_LOADING,
});
const studentsFetched = (students) => ({
	type: ActionTypes.FETCH_STUDENTS,
	payload: students,
});
const studentsFailed = (err) => ({
	type: ActionTypes.STUDENTS_FAILED,
	payload: err,
});

export const fetchStudents = () => {
	let token = localStorage.getItem("token");
	return function (dispatch) {
		dispatch(fetchStudentsRequest());
		axios
			.get(baseURL + "student/", { headers: { "x-auth-token": token } })
			.then((response) => {
				const res = response.data;
				dispatch(studentsFetched(res.students));
				// console.log("res", response);
			})
			.catch((error) => {
				dispatch(studentsFailed(error.message));
				// alert("Session Expired! Please login to continue...");
				dispatch(logout());
			});
	};
};

export const postStudent = (student, togglePost) => {
	let token = localStorage.getItem("token");
	return function (dispatch) {
		axios
			.post(baseURL + "student/addOne", student, { headers: { "x-auth-token": token } })
			.then((response) => {
				// console.log(response.data);
				dispatch(fetchStudents());
				togglePost('1');
			})
			.catch((error) => {
				console.log(error.message);
				togglePost('2');
			});
	};
};
export const updateStudent = (id, student, togglePost) => {
	let token = localStorage.getItem("token");
	return function (dispatch) {
		axios
			.put(baseURL + "student/update/" + id, student, { headers: { "x-auth-token": token } })
			.then((response) => {
				// console.log(response.data);
				dispatch(fetchStudents());
				togglePost('1');
			})
			.catch((error) => {
				console.log(error.message);
				togglePost('2');
			});
	};
};

export const deleteStudent = (id) => {
	let token = localStorage.getItem("token");
	return function (dispatch) {
		axios
			.delete(baseURL + "student/delete/" + id, { headers: { "x-auth-token": token } })
			.then((response) => {
				// console.log(response.data);
				dispatch(fetchStudents());
			})
			.catch((error) => {
				console.log(error.message);
			});
	};
};

export const addMultipleStudents = (data, togglePost) => {
	let token = localStorage.getItem("token");
	return function (dispatch) {
		console.log("I am here");

		axios
			.post(baseURL + "student/addMany", data, { headers: { "x-auth-token": token } })
			.then((response) => {
				// console.log(response.data);
				dispatch(fetchStudents());
				togglePost('1');
			})
			.catch((error) => {
				console.log(error.message);
				togglePost('2');
			});
	};
};
