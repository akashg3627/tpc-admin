import React, { useState } from "react";
import { Form, FormGroup, Input, Label, Button, Alert } from "reactstrap";
import Select from "react-select";
import { useDispatch } from "react-redux";

import { postJob } from "../../Redux/Reducer/Jobs/jobsReducer";
import { branchOptions, yearOptions, statusOptions } from "../../Assets/Data";

function AddJobs() {
	let dispatch = useDispatch();
	const [companyName, setName] = useState("");
	const [desc, setDesc] = useState("");
	const [title, setTitle] = useState("");
	const [formLink, setLink] = useState("");
	const [mob, setMob] = useState("");
	const [email, setEmail] = useState("");
	const [web, setWeb] = useState("");
	const [branch, setBranch] = useState([]);
	const [year, setYear] = useState([]);
	const [deadline, setDeadline] = useState("");
	const [facebook, setFacebook] = useState("");
	const [instagram, setInstagram] = useState("");
	const [linkedIn, setLinkedIn] = useState("");
	const [twitter, setTwitter] = useState("");
	const [time, setTime] = useState("");
	const [status, setStatus] = useState("");
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
		const job = {
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

		// console.log(job);
		dispatch(postJob(job, togglePost));
	}
	return (
		<div>
			<Form onSubmit={handleSubmit} className="adminJobForm">
				<div className="formMaj">
					<div className="formPart">
						<FormGroup>
							<Label for="companyName">Company Name</Label>
							<Input
								type="text"
								name="companyName"
								required
								onChange={(e) => {
									setName(e.target.value);
								}}
							/>
						</FormGroup>
						<FormGroup>
							<Label for="title">Job Title</Label>
							<Input
								type="text"
								name="title"
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
								onChange={(e) => {
									setMob(e.target.value);
								}}
								required
							/>
						</FormGroup>
						<FormGroup>
							<Label for="website">Website</Label>
							<Input
								name="website"
								type="url"
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
								onChange={(e) => {
									setEmail(e.target.value);
								}}
								required
							/>
						</FormGroup>
						<FormGroup>
							<Label for="fb">Facebook</Label>
							<Input
								name="fb"
								type="url"
								onChange={(e) => {
									setFacebook(e.target.value);
								}}
							/>
						</FormGroup>
						<FormGroup>
							<Label for="li">Linked In</Label>
							<Input
								name="li"
								type="url"
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
								onChange={(e) => {
									setLink(e.target.value);
								}}
							/>
						</FormGroup>
						<FormGroup className="d-flex" style={{ justifyContent: "space-between" }}>
							<div style={{ width: "45%" }}>
								<Label for="deadline">Polling Form Deadline Date</Label>
								<Input
									name="deadline"
									type="date"
									onChange={(e) => {
										setDeadline(e.target.value);
									}}
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
								/>
							</div>
						</FormGroup>
						<FormGroup>
							<Label for="status">Status</Label>
							<Input
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
							<Select isMulti name="branch" options={branchOptions} onChange={appendBranch} />
						</FormGroup>
						<FormGroup>
							<Label for="year">Batch</Label>
							<Select isMulti name="year" options={yearOptions} onChange={appendYear} />
						</FormGroup>
					</div>
				</div>
				<Button type="submit" className="mt-4" style={{ maxWidth: "200px", margin: "auto" }} color="primary">
					Submit
				</Button>
				{isPosted === "1" ? <Alert className="mt-2">Job added Successfully!</Alert> : null}
				{isPosted === "2" ? (
					<Alert color="danger" className="mt-2">
						Job could not be added. Try again later!
					</Alert>
				) : null}
			</Form>
		</div>
	);
}

export default AddJobs;
