import React from 'react';

class ServerState extends React.Component {
	// props: {state}
	unknownLayout() {
		return (<div>Server status unknown.</div>);
	}
	offlineLayout() {
		return (
			<div>Server is offline. None of the operations would work at this time.</div>
		);
	}
	onlineLayout() {
		return(<div>Server is online.</div>);
	}
	render() {
		switch(this.props.state) {
			case 'online' : return this.onlineLayout();
			case 'offline': return this.offlineLayout();
			default: return this.unknownLayout();
		}
	}
}

export default ServerState;