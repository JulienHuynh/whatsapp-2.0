import React, {useEffect, useState} from "react";
import "./styles/main.css";
import avatar from "assets/images/default-pp.png";
import Contact from "./Contact";
import {useGetUsers} from "../../hooks/useApi";

const Sidebar = () => {
	const [contacts, setContacts] = useState([]);

	useEffect(() => {
		GetUsersList();
	}, []);

	const GetUsersList = (event) => {
		useGetUsers().then((response) => {
			setContacts(response.data.data);
		}).catch(error => {
			console.error(error.response.data.message);
		});
	};

	return (
		<aside className="sidebar">
			<header className="header">
				<div className="sidebar__avatar-wrapper">
					<img src={avatar} alt="Karen Okonkwo" className="avatar" />
				</div>
				ALO LA TERRE
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
