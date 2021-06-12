import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalBody, Table } from "reactstrap";
import Select from "react-select";

import "./Jobs.css";
// import { jobsContext } from "../App";
import { fetchAdminJobs } from "../../Redux/Reducer/Jobs/jobsReducer";
import AddJobs from "./AddJobs";
import JobCard from "./JobCard";
import Loading from "../Extra/Loading";
import Empty from "../Extra/Empty";

function JobsComponent(props) {
	let dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchAdminJobs());
	}, [dispatch]);
	const jobReducer = useSelector(state => state.jobs);
	const jobs = jobReducer.jobs;
	const jobOptions = jobs.map((s) => {
		return {
			value: s.companyName,
			label: s.companyName,
		};
	});
	const [name, setName] = useState("");
	const appendName = (e) => {
		// console.log(e);
		if (e && e.value) {
			setName(e.value);
		} else {
			setName("");
		}
	};
	const [modal, setModal] = useState(false);
	const toggleModal = () => {
		setModal(!modal);
	};

	if (jobReducer.isLoading) return <Loading />;
	else if (jobReducer.jobs.length > 0) {
		return (
			<div className="container mt-3">
				<div className="row">
					<div className="col-6">
						<Button color="primary" onClick={toggleModal}>
							+ Add Jobs
						</Button>
					</div>
					<Modal isOpen={modal} toggle={toggleModal} className="adminJob">
						<ModalBody>
							<AddJobs />
						</ModalBody>
					</Modal>
					<div className="col-6">
						<Select
							options={jobOptions}
							name="name"
							isClearable
							onChange={appendName}
							placeholder="Search..."
						/>
					</div>
				</div>
				<div>
					<Table bordered hover responsive className="mt-4">
						<thead>
							<tr>
								<th>#</th>
								<th>Company</th>
								<th>Job Title</th>
								<th>Status</th>
								<th>Deadline</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{jobs
								.filter((j) => {
									return j.companyName.search(name) >= 0;
								})
								.map((job, index) => {
									return <JobCard job={job} index={index} />;
								})}
						</tbody>
					</Table>
				</div>
			</div>
		);
	} else {
		return <Empty text="NO JOBS FOUND" />;
	}
}

export default JobsComponent;
