const express = require('express');
const Projects = require('./projects-model');
const { validateProjectId } = require('./projects-middleware');

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

router.post('/', (req, res) => {

})

router.put('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {

})

router.get('/:id/actions', (req, res) => {

})

router.use((err, req, res, next) => {
    if(!err.message) {
        err.message = 'An error occurred while processing your request';
    }
    console.log(err.message);
    res.status(err.status || 500).json({
      message: err.message
    });
  });


module.exports = router;