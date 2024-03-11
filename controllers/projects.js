const Project = require("../models/project");
const NotFoundError = require('../errors/not-found')
const BadRequestError = require('../errors/bad-request')
const cloudinaryUpload = require('../config/cloudinary')

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
  const image = cloudinaryUpload(req.file.path)
  if(!image) {
    throw new BadRequestError('no image provided')
  }
  req.body.image = image;
  const newProject = await Project.create(req.body);
  res.status(201).json({ newProject });
};

const updateProject = async (req, res) => {
  const { id: projectID } = req.params;
  const image = cloudinaryUpload(req.file.path)
  if (image) {
    req.body.image = image.path;
  }
  const project = await Project.findOneAndUpdate({ _id: projectID }, req.body, {
    runValidators: true,
  });
  if (!project) {
    throw new NotFoundError(`project with id: ${projectID} doens't exist`)
  }

  res.status(200).json({ project });
};

const deleteproject = async (req, res) => {
  const { id: projectID } = req.params;
  const project = await Project.findOneAndDelete({ _id: projectID });
  if (!project) {
    throw new NotFoundError(`project with id: ${projectID} doens't exist`)
  }
  res.status(200).json({ project });
};

module.exports = {
  getAllProjects,
  getSingleproject,
  createNewproject,
  updateProject,
  deleteproject,
};
