const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
})

const User = require('./models/User')(sequelize, DataTypes)
const Movie = require('./models/Movie')(sequelize, DataTypes)
const Genre = require('./models/Genre')(sequelize, DataTypes)
const Distributor = require('./models/Distributor')(sequelize, DataTypes)

Genre.hasMany(Movie)
Movie.belongsTo(Genre)

Distributor.hasMany(Movie)
Movie.belongsTo(Distributor)

sequelize.sync({
    alter: {
        drop: false
    }
})

module.exports = {
    sequelize: sequelize,
    User: User
}