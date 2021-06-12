import React from "react";

import './Extra.css';

function Empty({ text }) {
	return (
		<div className="loading align-middle ">
			<div id="emptyCard">
				{text}
			</div>
		</div>
	);
}

export default Empty;