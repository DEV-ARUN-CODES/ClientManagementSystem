module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define("project", {
        project_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        project_name: {
            type: DataTypes.STRING
        },
        start_date: {
            type: DataTypes.DATE
        },
        end_date: {
            type: DataTypes.DATE
        },
        duration: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING
        }
    }, { timestamps: false });

    return Project;
}           