import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Alert, Button, Form, Modal, ModalBody, FormGroup, Label, Input, ButtonGroup } from "reactstrap";


import { deleteStudent, postStudent, updateStudent } from "../../Redux/Reducer/Students/studentsReducer";
// import Select from 'react-select';
import { branchOptions, yearOptions } from "../../Assets/Data";

function StudentCard({ student, index }) {
	let dispatch = useDispatch();
	const [delModal, setModal] = useState(false);
	const toggleDelete = () => {
		setModal(!delModal);
	};
	const [modal, setModalM] = useState(false);
	const toggleModal = () => {
		// console.log("modal closed");
		setModalM(!modal);
		setUpdate(false);
		setClone(false);
		setDisable(true);
	};
	function handleDelete() {
		// console.log("delete", student._id);
		toggleDelete();
		dispatch(deleteStudent(student._id));
	}

	const [toUpdate, setUpdate] = useState(false);
	const [toClone, setClone] = useState(false);
	const [disable, setDisable] = useState(true);

	const toggleClone = () => {
		setModalM(!modal);
		setClone(true);
		setDisable(false);
		setUpdate(false);
	}
	const toggleUpdate = () => {
		setModalM(!modal);
		setUpdate(true);
		setDisable(false);
		setClone(false);
	}

	const [name, setName] = useState(student.name);
	const [email, setEmail] = useState(student.email);
	const [branch, setBranch] = useState(student.branch);
	const [year, setYear] = useState(student.year);
	// const appendBranch = (e) => {
	//     console.log(e);

	//     setBranch(e.value);
	// };

	// const appendYear = (e) => {
	//     console.log(e);

	//     setYear(e.value);
	// };
	const [isPosted, setPost] = useState('0');
	const togglePost = (e) => {
		setPost(e);
		setTimeout(() => {
			setPost('0');
		}, 5000);
	}
	// const [toUpdate, setUpdate] = useState(false);
	function handleUpdate(e) {
		e.preventDefault();
		const body = {
			name: name,
			email: email,
			branch: branch,
			year: year,
		};
		// console.log("update", body);
		if (toUpdate) {
			// console.log("update");
			setUpdate(false);
			setDisable(true);
			dispatch(updateStudent(student._id, body, togglePost));
		}
		else if (toClone) {
			// console.log("add");
			setClone(false);
			setDisable(true);
			dispatch(postStudent(body, togglePost));
		}
		// dispatch(updateStudent(student._id, body, togglePost));
		// setUpdate(false);
	}

	return (
		<tr key={student._id}>
			<td onClick={toggleModal} style={{ cursor: "pointer" }}>
				{index + 1}
			</td>
			<td onClick={toggleModal} style={{ cursor: "pointer" }}>
				{student.name}
			</td>
			<td onClick={toggleModal} style={{ cursor: "pointer" }}>
				{student.email}
			</td>

			<td className="text-center">
				<ButtonGroup>
					<Button onClick={toggleUpdate} color="success">

						<i className="fa fa-pencil" />
					</Button>
					<Button onClick={toggleClone} color="warning">

						<i className="fa fa-clone" />
					</Button>
					<Button onClick={toggleDelete} color="danger" >

						<i className="fa fa-trash" />
					</Button>
				</ButtonGroup>
			</td>
			<Modal isOpen={delModal} toggle={toggleDelete}>
				<ModalBody>
					<Alert>Are you sure to delete this job?</Alert>
					<Button onClick={handleDelete} color="danger" style={{ marginRight: "10px" }}>
						Confirm Delete
					</Button>
					<Button onClick={toggleDelete} color="success">
						Cancel
					</Button>
				</ModalBody>
			</Modal>
			<Modal isOpen={modal} toggle={toggleModal}>
				<ModalBody>
					{!toUpdate && !toClone && (
						<Button
							onClick={() => {
								setUpdate(true);
								setDisable(false);
							}}
							color="primary"
						>
							Edit
						</Button>
					)}
					{!toClone && !toUpdate && (
						<Button
							onClick={() => {
								setClone(true);
								setDisable(false);
							}}
							color="primary"
						>
							Clone
						</Button>
					)}
					<Form onReset={toggleModal} onSubmit={handleUpdate}>
						<FormGroup>
							<Label for="name">Name</Label>
							<Input
								disabled={disable}
								type="text"
								name="name"
								value={name}
								onChange={(e) => {
									setName(e.target.value);
								}}
							/>
						</FormGroup>
						<FormGroup>
							<Label for="email">Email</Label>
							<Input
								disabled={disable}
								type="text"
								name="email"
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
								}}
							/>
						</FormGroup>
						<FormGroup>
							<Label for="branch">Department</Label>
							<Input
								disabled={disable}
								name="branch"
								type="select"
								value={branch}
								onChange={(e) => setBranch(e.target.value)}
							>
								<option>{branch}</option>
								{branchOptions.map((b) => {
									return <option>{b.value}</option>;
								})}
							</Input>

							{/* <Select isDisabled={!toUpdate} placeholder={branch} name="branch" options={branchOptions} onChange={appendBranch} /> */}
						</FormGroup>
						<FormGroup>
							<Label for="year">Batch</Label>
							<Input
								disabled={disable}
								name="year"
								type="select"
								value={year}
								onChange={(e) => setYear(e.target.value)}
							>
								<option>{year}</option>
								{yearOptions.map((b) => {
									return <option>{b.value}</option>;
								})}
							</Input>
							{/* <Select isDisabled={!toUpdate} placeholder={year} name="branch" options={yearOptions} onChange={appendYear} /> */}
						</FormGroup>

						{toUpdate && (
							<ButtonGroup className="mt-2">
								<Button type="submit" color="success">
									Save
								</Button>
								<Button
									type="reset"

									color="danger"
								>
									Cancel
								</Button>
							</ButtonGroup>
						)}
						{toClone && (
							<ButtonGroup className="mt-2">
								<Button type="submit" color="success">
									Add Student
								</Button>
								<Button
									type="reset"

									color="danger"
								>
									Cancel
								</Button>
							</ButtonGroup>
						)}
						{
							isPosted === '1' ? <Alert className="mt-2">Student updated Successfully!</Alert> : null
						}
						{
							isPosted === '2' ? <Alert color="danger" className="mt-2">Student could not be updated. Try again later!</Alert> : null
						}
					</Form>
				</ModalBody>
			</Modal>
		</tr>
	);
}

export default StudentCard;
