import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "react-awesome-calendar";

import { fetchJobs } from "../../Redux/Reducer/Jobs/jobsReducer";
import Loading from "../Extra/Loading";
import "./Calendar.css";

function CalendarComponent() {
	const dispatch = useDispatch();
	const jobReducer = useSelector(state=>state.jobs);

	const [events, setEvents] = useState([]);

	useEffect(() => {
		dispatch(fetchJobs());
	}, [dispatch]);

	useEffect(() => {
		let event = [];
		jobReducer.jobs.forEach((job, index) => {
			var obj = {
				id: index + 1,
				color: "#3694DF",
				from: job.deadline,
				to: job.deadline,
				title: job.companyName,
			};
			event = [obj, ...event];
		});
		// console.log(event);
		setEvents(event);
	}, [jobReducer.jobs]);

	return (
		<div className="container-fluid">
			{jobReducer.isLoading && <Loading />}
			{!jobReducer.isLoading && <Calendar events={events} mode="monthlyMode" />}
		</div>
	);
}

export default CalendarComponent;
