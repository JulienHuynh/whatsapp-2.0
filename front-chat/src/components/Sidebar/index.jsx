import React from "react";
import "./styles/main.css";
import avatar from "assets/images/default-pp.png";
import Contact from "./Contact";
import { useUsersContext } from "context/usersContext";

const Sidebar = () => {
	const { users: contacts } = useUsersContext();
	return (
		<aside className="sidebar">
			<header className="header">
				<div className="sidebar__avatar-wrapper">
					<img src={avatar} alt="Karen Okonkwo" className="avatar" />
				</div>
				Le rappeur damso
			</header>
			
			<div className="sidebar__contacts">
				{contacts.map((contact, index) => (
					<Contact key={index} contact={contact} />
				))}
			</div>
		</aside>
	);
};

export default Sidebar;
