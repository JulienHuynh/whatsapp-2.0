import React, { useEffect, useRef, useState } from "react";
import "./styles/main.css";
import ChatInput from "./components/ChatInput";
import Header from "./components/Header";
import ChatSidebar from "./components/ChatSidebar";
import Icon from "components/Icon";
import Profile from "./components/Profile";
import Convo from "./components/Convo";
import { useUsersContext } from "context/usersContext";
import pp from "../../assets/images/default-pp.png";

const Chat = ({ match, history }) => {
	const { users, setUserAsUnread, addNewMessage } = useUsersContext();

	const userId = match.params.id;
	let user = users.filter((user) => user.id === Number(userId))[0];

	const lastMsgRef = useRef(null);
	const [showAttach, setShowAttach] = useState(false);
	const [showProfileSidebar, setShowProfileSidebar] = useState(false);
	const [newMessage, setNewMessage] = useState("");
	const [loggedInUser, setLoggedInUser] = useState({id: 2, profile_picture: pp, firstName: "Le rappeur", lastName: "damso", email: "lemaildedamso@gmail.com"});

	useEffect(() => {
		if (!user) history.push("/");
		else {
			scrollToLastMsg();
			setUserAsUnread(user.id);
		}
	}, []);

	useEffect(() => {
		user && scrollToLastMsg();
	}, [users]);

	const openSidebar = (cb) => {
		setShowProfileSidebar(false);
		cb(true);
	};

	const scrollToLastMsg = () => {
		lastMsgRef.current.scrollIntoView();
	};

	const submitNewMessage = () => {
		addNewMessage(user.id, newMessage);
		setNewMessage("");
		scrollToLastMsg();
	};

	return (
		<div className="chat">
			<div className="chat__body">
				<div className="chat__bg"></div>

				<Header
					user={user}
					openProfileSidebar={() => openSidebar(setShowProfileSidebar)}
				/>
				<div className="chat__content">
					<Convo lastMsgRef={lastMsgRef} messages={user.messages} />
				</div>
				<footer className="chat__footer">
					<button
						className="chat__scroll-btn"
						aria-label="scroll down"
						onClick={scrollToLastMsg}
					>
						<Icon id="downArrow" />
					</button>
					
					<ChatInput
						
						showAttach={showAttach}
						setShowAttach={setShowAttach}
						newMessage={newMessage}
						setNewMessage={setNewMessage}
						submitNewMessage={submitNewMessage}
					/>
				</footer>
			</div>
			<ChatSidebar
				heading="Mon profil"
				active={showProfileSidebar}
				closeSidebar={() => setShowProfileSidebar(false)}
			>
				<Profile user={loggedInUser} closeSidebar={() => setShowProfileSidebar(false)}/>
			</ChatSidebar>
		</div>
	);
};

export default Chat;
