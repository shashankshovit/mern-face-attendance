import React from 'react';

import './Attendance.css';

class Attendance extends React.Component {
	// props: {server, appMenuHandler}
	constructor() {
		super();
		this.videoElement = React.createRef();
		this.canvasElement = React.createRef();
		this.state = {
			video: true,
			canvas: false,
			shutter: this.CLICKTEXT,
			submit: false
		};
		console.log("=> CONSTRUCTOR");
	}

	get CLICKTEXT() {
		return 'Capture';
	}
	get RETAKETEXT() {
		return 'Retake';
	}

	get videoVisibility() {
		return this.state.video ? '' : 'hidden';
	}

	get canvasVisibility() {
		return this.state.canvas ? '' : 'hidden';
	}

	get submitVisibility() {
		return this.state.submit ? '' : 'hidden';
	}

	async setVideoStream() {
		let stream;
		try {
			stream = await navigator.mediaDevices.getUserMedia({video: true});
		} catch(e) {
			alert(e);
		}
		this.videoElement.current.srcObject = stream;
	}

	unsetVideoStream() {
		this.videoElement?.current?.srcObject?.getTracks().forEach(t=>t.stop());
	}

	getHTMLForm() {
		return (
			<form action="/record" method='POST' enctype="multipart/form-data">
				<input type="file" name="image" capture="user" accept="image/*" class="hidden" />
				<div class="camera hidden">
					<video autoplay></video>
					<button class="button shutter" type="button">Capture</button>
				</div>
				<canvas class="hidden"></canvas>
				<br />
				<div class="button_tray">
					<button class="button camera_controller" type="button">Open Camera</button>
					<button class="button hidden submit">Upload Image</button>
				</div>
			</form>
		)
	}


	componentDidMount() {
		this.setVideoStream();
	}

	componentDidUpdate() {
	}

	componentWillUnmount() {
		this.unsetVideoStream();
	}

	shutterHandler() {
		const video = this.videoElement.current;
		const canvas = this.canvasElement.current;
		if(this.state.video) {
			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;
			const context = canvas.getContext('2d');
			context.drawImage(video, 0, 0, canvas.width, canvas.height);
			this.setState({video: !this.state.video, canvas: !this.state.canvas, shutter: this.RETAKETEXT, submit: true});
			this.unsetVideoStream();
		} else {
			this.setVideoStream();
			this.setState({video: !this.state.video, canvas: !this.state.canvas, shutter: this.CLICKTEXT, submit: false});
		}
	}

	submitHandler() {
		const canvas = this.canvasElement.current;
		canvas.toBlob((blob)=>{
			const file = new File([blob], 'capture.jpeg', {type: 'image/jpeg'});
			let dtObj = new DataTransfer();
			dtObj.items.add(file);
			// dtObj.files
			console.log(dtObj.files);
			fetch(`${this.props.server}/mark-attendance`, {
				method: 'POST',
				body: {
					name: 'Shashank Shovit',
					files: dtObj.files
				}
			});
			// ====== HERE =====

		}, 'image/jpeg')
	}

	render() {
		return (
			<div className="Attendance">
				<video autoPlay={true} ref={this.videoElement} className={this.videoVisibility}></video>
				<canvas ref={this.canvasElement} className={this.canvasVisibility}></canvas>
				<div className="button_tray">
					<button onClick={this.shutterHandler.bind(this)}>{this.state.shutter}</button>
					<button className={this.submitVisibility} onClick={this.submitHandler.bind(this)}>Submit</button>
				</div>
			</div>
		);
	}
}

export default Attendance;