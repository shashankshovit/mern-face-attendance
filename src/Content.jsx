import React from 'react';

import './Content.css';

import Home from './Home';
import Register from './Register';
import Attendance from './Attendance';

class Content extends React.Component {
	// props: {server, appMenuHandler}
	render() {
		const contentClasses = {
			Home,
			Register,
			Attendance
		};

		const ContentClass = contentClasses[this.props.content];
		return (
			<div className="content">
				<ContentClass server={this.props.server} appMenuHandler={this.props.appMenuHandler}/>
			</div>
		);
	}
}

export default Content;