module.exports = (sequelize, DataTypes) => {

    let model = sequelize.define('Genre', {

        name: {
            type: DataTypes.STRING,
            allowNull: false
        }

    })

    return model
}