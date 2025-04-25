const express = require("express");
const router = express.Router();
const db = require("../models");

const Client = db.client;


router.get("/", async (req, res) => {
    const clients = await Client.findAll();
    res.json(clients);
});


router.get("/:id", async (req, res) => {
    const client = await Client.findByPk(req.params.id);
    res.json(client);
});


router.post("/", async (req, res) => {
    const client = await Client.create(req.body);
    res.json(client);
});


router.put("/:id", async (req, res) => {
    await Client.update(req.body, { where: { client_id: req.params.id } });
    res.json({ message: "Client updated" });
});


router.delete("/:id", async (req, res) => {
    console.log(req, req.params, req.params.id)
    try {
        await Client.destroy({ where: { client_id: req.params.id } });

        res.json({ message: "Client deleted" });
    } catch (error) {
        res.status(400).json({ error: 'Failed to delete Client' });
    };
})

module.exports = router;
