const Projects = require('./projects-model');

function validateProjectId(req, res, next) {
    const { id } = req.params;
    Projects.get(id)
      .then(possibleProject => {
        if (possibleProject) {
          req.project = possibleProject;
          next();
        } else {
            next({ message: `Project ${req.method} Request Unsuccessful: A Project with the Provided ID does not exist`, status: 404 });
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
      !req.body.description.trim() ||
      (req.method === 'PUT' && typeof req.body.completed !== ('boolean'))
    ) {
        next({ message: `Project ${req.method} Request Unsuccessful: Name & Description are Required`, status: 400 });
    } else {
      next();
    }
}


module.exports = { validateProjectId, validateProject }