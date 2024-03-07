const Project = require('../models/project')
const fs = require('fs')

const getAllProjects =async (req,res) => {
    const projects = await Project.find({})
    res.status(200).json({projects})
}

const getSingleproject = async (req,res) => {
    const {id:projectID} = req.params
    const project = await Project.findOne({_id:projectID})
    if(!project) {
        return res.status(401).json({msg: `no project with id: ${projectID}`})
    }
    res.status(200).json({project})
}

const createNewproject = async (req,res) => {
    const image = req.file.path
    req.body.image = image
    const newProject = await Project.create(req.body)
    res.status(201).json({newProject})
}

const updateProject = async (req,res) => {
    const {id:projectID} = req.params
    const image = req.file
    if(image) {
        req.body.image = image.path
    }
    const project = await Project.findOneAndUpdate({_id:projectID},req.body,{runValidators:true})
    if(!project) {
        return res.status(401).json({msg: `no project with id: ${projectID}`})
    }
    if(image){
        const oldImagePath = project.image
        fs.unlink(oldImagePath, (err) => {
            if (err) {
              console.error(err)
              return
            }
            console.log('old image removed successfully');
          return
          })
    }
    res.status(200).json({project})
}

const deleteproject = async (req,res) => {
    const {id:projectID} = req.params
    const project = await Project.findOneAndDelete({_id:projectID})
    if(!project) {
        return res.status(401).json({msg: `no project with id: ${projectID}`})
    }
    res.status(200).json({project})
}

module.exports = {
    getAllProjects,
    getSingleproject,
    createNewproject,
    updateProject,
    deleteproject
}