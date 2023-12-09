import React from "react";
import Icon from "components/Icon";
import {Link} from "react-router-dom";
import {useUsersContext} from "context/usersContext";
import getRandomSentence from "../../utils/getRandomSentence";
import pp from "assets/images/default-pp.png";

const Contact = ({ contact }) => {
	const { setUserAsUnread } = useUsersContext();
	const getLastMessage = () => {
		return {
			content: getRandomSentence(),
			sender: 2,
			time: "08:11:26",
		};
	};

	const lastMessage = getLastMessage(contact);

	return (
		<Link
			className="sidebar-contact"
			to={`/chat/${contact.id}`}
			onClick={() => setUserAsUnread(contact.id)}
		>
			<div className="sidebar-contact__avatar-wrapper">
				<img
					src={pp}
					alt={pp}
					className="avatar"
				/>
			</div>
			<div className="sidebar-contact__content">
				<div className="sidebar-contact__top-content">
					<h2 className="sidebar-contact__name"> {contact.firstname} {contact.lastname} </h2>
					<span className="sidebar-contact__time">
						{lastMessage.time}
					</span>
				</div>
				<div className="sidebar-contact__bottom-content">
					<p className="sidebar-contact__message-wrapper">
						{lastMessage.status && (
							<Icon
								id={
									lastMessage?.status === "sent" ? "singleTick" : "doubleTick"
								}
								aria-label={lastMessage?.status}
								className={`sidebar-contact__message-icon ${
									lastMessage?.status === "read"
										? "sidebar-contact__message-icon--blue"
										: ""
								}`}
							/>
						)}
						<span
							className={`sidebar-contact__message ${
								!!contact.unread ? "sidebar-contact__message--unread" : ""
							}`}
						>
							{contact.typing ? <i> typing...</i> : lastMessage?.content}
						</span>
					</p>
					<div className="sidebar-contact__icons">
						{/*{contact.pinned && (*/}
						{/*	<Icon id="pinned" className="sidebar-contact__icon" />*/}
						{/*)}*/}
						{/*{!!contact.unread && (*/}
						{/*	<span className="sidebar-contact__unread">{contact.unread}</span>*/}
						{/*)}*/}
						<button aria-label="sidebar-contact__btn">
							<Icon
								id="downArrow"
								className="sidebar-contact__icon sidebar-contact__icon--dropdown"
							/>
						</button>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default Contact;
