import React from "react";

const Header = ({ user, openProfileSidebar }) => {
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
				<button>
					Se déconnecter
				</button>
			</div>

		</header>
	);
};

export default Header;
