const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    albumType: {
        type: String,
        enum: ['classroom-practice', 'stage-performances', 'arangetram', 'temple-programs'],
        default: 'classroom-practice'
    },
    mediaType: {
        type: String,
        enum: ['image', 'video'],
        default: 'image'
    },
    mediaUrl: {
        type: String,
        required: true
    },
    thumbnailUrl: {
        type: String
    },
    visibility: {
        type: String,
        enum: ['public', 'private'],
        default: 'public'
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Assuming User model exists
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Gallery', gallerySchema);
