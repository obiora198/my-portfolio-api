const Project = require("../models/project");
const deleteImage = require("../middlewares/delete-image");
const NotFoundError = require('../errors/not-found')

const getAllProjects = async (req, res) => {
  const projects = await Project.find({});
  res.status(200).json({ projects });
};

const getSingleproject = async (req, res) => {
  const { id: projectID } = req.params;
  const project = await Project.findOne({ _id: projectID });
  if (!project) {
    throw new NotFoundError(`project with id: ${projectID} doens't exist`)
  }
  res.status(200).json({ project });
};

const createNewproject = async (req, res) => {
  const image = req.file.path;
  req.body.image = image;
  const newProject = await Project.create(req.body);
  res.status(201).json({ newProject });
};

const updateProject = async (req, res) => {
  const { id: projectID } = req.params;
  const image = req.file;
  if (image) {
    req.body.image = image.path;
  }
  const project = await Project.findOneAndUpdate({ _id: projectID }, req.body, {
    runValidators: true,
  });
  if (!project) {
    throw new NotFoundError(`project with id: ${projectID} doens't exist`)
  }
  if (image) {
    deleteImage(project.image);
  }
  res.status(200).json({ project });
};

const deleteproject = async (req, res) => {
  const { id: projectID } = req.params;
  const project = await Project.findOneAndDelete({ _id: projectID });
  if (!project) {
    throw new NotFoundError(`project with id: ${projectID} doens't exist`)
  }
  deleteImage(project.image);
  res.status(200).json({ project });
};

module.exports = {
  getAllProjects,
  getSingleproject,
  createNewproject,
  updateProject,
  deleteproject,
};
