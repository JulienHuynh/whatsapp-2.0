import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "./assets/css/index.css";
import { UsersProvider } from "context/usersContext";
import { SocketProvider } from "context/socketContext";
import JwtAuthTokenContext from "context/jwtAuthTokenContext";
import ErrorMessageContext from "context/errorMessageContext";

ReactDOM.render(
	<React.StrictMode>
		<JwtAuthTokenContext>
			<ErrorMessageContext>
				<SocketProvider>
					<UsersProvider>
						<App />
					</UsersProvider>
				</SocketProvider>
			</ErrorMessageContext>
		</JwtAuthTokenContext>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
