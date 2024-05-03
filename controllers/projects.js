const Project = require("../models/project");
const NotFoundError = require("../errors/not-found");
const deleteImages = require("../config/cloudinary-delete-image");

const getAllProjects = async (req, res) => {
  const projects = await Project.find({});
  res.status(200).json({ nbHits: projects.length, data: projects });
};

const getSingleproject = async (req, res) => {
  const { id: projectID } = req.params;
  const project = await Project.findOne({ _id: projectID });
  if (!project) {
    throw new NotFoundError(`project with id: ${projectID} doens't exist`);
  }
  res.status(200).json({ project });
};

const createNewproject = async (req, res) => {
  const newProject = await Project.create(req.body);
  res.status(201).json({ newProject });
};

const deleteImage = async (req, res) => {
  const {images} = req.body;
  deleteImages(images)
  res.json('images deleted',images);
};

const updateProject = async (req, res) => {
  const { id: projectID } = req.params;
  const project = await Project.findOneAndUpdate({ _id: projectID }, req.body, {
    runValidators: true,
    new: true,
  });
  if (!project) {
    throw new NotFoundError(`project with id: ${projectID} doens't exist`);
  }

  res.status(200).json({ project });
};

const deleteproject = async (req, res) => {
  const { id: projectID } = req.params;
  const project = await Project.findOneAndDelete({ _id: projectID });
  if (!project) {
    throw new NotFoundError(`project with id: ${projectID} doens't exist`);
  }
  deleteImages(project.images);
  res.status(200).json({ project });
};

module.exports = {
  getAllProjects,
  getSingleproject,
  createNewproject,
  updateProject,
  deleteproject,
  deleteImage,
};
