const express = require('express')
const router = express.Router()

const {
    getAllProjects,
    getSingleproject,
    createNewproject,
    updateProject,
    deleteproject
} = require('../controllers/projects')

router.route('/').get(getAllProjects).post(createNewproject)
router.route('/:id').get(getSingleproject).patch(updateProject).delete(deleteproject)

module.exports = router