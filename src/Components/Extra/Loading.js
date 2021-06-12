import React from "react";
import { Spinner } from "reactstrap";

import './Extra.css';

function Loading(props) {
	return (
		<div className="loading align-middle ">
			<Spinner color="primary" />
		</div>
	);
}

export default Loading;
