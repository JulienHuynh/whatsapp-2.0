/** Import des module nécessaires */
const { DataTypes } = require("sequelize");

/** Définition du modèle */
module.exports = (sequelize) => {
	const User = sequelize.define(
		"User",
		{
			id: {
				type: DataTypes.INTEGER(10),
				primaryKey: true,
				autoIncrement: true,
			},
			firstname: {
				type: DataTypes.STRING(100),
				defaultValue: "",
				allowNull: false,
			},
			lastname: {
				type: DataTypes.STRING(100),
				defaultValue: "",
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING(100),
				validate: {
					isEmail: true,
				},
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING(100),
				Is: /^[0-9a-f]{64}$/i,
				allowNull: false,
			},
		},
		{ paranoid: true }
	);

	/* Hook Sequelize */
	User.beforeCreate(async (user, options) => {
		/* Hashage du mot de passe */
		let hash = await bcrypt.hash(user.password, parseInt(process.env.BCRYPT_SALT_ROUND));
		user.password = hash;
	});

	/* Méthode de vérification de mot de passe */
	User.checkPassword = async (password, original) => {
		return await bcrypt.compare(password, original);
	};

	return User;
};
