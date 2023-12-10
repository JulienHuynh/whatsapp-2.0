import React, {useEffect, useRef, useState} from "react";
import "./styles/main.css";
import ChatInput from "./components/ChatInput";
import Header from "./components/Header";
import ChatSidebar from "./components/ChatSidebar";
import Profile from "./components/Profile";
import {useParams} from "react-router-dom";
import {useCreateChat, useCreateMessages, useGetChat, useUpdateMessage} from "../../hooks/useApi";
import Cookies from "js-cookie";
import Convo from "./components/Convo";
import { useSocketContext } from "context/socketContext";

const Chat = () => {

	const interlocutorId = parseInt(useParams().id);

	const socket = useSocketContext();
	const [showAttach, setShowAttach] = useState(false);
	const [showProfileSidebar, setShowProfileSidebar] = useState(false);
	const [newMessage, setNewMessage] = useState("");
	const [newChatId, setChatId] = useState(null);
	const [messages, setMessages] = useState([]);
	const loggedInUserId = parseInt(Cookies.get("user_id"));
	const [editMode, setEditMode] = useState(false);
	const [editedMessageId, setEditedMessageId] = useState(null);
	const bottomRef = useRef(document.getElementById("bottomRef"));

	const scrollToBottom = () => {
		if (bottomRef.current) {
			bottomRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	};

	useEffect(() => {
		setMessages([]);
		GetChat();
	}, [interlocutorId]);

	const GetChat = () => {
		let usersIds = {userIds : `[${loggedInUserId},${interlocutorId}]`};
		useGetChat(usersIds).then((response) => {
			setChatId(response.data.data.id)
			setMessages(response.data.data.Messages);
			socket.emit('joinRoom', response.data.data.id);
		}).catch(error => {
			if (error.response.data.status === 400) {
				CreateChat();
			}
		});

		scrollToBottom();
	}

	const CreateChat = () => {
		let usersIds = {userIds : `[${loggedInUserId},${interlocutorId}]`};
		useCreateChat(usersIds).then((response) => {
			setChatId(response.data.data.id)
			socket.emit('joinRoom', response.data.data.id);
		});
		console.log("Création de la salle")
	}

	const UpdateMessage = (editedMessageId, newMessage) => {
		useUpdateMessage(editedMessageId, {content: newMessage}).then((response) => {
			socket.emit('updateMessage', {message: response.data.data, chatId: newChatId});
			setMessages(messages.map((message) => {
				if (message.id === editedMessageId) {
					return { ...message, content: newMessage, updatedAt: new Date() };
				}
				return message;
			}));
		});
	}

	const CreateMessage = (newMessage, newChatId) => {
		let message = {};
		useCreateMessages({content: newMessage, chatId: newChatId}).then((response) => {
			message = { ...response.data.data, UserId: loggedInUserId};
			socket.emit('newMessage', {message: message, chatId: newChatId});
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
			 CreateMessage(newMessage, newChatId);
			 scrollToBottom();
		 }
	    setEditMode(false)
		setEditedMessageId(null)
		setNewMessage("");
	};

	useEffect(() => {
		// Écoute des nouveaux messages du serveur
		socket.on('messageToDispatch', (data) => {
			if (data.chatId === newChatId) {
				setMessages((prevMessages) => [...prevMessages, data.message]);
				scrollToBottom();
			}
		});

		socket.on('updatedMessageToDispatch', (data) => {
			if (data.chatId === newChatId) {
				setMessages(messages.map((message) => {
					if (message.id === data.message.id) {
						return { ...message, content: data.message.content, updatedAt: data.message.updatedAt };
					}
					return message;
				}));
			}
		});

		socket.on('deletedMessageToDispatch', (data) => {
			if (data.chatId === newChatId)
				setMessages(messages.filter((message) => message.id !== data.messageId));
		});

		return () => {
			// Nettoyage du gestionnaire d'événements lors du démontage du composant
			socket.off('messageToDispatch');
		};
	}, [submitNewMessage]);

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
						   chatId={newChatId}
					/>
					<div id={"bottomRef"} ref={bottomRef}></div>
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
