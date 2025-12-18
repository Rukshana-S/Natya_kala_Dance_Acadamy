const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const optionalAuthMiddleware = require('../middleware/optionalAuthMiddleware');
const multer = require('multer');
const path = require('path');

// Configure Multer for local storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({ storage: storage });

// Public + Private View (Optional Auth)
router.get('/', optionalAuthMiddleware, galleryController.getAllGalleryItems);
router.get('/:type', optionalAuthMiddleware, galleryController.getGalleryByAlbum);

// Admin Only Routes
// Note: 'media' is the field name for the file in the form data
router.post('/', authMiddleware, adminMiddleware, upload.single('media'), galleryController.createGalleryItem);
router.patch('/:id', authMiddleware, adminMiddleware, galleryController.updateGalleryItem);
router.delete('/:id', authMiddleware, adminMiddleware, galleryController.deleteGalleryItem);

module.exports = router;
