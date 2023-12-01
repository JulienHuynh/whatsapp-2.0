import React, {useState} from "react";

const Profile = ({ user, closeSidebar }) => {
	const [firstName, setFirstName] = useState(user.firstName);
	const [lastName, setLastName] = useState(user.lastName);
	const [email, setEmail] = useState(user.email);
	const [password, setPassword] = useState("");

	const saveProfile = () => {
		console.log("save profile");
		closeSidebar();
	}

	return (
		<div className="profile">
			<div className="profile__section profile__section--personal">
				<div className="profile__avatar-wrapper">
					<img src={user.profile_picture} alt={user.firstName} className="avatar" />
				</div>
				<h2 className="profile__name"> {user.firstName} {user.lastName} </h2>
			</div>

			<div className="profile__section profile__section--about">
				<div className="sb profile__heading-wrapper">
					<h2 className="profile__heading"> Nom et adresse email </h2>
				</div>
				<ul>
					<input type={"text"} onChange={(e) => setFirstName(e.target.value)} className="profile__about-item" value={firstName}></input>
					<input type={"text"} onChange={(e) => setLastName(e.target.value)} className="profile__about-item" value={lastName}></input>
					<input type={"email"} onChange={(e) => setEmail(e.target.value)} className="profile__about-item" value={email}></input>
				</ul>
			</div>

			<div className="profile__section profile__section--about">
				<div className="sb profile__heading-wrapper">
					<h2 className="profile__heading"> Mot de passe </h2>
				</div>
				<ul>
					<input type={"password"} onChange={(e) => setPassword(e.target.value)} className="profile__about-item" value={password} placeholder={"*****************"}></input>
				</ul>
			</div>

			<button className="profile__section save-btn" onClick={saveProfile}>
				<p className="profile__danger-text"> Modifier </p>
			</button>

		</div>
	);
};

export default Profile;
