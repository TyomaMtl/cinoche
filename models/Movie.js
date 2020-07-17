module.exports = (sequelize, DataTypes) => {

    let model = sequelize.define('Movie', {

        title: {
            type: DataTypes.STRING,
            allowNull: false
        }

    })

    return model
}