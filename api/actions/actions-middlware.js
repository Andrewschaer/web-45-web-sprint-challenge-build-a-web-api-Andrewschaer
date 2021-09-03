const Actions = require('./actions-model');
const Projects = require('../projects/projects-model');

function validateActionId(req, res, next) {
    const { id } = req.params;
    Actions.get(id)
      .then(possibleAction => {
        if (possibleAction) {
          req.project = possibleAction;
          next();
        } else {
            next({ message: `Action ${req.method} Request Unsuccessful: An Action with the Provided ID does not exist`, status: 404 });
        }
      })
      .catch(next);
}

function validateProjectId(req, res, next) {
    const id = req.body.project_id;
    Projects.get(id)
      .then(possibleProject => {
        if (possibleProject) {
          req.project = possibleProject;
          next();
        } else {
            next({ message: `Action ${req.method} Request Unsuccessful: A Project with the Provided Project_id does not exist`, status: 404 });
        }
      })
      .catch(next);
}

function validateAction(req, res, next) {
    if (
      !req.body.project_id || 
      !req.body.description ||
      !req.body.notes ||
      typeof req.body.description !== 'string' ||
      typeof req.body.notes !== 'string' ||
      !req.body.description.trim() ||
      !req.body.notes.trim() ||
      req.body.description.length > 128 ||
      (req.method === 'PUT' && typeof req.body.completed !== ('boolean'))
    ) {
        next({ message: `Action ${req.method} Request Unsuccessful: Action Description (up to 128 char.) & Notes are Required`, status: 400 });
    } else {
      next();
    }
}

module.exports = { validateActionId, validateProjectId, validateAction }