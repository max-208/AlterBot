module.exports = (sequelize, DataTypes) => {
	return sequelize.define('joueurs', {
		user_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		nom_pays: DataTypes.STRING,
		race: DataTypes.STRING,
		or: {
			balance: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
				allowNull: false,
			},
			gain: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
				allowNull: false,
			},
			perte: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
				allowNull: false,
			},
		},
		nourriture: {
			balance: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
				allowNull: false,
			},
			gain: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
				allowNull: false,
			},
			perte: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
				allowNull: false,
			},
		},
		culture: {
			balance: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
				allowNull: false,
			},
			gain: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
				allowNull: false,
			},
			perte: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
				allowNull: false,
			},
		},
		foi: {
			balance: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
				allowNull: false,
			},
			gain: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
				allowNull: false,
			},
			perte: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
				allowNull: false,
			},
		},
	}, {
		timestamps: false,
	});
};