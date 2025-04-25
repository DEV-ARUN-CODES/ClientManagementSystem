module.exports = {
    HOST: "localhost",
    port: 3306,
    DB: "Client_Management_System",
    USER: "root",
    PASSWORD: "Login@123",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};