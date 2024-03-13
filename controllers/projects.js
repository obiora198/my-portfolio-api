const Project = require("../models/project");
const NotFoundError = require("../errors/not-found");
const BadRequestError = require("../errors/bad-request");
const { uploadImages, deleteImages } = require("../config/cloudinary");

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
  let images = req.files;
  images = await uploadImages(images);
  // res.json(images);
  if (!images || images.length < 1) {
    throw new BadRequestError("no image provided");
  }

  req.body.images = images;
  const newProject = await Project.create(req.body);
  res.status(201).json({ newProject });
};

const createproject = async (req, res) => {
  const images = req.files;
  images.forEach((image, i) => {
    console.log(image.path, i);
  });
  res.json(req.files);
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
  createproject,
};
