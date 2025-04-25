module.exports = (sequelize, DataTypes) => {
    const Client = sequelize.define("client", {
        client_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        client_name: {
            type: DataTypes.STRING
        },
        company: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING

        },
        project_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'projects',
                key: 'project_id'
            }
        }
    }, { timestamps: false });

    return Client;
}