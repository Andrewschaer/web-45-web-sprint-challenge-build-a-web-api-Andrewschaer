const Projects = require('./projects-model');

function validateProjectId(req, res, next) {
    // DO YOUR MAGIC
    const { id } = req.params;
    Projects.get(id)
      .then(possibleProject => {
        if (possibleProject) {
          req.project = possibleProject;
          next();
        } else {
            next({ message: 'Project not found', status: 404 })
        }
      })
      .catch(next);
}
module.exports = { validateProjectId }