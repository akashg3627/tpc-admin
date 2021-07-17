import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label, Alert } from "reactstrap";
import Select from "react-select";
import { Tabs, Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import "./Notifications.css";
import { branchOptions, yearOptions } from "../../Assets/Data";
// import RichTextEditor from 'react-rte';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import ReactHtmlParser from 'react-html-parser'


import { postNotificationsBranch, postNotificationsArray } from "../../Redux/Reducer/Notifications/notificationsReducer";
import { fetchStudents } from '../../Redux/Reducer/Students/studentsReducer'

function NotifyWithGroup(props) {
	let dispatch = useDispatch();
	const [notifyText, setText] = useState("");
	const [sub, setSub] = useState("");
	const [branch, setBranch] = useState([]);
	const [year, setYear] = useState([]);
	const [isPosted, setPost] = useState('0');
	const [companyName, setCompanyName]=useState('');
	const togglePost = (e) => {
		setPost(e);
		setTimeout(() => {
			setPost('0');
		}, 3000);
	}

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
	// const handleText=(e, editor)=>{
	// 	// console.log(e);
	// 	 const data=editor.getData();
	// 	// not
	// 	// const data=ReactHtmlParser(editor.getData());
	// 	 console.log(data)
	// }

	function handleNotify(e) {
		e.preventDefault();
		let body = {
			text: notifyText,
			subject: sub,
			companyName: companyName,
			branch: branch,
			year: year,
		};
		// console.log("notify to", body);
		dispatch(postNotificationsBranch(body, togglePost));

	}

	return (
		<div className="container">
			<Form onSubmit={handleNotify} className="w-60 m-auto mt-4 rounded border p-3">
				<FormGroup className="mt-2">
					<Label for="branch">Department</Label>

					<Select isMulti name="branch" options={branchOptions} onChange={appendBranch} />
				</FormGroup>
				<FormGroup className="mt-2">
					<Label for="year">Batch</Label>

					<Select isMulti name="year" options={yearOptions} onChange={appendYear} />
				</FormGroup>
				<FormGroup className="mt-2">
					<Label for="notifySub">Company Name</Label>
					<Input
						type="text"
						name="notifySub"
						onChange={(e) => {
							setCompanyName(e.target.value);
						}}
						placeholder="Company Name"
					/>
				</FormGroup>
				<FormGroup className="mt-2">
					<Label for="notifySub">Notification Subject</Label>
					<Input
						type="text"
						name="notifySub"
						onChange={(e) => {
							setSub(e.target.value);
						}}
						placeholder="Email Subject"
					/>
				</FormGroup>
				<FormGroup className="mt-2">
					<Label for="notifyText">Notification Text</Label>
					<Input
						type="textarea"
						name="notifyText"
						onChange={(e) => {
							setText(e.target.value);
						}}
						rows={5}
					/>
					{/* <CKEditor 
					editor={ClassicEditor}
					onChange={handleText}
					/> */}
					{/* <RichTextEditor
						value={notifyText}
						onChange={handleText}
					/> */}
				</FormGroup>
				<Button type="submit" className="mt-3" color="primary">
					Send Notification
				</Button>
				{
					isPosted === '1' ? <Alert color="success" className="mt-2">Notification Posted Successfully!</Alert> : null
				}
				{
					isPosted === '2' ? <Alert className="mt-2" color="danger">Notification could not be Posted. Try again later!</Alert> : null
				}
			</Form>
		</div>
	);
}

function NotifyWithIds({ emailOptions }) {
	let dispatch = useDispatch();
	const [notifyText, setText] = useState("");
	const [sub, setSub] = useState("");
	const [emails, setEmails] = useState([]);
	const [isPosted, setPost] = useState('0');
	const [companyName, setCompanyName]=useState('');
	const togglePost = (e) => {
		setPost(e);
		setTimeout(() => {
			setPost('0');

		}, 5000);
	}

	const appendIds = (e) => {
		console.log(e);
		const emailArray = e.map((b) => {
			return b.value;
		});
		setEmails(emailArray);
	};

	function handleNotify(e) {
		e.preventDefault();
		let body = {
			text: notifyText,
			companyName: companyName,
			subject: sub,
			emails: emails,
		};
		console.log("notify to", body);
		dispatch(postNotificationsArray(body, togglePost));
	}

	return (
		<div className="container">
			<Form onSubmit={handleNotify} className="w-60 m-auto mt-4 rounded border p-3">
				<FormGroup className="mt-2">
					<Label for="emails">Emails</Label>

					<Select isMulti name="emails" options={emailOptions} onChange={appendIds} />
				</FormGroup>
				<FormGroup className="mt-2">
					<Label for="notifySub">Company Name</Label>
					<Input
						type="text"
						name="notifySub"
						onChange={(e) => {
							setCompanyName(e.target.value);
						}}
						placeholder="Company Name"
					/>
				</FormGroup>
				<FormGroup className="mt-2">
					<Label for="notifySub">Notification Subject</Label>
					<Input
						type="text"
						name="notifySub"
						onChange={(e) => {
							setSub(e.target.value);
						}}
						placeholder="Email Subject"
					/>
				</FormGroup>
				<FormGroup className="mt-2">
					<Label for="notifyText">Notification Text</Label>
					<Input
						type="textarea"
						name="notifyText"
						onChange={(e) => {
							setText(e.target.value);
						}}
						rows={5}
					/>
				</FormGroup>
				<Button type="submit" className="mt-3" color="primary">
					Send Notifications
				</Button>
				{
					isPosted === '1' ? <Alert color="success" className="mt-2">Notification Posted Successfully!</Alert> : null
				}
				{
					isPosted === '2' ? <Alert color="danger" className="mt-2">Notification could not be Posted. Try again later!</Alert> : null
				}
			</Form>
		</div>
	);
}

function NotificationsComponent() {
	let dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchStudents());
	}, [dispatch]);

	const students = useSelector((state) => state.students.students);
	const emailOptions = students.map((s) => {
		return {
			value: s.email,
			label: s.email,
		};
	});

	return (
		<div className="container mt-4">
			<Tabs defaultActiveKey="group" id="uncontrolled-tab-example">
				<Tab eventKey="group" title="Notify With Groups">
					<NotifyWithGroup />
				</Tab>
				<Tab eventKey="ids" title="Notify With Email IDs">
					<NotifyWithIds emailOptions={emailOptions} />
				</Tab>
			</Tabs>
		</div>
	);
}

export default NotificationsComponent;
