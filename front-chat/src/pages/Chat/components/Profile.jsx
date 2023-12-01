import React from "react";

const Profile = ({ user }) => {
	return (
		<div className="profile">
			<div className="profile__section profile__section--personal">
				<div className="profile__avatar-wrapper">
					<img src={user.profile_picture} alt={user.name} className="avatar" />
				</div>
				<h2 className="profile__name"> {user.name} </h2>
			</div>

			<div className="profile__section profile__section--about">
				<div className="sb profile__heading-wrapper">
					<h2 className="profile__heading"> About and phone number </h2>
				</div>
				<ul>
					<li className="profile__about-item">
						Out here saving the world, one block of code at a time.
					</li>
					<li className="profile__about-item">+23423456789</li>
				</ul>
			</div>

		</div>
	);
};

export default Profile;
