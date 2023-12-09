import Icon from "components/Icon";
import React from "react";
import formatTime from "../../../utils/formatTime";

const Convo = ({ messages, loggedInUserId }) => {

	return (
		<div className="chat__msg-group">
			{messages && messages.map((message, msgIndex) => (
				<React.Fragment key={msgIndex}>
					{ message.UserId !== loggedInUserId ? (
						<div className="chat__msg chat__msg--rxd">
							<p>
								<span>{message.content}</span>
								<span className="chat__msg-filler"> </span>

								<button
									aria-label="Message options"
									className="chat__msg-options"
								>
									<Icon id="downArrow" className="chat__msg-options-icon" />
								</button>
							</p>
							<span className="chat__msg-footer-left">
									{formatTime(message.createdAt)}
							</span>
						</div>

						) : (
							<div className="chat__msg chat__msg--sent">
								<p>
									<span>{message.content}</span>
									<span className="chat__msg-filler"> </span>
									<span className="chat__msg-footer">
								</span>
									<button
										aria-label="Message options"
										className="chat__msg-options"
									>
										<Icon id="downArrow" className="chat__msg-options-icon" />
									</button>
								</p>
								<span className="chat__msg-footer-right">
									{formatTime(message.createdAt)}
								</span>
							</div>
						)}
				</React.Fragment>
			))}
		</div>
	);
};

export default Convo;
