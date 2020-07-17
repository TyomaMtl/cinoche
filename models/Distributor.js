module.exports = (sequelize, DataTypes) => {

    let model = sequelize.define('Distributor', {

        name: {
            type: DataTypes.STRING,
            allowNull: false
        }

    })

    return model
}