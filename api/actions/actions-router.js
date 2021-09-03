const express = require('express');
const Actions = require('./actions-model');
const { validateActionId, validateProjectId, validateAction } = require('./actions-middlware');

const router = express.Router();

router.get('/', (req, res, next) => {
    Actions.get()
        .then(allActions => {
            res.status(200).json(allActions);
        })
        .catch(error => {
            next(error);
        });
});

router.get('/:id', validateActionId, (req, res, next) => {
    Actions.get(req.params.id)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(error => {
            next(error);
        });
});

router.post('/', validateProjectId, validateAction, (req, res, next) => {
    Actions.insert(req.body)
    .then(newAction => {
        res.status(200).json(newAction);
    })
    .catch(error => {
        next(error);
    });
});

router.put('/:id', validateActionId, validateProjectId, validateAction, (req, res, next) => {
    Actions.update(req.params.id, req.body)
        .then(updatedAction => {
            res.status(200).json(updatedAction);
        })
        .catch(error => {
            next(error);
        });
});

router.delete('/:id', validateActionId, (req, res, next) => {
    Actions.remove(req.params.id)
        .then( () => {
            res.status(200).json();
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