import React, { useEffect, useRef, useState } from "react";
import "./styles/main.css";
import ChatInput from "./components/ChatInput";
import Header from "./components/Header";
import ChatSidebar from "./components/ChatSidebar";
import Icon from "components/Icon";
import Profile from "./components/Profile";
import {useParams} from "react-router-dom";
import {useCreateChat, useCreateMessages, useGetChat} from "../../hooks/useApi";
import Cookies from "js-cookie";
import Convo from "./components/Convo";

const Chat = () => {

	const interlocutorId = parseInt(useParams().id);

	const [showAttach, setShowAttach] = useState(false);
	const [showProfileSidebar, setShowProfileSidebar] = useState(false);
	const [newMessage, setNewMessage] = useState("");
	const [newChatId, setChatId] = useState(null);
	const [messages, setMessages] = useState([]);
	const loggedInUserId = parseInt(Cookies.get("user_id"));

	useEffect(() => {
		GetChat();
	}, [interlocutorId]);

	const GetChat = () => {
		let usersIds = {userIds : `[${loggedInUserId},${interlocutorId}]`};
		useGetChat(usersIds).then((response) => {
			setChatId(response.data.data.id)
			setMessages(response.data.data.Messages);
		}).catch(error => {
			if (error.response.data.status === 400) {
				CreateChat();
			}
		});
	}

	const CreateChat = () => {
		let usersIds = {userIds : `[${loggedInUserId},${interlocutorId}]`};
		useCreateChat(usersIds);
	}

	const openSidebar = (cb) => {
		setShowProfileSidebar(false);
		cb(true);
	};

	const submitNewMessage = () => {
		 
		// eslint-disable-next-line react-hooks/rules-of-hooks
		useCreateMessages({content:newMessage,chatId:newChatId})
		setNewMessage("");
		 
	};

	return (
		<div className="chat">
			<div className="chat__body">
				<div className="chat__bg"></div>

				<Header
					interlocutorId={interlocutorId}
					openProfileSidebar={() => openSidebar(setShowProfileSidebar)}
				/>
				<div className="chat__content">
					<Convo messages={messages} loggedInUserId={loggedInUserId}/>
				</div>
				<footer className="chat__footer">
					{/*<button*/}
					{/*	className="chat__scroll-btn"*/}
					{/*	aria-label="scroll down"*/}
					{/*	onClick={scrollToLastMsg}*/}
					{/*>*/}
					{/*	<Icon id="downArrow" />*/}
					{/*</button>*/}
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
				<Profile loggedInUserId={loggedInUserId} closeSidebar={() => setShowProfileSidebar(false)}/>
			</ChatSidebar>
			</div>
	);
};

export default Chat;
