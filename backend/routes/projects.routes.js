const express = require('express');
const router = express.Router();
const db = require('../models');
const Project = db.project;


router.get('/', async (req, res) => {
    try {
        const projects = await Project.findAll();
        res.json(projects);
    } catch (error) {
        console.error("🔥 Error in GET /api/projects:", error);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});




router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (project) {
            res.json(project);
        } else {
            res.status(404).json({ error: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch project' });
    }
});


router.post('/', async (req, res) => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create project' });
    }
});


router.put('/:id', async (req, res) => {
    try {
        await Project.update(req.body, {
            where: {
                project_id: req.params.id
            }
        });
        res.json({ message: 'Project updated' });
    } catch (error) {
        res.status(400).json({ error: 'Failed to update project' });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        await Project.destroy({
            where: {
                project_id: req.params.id
            }
        });
        res.json({ message: 'Project deleted' });
    } catch (error) {
        res.status(400).json({ error: 'Failed to delete project' });
    }
});

module.exports = router;
