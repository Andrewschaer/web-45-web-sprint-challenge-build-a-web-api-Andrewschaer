const Projects = require('./projects-model');

function validateProjectId(req, res, next) {
    const { id } = req.params;
    Projects.get(id)
      .then(possibleProject => {
        if (possibleProject) {
          req.project = possibleProject;
          next();
        } else {
            next({ message: 'Project not found', status: 404 });
        }
      })
      .catch(next);
}

function validateProject(req, res, next) {
    if (
      !req.body.name || 
      !req.body.description ||
      typeof req.body.name !== 'string' || 
      typeof req.body.description !== 'string' ||
      !req.body.name.trim() ||
      !req.body.description.trim()
    ) {
        next({ message: 'New Project Post Unsuccessful: A new project must include a name & description', status: 400 });
    } else {
      next();
    }
}

module.exports = { validateProjectId, validateProject }