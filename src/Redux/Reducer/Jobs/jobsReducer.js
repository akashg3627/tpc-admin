import * as ActionTypes from "../../ActionTypes";
import axios from "axios";
import { logout } from '../User/userReducer';
import { baseURL } from "../../../Assets/Data";


const fetchJobsRequest = () => ({
	type: ActionTypes.JOBS_LOADING,
});
const jobsFetched = (jobs) => ({
	type: ActionTypes.FETCH_JOBS,
	payload: jobs,
});
const jobsFailed = (err) => ({
	type: ActionTypes.JOBS_FAILED,
	payload: err,
});

export const fetchAdminJobs = () => {
	let token = localStorage.getItem("token");
	return function (dispatch) {
		dispatch(fetchJobsRequest());
		axios
			.get(baseURL + "job/", { headers: { "x-auth-token": token } })
			.then((response) => {
				const res = response.data;
				dispatch(jobsFetched(res.jobs));
			})
			.catch((error) => {
				dispatch(jobsFailed(error.message));
				// alert("Session Expired! Please login to continue...");
				dispatch(logout());
			});
	};
};


export const postJob = (job, togglePost) => {
	let token = localStorage.getItem("token");
	return function (dispatch) {
		axios
			.post(baseURL + "job/add", job, { headers: { "x-auth-token": token } })
			.then((response) => {
				// console.log(response.data);
				dispatch(fetchAdminJobs());
				togglePost('1');
			})
			.catch((error) => {
				console.log(error.message);
				togglePost('2');
			});
	};
};
export const updateJob = (id, body, togglePost) => {
	let token = localStorage.getItem("token");
	return function (dispatch) {
		axios
			.put(baseURL + "job/update/" + id, body, { headers: { "x-auth-token": token } })
			.then((response) => {
				// console.log(response.data);
				dispatch(fetchAdminJobs());
				togglePost('1');
			})
			.catch((error) => {
				console.log(error.message);
				togglePost('2');
			});
	};
};

export const deleteJob = (id) => {
	let token = localStorage.getItem("token");
	return function (dispatch) {
		axios
			.delete(baseURL + "job/delete/" + id, { headers: { "x-auth-token": token } })
			.then((response) => {
				// console.log(response.data);
				dispatch(fetchAdminJobs());
			})
			.catch((error) => {
				console.log(error.message);
			});
	};
};
