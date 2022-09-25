import React from 'react';

import './Home.css';

import ServerState from './ServerState';

class Home extends React.Component {
	// props: {server, appMenuHandler}
	constructor() {
		super();
		this.state = {
			serverState: null
		};
	}
	async componentDidMount() {
		// Check if server is working fine.
		let response = await fetch(this.props.server);
		if(response.ok) {
			this.setState({serverState: 'online'});	
		} else {
			this.setState({serverState: 'offline'});
		}
	}
	render() {
		return (
			<div className="home">
				<p>This app is a sample of attendance management system which recognises faces and marks attedance in the database. The app is based on MERN architecture and uses NodeJS, ReactJS, ExpressJS, MongoDB. This sample app also uses the famous tensorflow library for facial recognition.</p>
				<p>Open the 'Attendance' tab to start the camera and mark your attendance.</p>
				<p>In case the system is unable to identify you, you can use the 'Register' tab to upload a few of your images to the systems database and then try to mark your attendance.</p>
				<div><ServerState state={this.state.serverState}/></div>
			</div>
		);
	}
}

export default Home;