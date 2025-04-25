const dbConfig = require('../config/db.config');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.project = require('./project.model.js')(sequelize, DataTypes);
db.client = require('./client.model.js')(sequelize, DataTypes);
db.meeting = require('./meeting.model.js')(sequelize, DataTypes);

db.project.hasMany(db.client, {
    foreignKey: 'project_id'
});
db.client.belongsTo(db.project, {
    foreignKey: 'project_id'
});
db.client.hasMany(db.meeting, {
    foreignKey: 'client_id'
});
db.meeting.belongsTo(db.client, {
    foreignKey: 'client_id'
});

module.exports = db;
