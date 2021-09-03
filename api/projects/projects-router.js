const express = require('express');
const Projects = require('./projects-model');
const { validateProjectId, validateProject } = require('./projects-middleware');

const router = express.Router();

router.get('/', (req, res, next) => {
    Projects.get()
        .then(allProjects => {
            res.status(200).json(allProjects);
        })
        .catch(error => {
            next(error);
        });
});

router.get('/:id', validateProjectId, (req, res, next) => {
    Projects.get(req.params.id)
        .then(project => {
            delete project.actions;
            res.status(200).json(project);
        })
        .catch(error => {
            next(error);
        });
});

router.post('/', validateProject, (req, res, next) => {
    Projects.insert(req.body)
        .then(newProject => {
            res.status(200).json(newProject);
        })
        .catch(error => {
            next(error);
        });
});

router.put('/:id', validateProjectId, validateProject, (req, res, next) => {
    Projects.update(req.params.id, req.body)
        .then(updatedProject => {
            res.status(200).json(updatedProject);
        })
        .catch(error => {
            next(error);
        });
});

router.delete('/:id', validateProjectId, (req, res, next) => {
    Projects.remove(req.params.id)
        .then( () => {
            res.status(200).json();
        })
        .catch(error => {
            next(error);
        });
});

router.get('/:id/actions', validateProjectId, (req, res, next) => {
    Projects.getProjectActions(req.params.id)
        .then(projActionsList =>{
            res.status(200).json(projActionsList);
        })
        .catch(error => {
            next(error);
        });
});

router.use((err, req, res, next) => {
    if(!err.message) {
        err.message = 'Request failed: An error occurred while processing your request';
    }
    console.log(err.message);
    res.status(err.status || 500).json({
      message: err.message
    });
});


module.exports = router;