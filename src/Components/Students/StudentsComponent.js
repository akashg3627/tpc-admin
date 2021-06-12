import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalBody, Table } from "reactstrap";
import Select from "react-select";

import "./Students.css";
// import { studentContext } from "../../App";
import { fetchStudents } from "../../Redux/Reducer/Students/studentsReducer";
// import AddJobForm from "../AdminJobs/AddJobForm";
import { AddSingleStudent, AddStudentwithCSV } from "./AddStudents";
import StudentCard from "./StudentCard";
import Loading from "../Extra/Loading";


function StudentComponent(props) {
	let dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchStudents());
	}, [dispatch]);
	const [email, setEmail] = useState("");
	let studentsReducer = useSelector(state => state.students);
	let students = studentsReducer.students;

	const emailOptions = students.map((s) => {
		return {
			value: s.email,
			label: s.email,
		};
	});
	const [modal, setModal] = useState(false);
	const [modalWCSV, setModalCSV] = useState(false);
	const toggleModal = () => {
		setModal(!modal);
	};
	const toggleModalCSV = () => {
		setModalCSV(!modalWCSV);
	};

	const appendEmail = (e) => {
		// console.log(e);
		if (e && e.value) {
			setEmail(e.value);
		} else {
			setEmail("");
		}
	};

	if (studentsReducer.isLoading) {
		return <Loading />;
	} else {
		return (
			<div className="container mt-3">
				<div className="row">
					<div className="col-3">
						<Button color="primary" onClick={toggleModal}>
							+ Add Student
						</Button>
					</div>
					<div className="col-3">
						<Button color="primary" onClick={toggleModalCSV}>
							+ Add Student with CSV
						</Button>
					</div>
					<Modal isOpen={modal} toggle={toggleModal}>
						<ModalBody>
							<AddSingleStudent />
						</ModalBody>
					</Modal>
					<Modal isOpen={modalWCSV} toggle={toggleModalCSV}>
						<ModalBody>
							<AddStudentwithCSV />
						</ModalBody>
					</Modal>
					<div className="col-6">
						<Select
							isClearable
							name="email"
							options={emailOptions}
							onChange={appendEmail}
							placeholder="Search by Email..."
						/>
					</div>
				</div>
				<div>
					<Table bordered hover responsive className="mt-4">
						<thead>
							<tr>
								<th>#</th>
								<th>Name</th>
								<th>Email ID</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{students &&
								students
									.filter((s) => {
										return s.email.search(email) >= 0;
									})
									.map((student, index) => {
										return <StudentCard student={student} index={index} />;
									})}
						</tbody>
					</Table>
				</div>
			</div>
		);
	}
}

export default StudentComponent;
