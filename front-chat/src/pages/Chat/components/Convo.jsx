import Icon from "components/Icon";
import React from "react";
import media from "assets/images/default-pp.png";
import formatTime from "utils/formatTime";

const Convo = ({ lastMsgRef, messages: allMessages }) => {
	const dates = Object.keys(allMessages);

	return dates.map((date, dateIndex) => {
		const messages = allMessages;

		return (
			<div key={dateIndex}>
				<div className="chat__msg-group">
					{messages.map((message, msgIndex) => {
						const assignRef = () =>
							dateIndex === dates.length - 1 && msgIndex === messages.length - 1
								? lastMsgRef
								: undefined;
						return (
							<>
								{message.image ? (
									<div
										className={`chat__msg chat__img-wrapper ${
											message.sender ? "chat__msg--rxd" : "chat__msg--sent"
										}`}
										ref={assignRef()}
									>
										<img src={media} alt="" className="chat__img" />
										<span className="chat__msg-footer">
											<span>{formatTime(message.time)}</span>
											{!message.sender && (
												<Icon
													id={
														message?.status === "sent"
															? "singleTick"
															: "doubleTick"
													}
													aria-label={message?.status}
													className={`chat__msg-status-icon ${
														message?.status === "read"
															? "chat__msg-status-icon--blue"
															: ""
													}`}
												/>
											)}
										</span>

										<button
											aria-label="Message options"
											className="chat__msg-options"
										>
											<Icon id="downArrow" className="chat__msg-options-icon" />
										</button>
									</div>
								) : message.sender ? (
									<p className="chat__msg chat__msg--rxd" ref={assignRef()}>
										<span>{message.content}</span>
										<span className="chat__msg-filler"> </span>
										<span className="chat__msg-footer">
											{formatTime(message.time)}
										</span>
										<button
											aria-label="Message options"
											className="chat__msg-options"
										>
											<Icon id="downArrow" className="chat__msg-options-icon" />
										</button>
									</p>
								) : (
									<p className="chat__msg chat__msg--sent" ref={assignRef()}>
										<span>{message.content}</span>
										<span className="chat__msg-filler"> </span>
										<span className="chat__msg-footer">
											<span> {formatTime(message.time)} </span>
										</span>
										<button
											aria-label="Message options"
											className="chat__msg-options"
										>
											<Icon id="downArrow" className="chat__msg-options-icon" />
										</button>
									</p>
								)}
							</>
						);
					})}
				</div>
			</div>
		);
	});
};

export default Convo;
