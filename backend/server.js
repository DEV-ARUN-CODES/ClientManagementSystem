const express = require("express");
const cors = require("cors");
const db = require("./models");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/projects", require("./routes/projects.routes"));
app.use("/api/clients", require("./routes/clients.routes"));
app.use("/api/meetings", require("./routes/meetings.routes"));

app.get("/", (req, res) => {
    res.send("Server is working ✅");
});


db.sequelize.sync({ force: false }).then(() => {
    console.log("✅ Database synced successfully");
    app.listen(3000, () => {
        console.log("Server is running on http://localhost:3000");
    });
}).catch((err) => {
    console.error("❌ Failed to sync database:", err);
});
