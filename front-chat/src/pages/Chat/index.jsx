import React, { useEffect, useState } from "react";
import "./styles/main.css";
import ChatInput from "./components/ChatInput";
import Header from "./components/Header";
import ChatSidebar from "./components/ChatSidebar";
import Profile from "./components/Profile";
import {useParams} from "react-router-dom";
import {useCreateChat, useCreateMessages, useGetChat, useUpdateMessage} from "../../hooks/useApi";
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
	const [editMode, setEditMode] = useState(false);
	const [editedMessageId, setEditedMessageId] = useState(null);

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

	const UpdateMessage = (editedMessageId, newMessage) => {
		useUpdateMessage(editedMessageId, {content: newMessage}).then(() => {
			setMessages(messages.map((message) => {
				if (message.id === editedMessageId) {
					return { ...message, content: newMessage, updatedAt: new Date() };
				}
				return message;
			}));
		});
	}

	const openSidebar = (cb) => {
		setShowProfileSidebar(false);
		cb(true);
	};

	const submitNewMessage = () => {
		 if (editMode) {
			 UpdateMessage(editedMessageId, newMessage);
		 } else {
			 // eslint-disable-next-line react-hooks/rules-of-hooks
			 useCreateMessages({content: newMessage, chatId: newChatId})
		 }
	    setEditMode(false)
		setEditedMessageId(null)
		setNewMessage("");
	};

	const handleMessages = (newMessages) => {
		setMessages(newMessages);
	};

	const handleEditMode = () => {
		setEditMode(!editMode)
	};
	const handleEditedMessageId = (editedMessageId) => {
		setEditedMessageId(editedMessageId)
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
					<Convo messages={messages}
						   loggedInUserId={loggedInUserId}
						   setMessages={handleMessages}
						   setEditMode={handleEditMode}
						   setEditedMessageId={handleEditedMessageId}
						   setNewMessage={setNewMessage}
					/>
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
