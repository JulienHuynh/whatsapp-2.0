import React, { useState } from "react";
import { useUpdateProfile } from "../../../hooks/useApi";

const Profile = ({ user, closeSidebar }) => {
  const [firstname, setFirstName] = useState(user.firstname);
  const [lastname, setLastName] = useState(user.lastname);
  const [email, setEmail] = useState(user.email);

  const saveProfile = (event) => {
    event.preventDefault();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useUpdateProfile({ email, lastname, firstname }).then((response) => {
      if (response.status !== 200) {
        alert(response.message);
      } else {
		alert("Modification enregistré");
        closeSidebar();
      }
    });
  };

  return (
    <div className="profile">
      <div className="profile__section profile__section--personal">
        <div className="profile__avatar-wrapper">
          <img
            src={user.profile_picture}
            alt={user.firstName}
            className="avatar"
          />
        </div>
        <h2 className="profile__name">
          {" "}
          {user.firstName} {user.lastName}{" "}
        </h2>
      </div>

      <div className="profile__section profile__section--about">
        <div className="sb profile__heading-wrapper">
          <h2 className="profile__heading"> Nom et adresse email </h2>
        </div>
        <ul>
          <input
            type={"text"}
            onChange={(e) => setFirstName(e.target.value)}
            className="profile__about-item"
            value={firstname}
          ></input>
          <input
            type={"text"}
            onChange={(e) => setLastName(e.target.value)}
            className="profile__about-item"
            value={lastname}
          ></input>
          <input
            type={"email"}
            onChange={(e) => setEmail(e.target.value)}
            className="profile__about-item"
            value={email}
          ></input>
        </ul>
      </div>

     
      <button className="profile__section save-btn" onClick={saveProfile}>
        <p className="profile__danger-text"> Modifier </p>
      </button>
    </div>
  );
};

export default Profile;
