const express = require('express')
const router = express.Router()
const upload = require('../middlewares/upload')

const {
    getAllProjects,
    getSingleproject,
    createNewproject,
    updateProject,
    deleteproject
} = require('../controllers/projects')

router.route('/').get(getAllProjects).post(upload.single('image'),createNewproject)
router.route('/:id').get(getSingleproject).patch(upload.single('image'),updateProject).delete(deleteproject)

module.exports = router