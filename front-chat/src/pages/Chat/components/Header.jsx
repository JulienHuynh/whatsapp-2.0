import React, {useContext} from "react";
import {jwtAuthTokenContext} from "../../../context/jwtAuthTokenContext";
import Cookies from "js-cookie";
import {useLocation} from "react-router-dom";

const Header = ({ user, openProfileSidebar }) => {
	const [authToken, setAuthToken] = useContext(jwtAuthTokenContext);
	const location = useLocation();

	const disconnectUser = () => {
		Cookies.remove('authToken');
		setAuthToken('');
		if (location.pathname === '/') {
			window.location.reload();
		}
	}

	return (
		<header className="header chat__header">
			<div className="chat__avatar-wrapper">
				<img src={user.profile_picture} alt={user?.name} className="avatar" />
			</div>

			<div className="chat__contact-wrapper">
				<h2 className="chat__contact-name"> {user?.name}</h2>
				<p className="chat__contact-desc">
					{user.typing ? "typing..." : "online"}
				</p>
			</div>

			<div className="menu-actions">
				<button onClick={openProfileSidebar}>
					Profil
				</button>
				<button onClick={disconnectUser}>
					Se déconnecter
				</button>
			</div>

		</header>
	);
};

export default Header;
