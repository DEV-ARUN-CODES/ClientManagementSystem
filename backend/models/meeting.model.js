module.exports = (sequelize, DataTypes) => {
    const Meeting = sequelize.define("meeting", {
        meeting_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        meeting_date: {
            type: DataTypes.DATE
        },
        meeting_time: {
            type: DataTypes.TIME
        },

        meeting_agenda: {
            type: DataTypes.STRING
        },
        client_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'clients',
                key: 'client_id'
            }
        }
    }, { timestamps: false });

    return Meeting;
}