import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Label, Alert } from "reactstrap";
import { useDispatch } from "react-redux";
import * as XLSX from "xlsx";

import { branchOptions, yearOptions } from "../../Assets/Data";
import { addMultipleStudents, postStudent } from "../../Redux/Reducer/Students/studentsReducer";
import img from "../../Assets/Images/format.png";

function AddSingleStudent() {
	let dispatch = useDispatch();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [branch, setBranch] = useState("BTech-CSE");
	const [year, setYear] = useState("2018");
	const [isPosted, setPost] = useState('0');
	const togglePost = (e) => {
		setPost(e);
		setTimeout(() => {
			setPost('0');
		}, 5000);
	}
	function handleSubmit(e) {
		e.preventDefault();
		const body = {
			name: name,
			email: email,
			branch: branch,
			year: year,
		};
		// console.log("add", body);
		dispatch(postStudent(body, togglePost));
	}
	return (
		<div>
			<Form onSubmit={handleSubmit}>
				<FormGroup>
					<Label for="name">Name</Label>
					<Input
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
					<Input name="branch" type="select" value={branch} onChange={(e) => setBranch(e.target.value)}>
						{branchOptions.map((b) => {
							return <option>{b.value}</option>;
						})}
					</Input>

					{/* <Select isDisabled={!toUpdate} placeholder={branch} name="branch" options={branchOptions} onChange={appendBranch} /> */}
				</FormGroup>
				<FormGroup>
					<Label for="year">Batch</Label>
					<Input name="year" type="select" value={year} onChange={(e) => setYear(e.target.value)}>
						{yearOptions.map((b) => {
							return <option>{b.value}</option>;
						})}
					</Input>
					{/* <Select isDisabled={!toUpdate} placeholder={year} name="branch" options={yearOptions} onChange={appendYear} /> */}
				</FormGroup>

				<Button type="submit" color="primary" className="mt-3">
					Submit
				</Button>
				{
					isPosted === '1' ? <Alert className="mt-2">Student added Successfully!</Alert> : null
				}
				{
					isPosted === '2' ? <Alert color="danger" className="mt-2">Student could not be added. Try again later!</Alert> : null
				}
			</Form>
		</div>
	);
}

function AddStudentwithCSV() {
	const [excelFile, setExcelFile] = useState();
	let dispatch = useDispatch();
	const [isPosted, setPost] = useState('0');
	const togglePost = (e) => {
		setPost(e);
		setTimeout(() => {
			setPost('0');
		}, 5000);
	}

	function readFile() {
		var f = excelFile;
		const reader = new FileReader();
		reader.onload = (evt) => {
			const bstr = evt.target.result;
			const wb = XLSX.read(bstr, { type: "binary" });
			const wsname = wb.SheetNames[0];
			const ws = wb.Sheets[wsname];
			const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
			console.log("Data>>>" + data); // shows that excel data is read
			var parsedData = convertToJson(data);
			parsedData = parsedData.slice(0, -1);
			console.log(parsedData); // shows data in json format
			dispatch(addMultipleStudents(parsedData, togglePost));
		};
		reader.readAsBinaryString(f);
	}

	function convertToJson(csv) {
		var lines = csv.split("\n");
		var result = [];
		var headers = lines[0].split(",");

		for (var i = 1; i < lines.length; i++) {
			var obj = {};
			var currentline = lines[i].split(",");
			for (var j = 0; j < headers.length; j++) {
				obj[headers[j]] = currentline[j];
			}
			result.push(obj);
		}

		return result;
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(excelFile);
		readFile();
	};

	return (
		<div className="mt-5 d-flex flex-column p-2">
			<img src={img} alt="excel file format" style={{ maxWidth: "100%", margin: "auto" }} />
			<Form onSubmit={handleSubmit} className="mt-3">
				<FormGroup>
					<Input
						type="file"
						name="file"
						id="file"
						required
						onChange={(e) => {
							setExcelFile(e.target.files[0]);
						}}
					/>
				</FormGroup>
				<Button type="submit" className="mt-3" color="primary">
					Add Students
				</Button>
				{
					isPosted === '1' ? <Alert className="mt-2">Students added Successfully!</Alert> : null
				}
				{
					isPosted === '2' ? <Alert color="danger" className="mt-2">Students could not be added. Try again later!</Alert> : null
				}
			</Form>
		</div>
	);
}

export { AddStudentwithCSV, AddSingleStudent };
