import React, { useState } from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { Alert, Button, Modal, ModalBody, Input, ButtonGroup, Label, FormGroup, Form } from "reactstrap";

import { deleteJob, postJob, updateJob } from "../../Redux/Reducer/Jobs/jobsReducer";
import { branchOptions, yearOptions, statusOptions } from "../../Assets/Data";

function JobCard({ job, index }) {
	let dispatch = useDispatch();
	const [delModal, setModal] = useState(false);
	const toggleDelete = () => {
		setModal(!delModal);
	};
	function handleDelete() {
		// console.log("delete", job._id);
		toggleDelete();
		dispatch(deleteJob(job._id));
	}
	const [modal, setModalM] = useState(false);
	const toggleModal = () => {
		// console.log("modal closed");
		setModalM(!modal);
		setUpdate(false);
		setClone(false);
		setDisable(true);
	};

	const [toUpdate, setUpdate] = useState(false);
	const [toClone, setClone] = useState(false);
	const [disable, setDisable] = useState(true);

	const toggleClone = () => {
		setModalM(!modal);
		setClone(true);
		setDisable(false);
		setUpdate(false);
	};
	const toggleUpdate = () => {
		setModalM(!modal);
		setUpdate(true);
		setDisable(false);
		setClone(false);
	};
	// console.log(job);

	const [companyName, setName] = useState(job.companyName);
	const [desc, setDesc] = useState(job.description);
	const [title, setTitle] = useState(job.jobTitle);
	const [formLink, setLink] = useState(job.gFormLink);
	const [mob, setMob] = useState(job.contact.phNo);
	const [email, setEmail] = useState(job.contact.email);
	const [web, setWeb] = useState(job.contact.website);
	const [branch, setBranch] = useState(job.branch);
	const [year, setYear] = useState(job.year);
	const [deadline, setDeadline] = useState(job.deadline.slice(0, 10));
	const [time, setTime] = useState(job.deadline.slice(11));
	const [facebook, setFacebook] = useState(job.contact.socLinks ? job.contact.socLinks.facebook : "");
	const [instagram, setInstagram] = useState(job.contact.socLinks ? job.contact.socLinks.instagram : "");
	const [linkedIn, setLinkedIn] = useState(job.contact.socLinks ? job.contact.socLinks.linkedIn : "");
	const [twitter, setTwitter] = useState(job.contact.socLinks ? job.contact.socLinks.twitter : "");
	const [status, setStatus] = useState(job.status);
	const [isPosted, setPost] = useState("0");
	const togglePost = (e) => {
		setPost(e);
		setTimeout(() => {
			setPost("0");
		}, 5000);
	};
	const appendBranch = (e) => {
		// console.log(e);
		const branchArray = e.map((b) => {
			return b.value;
		});
		setBranch(branchArray);
	};

	const appendYear = (e) => {
		// console.log(e);
		const yearArray = e.map((b) => {
			return b.value;
		});
		setYear(yearArray);
	};

	function handleSubmit(e) {
		e.preventDefault();
		const body = {
			companyName: companyName,
			jobTitle: title,
			description: desc,
			branch: branch,
			year: year,
			email: email,
			phNo: mob,
			website: web,
			facebook: facebook,
			instagram: instagram,
			linkedIn: linkedIn,
			twitter: twitter,
			status: status,
			gFormLink: formLink,
			deadline: deadline + " " + time,
		};

		//  console.log(body);
		if (toUpdate) {
			// console.log("update");
			setUpdate(false);
			setDisable(true);
			dispatch(updateJob(job._id, body, togglePost));
		} else if (toClone) {
			// console.log("add");
			setClone(false);
			setDisable(true);
			dispatch(postJob(body, togglePost));
		}
	}

	return (
		<tr key={index}>
			<td onClick={toggleModal} style={{ cursor: "pointer" }}>
				{index + 1}
			</td>
			<td onClick={toggleModal} style={{ cursor: "pointer" }}>
				{job.companyName}
			</td>
			<td onClick={toggleModal} style={{ cursor: "pointer" }}>
				{job.jobTitle}
			</td>
			<td onClick={toggleModal} style={{ cursor: "pointer" }}>
				{job.status}
			</td>
			<td onClick={toggleModal} style={{ cursor: "pointer" }}>
				{job.deadline}
			</td>
			<td className="text-center">
				<ButtonGroup>
					<Button onClick={toggleUpdate} color="success">
						<i className="fa fa-pencil" />
					</Button>
					<Button onClick={toggleClone} color="warning">
						<i className="fa fa-clone" />
					</Button>
					<Button onClick={toggleDelete} color="danger">
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

			<Modal isOpen={modal} toggle={toggleModal} className="editForm">
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
							style={{ marginLeft: "10px" }}
						>
							Clone
						</Button>
					)}
					<Form onSubmit={handleSubmit} onReset={toggleModal} className="adminJobForm">
						<div className="formMaj">
							<div className="formPart">
								<FormGroup>
									<Label for="companyName">Company Name</Label>
									<Input
										disabled={disable}
										type="text"
										value={companyName}
										name="companyName"
										onChange={(e) => {
											setName(e.target.value);
										}}
										required
									/>
								</FormGroup>
								<FormGroup>
									<Label for="title">Job Title</Label>
									<Input
										type="text"
										disabled={disable}
										name="title"
										value={title}
										onChange={(e) => {
											setTitle(e.target.value);
										}}
										required
									/>
								</FormGroup>
								<FormGroup>
									<Label for="mob">Mobile No.</Label>
									<Input
										type="number"
										name="mob"
										value={mob}
										disabled={disable}
										onChange={(e) => {
											setMob(e.target.value);
										}}
										required
									/>
								</FormGroup>
								<FormGroup>
									<Label for="website">Website</Label>
									<Input
										name="url"
										type="text"
										value={web}
										disabled={disable}
										onChange={(e) => {
											setWeb(e.target.value);
										}}
									/>
								</FormGroup>
								<FormGroup>
									<Label for="desc">Description</Label>
									<Input
										type="textarea"
										name="desc"
										value={desc}
										disabled={disable}
										onChange={(e) => {
											setDesc(e.target.value);
										}}
										rows={12}
										required
									/>
								</FormGroup>
							</div>
							<div className="formPart">
								<FormGroup>
									<Label for="email">Email</Label>
									<Input
										type="email"
										name="email"
										value={email}
										disabled={disable}
										onChange={(e) => {
											setEmail(e.target.value);
										}}
										required
									/>
								</FormGroup>
								<FormGroup>
									<Label for="fb">Facebook</Label>
									<Input
										type="url"
										name="fb"
										value={facebook}
										disabled={disable}
										onChange={(e) => {
											setFacebook(e.target.value);
										}}
									/>
								</FormGroup>
								<FormGroup>
									<Label for="li">Linked In</Label>
									<Input
										type="url"
										value={linkedIn}
										disabled={disable}
										name="li"
										onChange={(e) => {
											setLinkedIn(e.target.value);
										}}
									/>
								</FormGroup>
								<FormGroup>
									<Label for="ig">Instagram</Label>
									<Input
										name="ig"
										type="url"
										value={instagram}
										disabled={disable}
										onChange={(e) => {
											setInstagram(e.target.value);
										}}
									/>
								</FormGroup>
								<FormGroup>
									<Label for="tw">Twitter</Label>
									<Input
										name="tw"
										type="url"
										value={twitter}
										disabled={disable}
										onChange={(e) => {
											setTwitter(e.target.value);
										}}
									/>
								</FormGroup>
								<FormGroup>
									<Label for="formLink">Polling GForm link</Label>
									<Input
										name="formLink"
										type="url"
										value={formLink}
										disabled={disable}
										onChange={(e) => {
											setLink(e.target.value);
										}}
									/>
								</FormGroup>
								<FormGroup className="d-flex" style={{ justifyContent: "space-between" }}>
									<div style={{ width: "45%" }}>
										<Label for="deadline">Polling Form Deadline</Label>
										<Input
											name="deadline"
											value={deadline}
											disabled={disable}
											onChange={(e) => {
												setDeadline(e.target.value);
											}}
											type="date"
										/>
									</div>
									<div style={{ width: "45%" }}>
										<Label for="time">Polling Form Deadline Time</Label>
										<Input
											name="time"
											type="time"
											placeholder="17:30"
											onChange={(e) => {
												setTime(e.target.value);
											}}
											disabled={disable}
											value={time}
										/>
									</div>
								</FormGroup>
								<FormGroup>
									<Label for="status">Status</Label>
									<Input
										disabled={disable}
										name="status"
										type="select"
										value={status}
										onChange={(e) => setStatus(e.target.value)}
									>
										{statusOptions.map((b) => {
											return <option>{b.value}</option>;
										})}
									</Input>
								</FormGroup>
								<FormGroup>
									<Label for="branch">Department</Label>
									<Select
										isMulti
										name="branch"
										isDisabled={disable}
										placeholder={branch.join(" / ")}
										options={branchOptions}
										onChange={appendBranch}
									/>
								</FormGroup>
								<FormGroup>
									<Label for="year">Batch</Label>
									<Select
										isMulti
										name="year"
										isDisabled={disable}
										placeholder={year.join(" / ")}
										options={yearOptions}
										onChange={appendYear}
									/>
								</FormGroup>
							</div>
						</div>
						{toUpdate && (
							<ButtonGroup className="mt-2">
								<Button type="submit" color="success">
									Save
								</Button>
								<Button type="reset" color="danger">
									Cancel
								</Button>
							</ButtonGroup>
						)}
						{toClone && (
							<ButtonGroup className="mt-2">
								<Button type="submit" color="success">
									Add Job
								</Button>
								<Button type="reset" color="danger">
									Cancel
								</Button>
							</ButtonGroup>
						)}
						{isPosted === "1" ? <Alert className="mt-2">Job Updated Successfully!</Alert> : null}
						{isPosted === "2" ? (
							<Alert color="danger" className="mt-2">
								Job could not be Updated. Try again later!
							</Alert>
						) : null}
					</Form>
				</ModalBody>
			</Modal>
		</tr>
	);
}

export default JobCard;
