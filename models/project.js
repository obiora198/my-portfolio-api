const mongoose = require('mongoose')

const descriptionValidator = (val) => {
    const wordCount = val.split(' ')
    return wordCount.length >= 10
}
const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true,'must provide a title']
    },
    description: {
        type: String,
        required: [true, 'say something about this project'],
        validate: [descriptionValidator, '{PATH} should be more than 10 words']
    },
    completed: {
        type: Boolean,
        default: false
    },
    link: {
        type: String,
    },
    images: {
        type: [],
        required:true
    },
})

module.exports = mongoose.model('Project', ProjectSchema)