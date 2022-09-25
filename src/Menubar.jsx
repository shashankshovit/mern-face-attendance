import React from 'react';
import './Menubar.css';

class Menubar extends React.Component {
	// props: {appMenuHandler}
	constructor() {
		super();
		this.menuClickHandler = this.menuClickHandler.bind(this);
	}
	menuClickHandler(evt) {
		this.props.appMenuHandler(evt.target.innerHTML);
	}
	getMenuItems() {
		return this.props.menuItems.map(item => {
			const className = this.props.active===item?"active":"";
			const key = `menu_li_${item}`;
			return <li className={className} onClick={this.menuClickHandler} key={key}>{item}</li>
		});
	}
	render() {
		return (
			<div className="menubar">
				<ul>
					{this.getMenuItems()}
				</ul>
			</div>
		);
	}
}

export default Menubar;