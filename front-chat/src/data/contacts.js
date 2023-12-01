import pp from "assets/images/default-pp.png";
import getRandomSentence from "utils/getRandomSentence";

const users = [
	{
		id: 1,
		profile_picture: pp,
		name: "Julien Huynh",
		messages: [
			{
				content: getRandomSentence(),
				sender: 2,
				time: "08:11:26",
			},
			{
				content: getRandomSentence(),
				sender: null,
				time: "08:15:45",
			},
		]
	},
];

export default users;
