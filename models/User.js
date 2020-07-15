module.exports = (sequelize, DataTypes) => {

    let model = sequelize.define('User', {

        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }

    })

    return model
}