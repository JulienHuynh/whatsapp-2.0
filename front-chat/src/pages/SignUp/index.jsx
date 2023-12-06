import React, { useContext, useState } from "react";
import useSignIn from "../../hooks/useSignIn";
import { errorMessageContext } from "../../context/errorMessageContext";
import { jwtAuthTokenContext } from "../../context/jwtAuthTokenContext";
import { Link, useNavigate } from "react-router-dom";
import "./styles/main.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useContext(errorMessageContext);
  // eslint-disable-next-line no-unused-vars
  const [authToken, setAuthToken] = useContext(jwtAuthTokenContext);
  const navigate = useNavigate();

  const LoginFunction = () => {
    console.log(email, password);
    useSignIn({ email, password }).then((response) => {
      if (response.status !== 200) {
        setErrorMessage(response.message);
      } else {
        setErrorMessage("");
        setAuthToken(response.token);
        navigate("/");
      }
    });
  };

  return (
    <React.Fragment>
      <div className="login-page">
        <div className="container-login">
          <form className="col-log">
            <div className={"login-form card"}>
              <div className="card-body">
                <h1 className="title">Inscription</h1>
                <input
                  type="email"
                  placeholder="Adresse mail"
                  className={"input"}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <input
                  placeholder="Mot de passe"
                  type="password"
                  className={"input"}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                {errorMessage && (
                  <p className={"error-message"}>{errorMessage}</p>
                )}
                <button
                  className={"submit-btn"}
                  onClick={() => LoginFunction()}
                >
                  S'inscrire
                </button>
                <p className="go-sub">
                  <p>Vous avez déjà un compte ?</p>
                  <Link to={"/se-connecter"}  >
                    Connectez-vous !
                  </Link>
                </p>
                 
              </div>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
