const express = require("express");
const router = express.Router();
const db = require("../models");

const Meeting = db.meeting;


router.get("/", async (req, res) => {
    const meetings = await Meeting.findAll();
    res.json(meetings);
});


router.post("/", async (req, res) => {
    const meeting = await Meeting.create(req.body);
    res.json(meeting);
});


router.put("/:id", async (req, res) => {
    try {
        await Meeting.update(req.body, { where: { meeting_id: req.params.id } });
        res.json({ message: "Meeting updated" });
    } catch (error) {
        console.error("Update failed:", error);
        res.status(400).json({ error: "Failed to update meeting" });
    }
});



router.delete("/:id", async (req, res) => {
    await Meeting.destroy({ where: { meeting_id: req.params.id } });
    res.json({ message: "Meeting deleted" });
});

module.exports = router;
