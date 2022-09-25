import React from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './FileUpload.css';

class FileUpload extends React.Component {
	// props: {server, menuHandler}
	constructor() {
		super();

		this.state = {
			name: '',
			files: []
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleFileChange = this.handleFileChange.bind(this);
	}
	handleNameChange(evt) {
		this.setState({name: evt.target.value});
	}
	handleFileChange(evt) {
		this.setState({files: evt.target.files});
	}
	async handleSubmit(evt) {
		if(!this.state.name || !this.state.files.length) {
			toast.warn("Your name and (atleast) 1 image is required.", {autoClose: 8000});
			return false;
		}

		const toastId = toast.info("Registering ...", {autoClose: false, theme: "colored"});

		let formData = new FormData();
		formData.set("name", this.state.name);
		for(const fl of this.state.files) {formData.append("userphotos", fl)}

		let response = await fetch(`${this.props.server}/save-images`, {method: 'POST', body: formData});
		if(!response.ok) {
			toast.error("Server error. Please retry after some time.", {theme: "colored"});
			return false;
		}
		response = await response.json();
		if(response.success) {
			const successMsg = () => <div><strong>Registration successful.</strong><br/>You can proceed for attendance.</div>;
			toast.update(toastId, {render: successMsg, type: toast.TYPE.SUCCESS, autoClose: 5000, theme: "colored"});
			setTimeout(()=>this.props.menuHandler('Home'), 5000);
		} else {
			let errorMsg;
			if(response.server==="cloudinary") 
				{errorMsg="Error while uploading image. Please retry after some time."}
			if(response.server==="mongodb")
				{errorMsg="Error while recording details in database. Please retry after some time."}
			toast.update(toastId, {render: errorMsg, type: toast.TYPE.ERROR, theme: "colored", autoClose: 5000});
		}
	}
	render() {
		return (
			<div className="file-upload">
				<ToastContainer/>
				<div className="row">Provide us your name and upload your photos.</div>
				<div className="row">
					<div>Name:</div>
					<input
						type="text"
						value={this.state.name}
						onChange={this.handleNameChange}
						required={true}
						placeholder="Your full name here"
					/>
				</div>
				<div className="row">
					<div>Upload photos (atleast 1):</div>
					<input
						type="file"
						onChange={this.handleFileChange}
						accept="image/*"
						required={true}
						multiple={true}
					/>
				</div>
				<div className="row">
					<button type="button" onClick={this.handleSubmit}>Upload</button>
				</div>
			</div>
		);
	}
}

export default FileUpload;