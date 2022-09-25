import React from 'react';

import './Register.css';

import FileUpload from './widgets/FileUpload';

class Register extends React.Component {
	// props: {server, appMenuHandler}
	constructor() {
		super();
		this.menuHandler = this.menuHandler.bind(this);
	}
	menuHandler(menu) {
		this.props.appMenuHandler(menu);
	}
	render() {
		return (
			<div className="register">
				<FileUpload server={this.props.server} menuHandler={this.menuHandler}/>
			</div>
		);
	}
}

export default Register;