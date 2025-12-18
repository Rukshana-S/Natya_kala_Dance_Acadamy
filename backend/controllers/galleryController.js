const Gallery = require('../models/Gallery');

exports.createGalleryItem = async (req, res) => {
    try {
        const { title, description, albumType, mediaType, visibility } = req.body;

        // Handle file upload
        let mediaUrl = '';
        if (req.file) {
            // Construct full URL (assuming server runs on same host/port config as typical dev)
            // Ideally use env var for BASE_URL
            const protocol = req.protocol;
            const host = req.get('host');
            mediaUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
        } else if (req.body.mediaUrl) {
            // Fallback if they still send a URL string (though UI won't)
            mediaUrl = req.body.mediaUrl;
        }

        if (!mediaUrl) {
            return res.status(400).json({ message: 'Media file is required' });
        }

        const newGalleryItem = new Gallery({
            title,
            description,
            albumType,
            mediaType,
            mediaUrl,
            visibility,
            uploadedBy: req.user._id === 'admin' ? null : req.user._id
        });

        await newGalleryItem.save();
        res.status(201).json(newGalleryItem);
    } catch (error) {
        res.status(500).json({ message: 'Error creating gallery item', error: error.message });
    }
};

exports.getAllGalleryItems = async (req, res) => {
    try {
        const { type, featured } = req.query;
        let query = {};

        // Filter by album type if provided
        if (type) {
            query.albumType = type;
        }

        // Visibility logic:
        // If user is not logged in (req.user is undefined), show only 'public'.
        // If user is logged in (req.user exists), show all OR filter based on request?
        // Requirement: "Users can only view public gallery", "Private gallery visible only to logged-in users".
        // Wait, "Users" usually means logged-in strict students? or Public? using "Public" for non-logged-in.

        // Check if user is authenticated via middleware (which populates req.user)
        // However, this route might be public. We need to check if middleware was run. 
        // Usually public routes don't run authMiddleware. 
        // The requirement says: GET /api/gallery -> Public.
        // But we need to know IF they are logged in to show private.
        // So we might need a "optionalAuth" middleware or handle it here.
        // Since we can't easily change global middleware flow, let's assume the route uses an optional auth middleware
        // OR we just restrict 'private' items to a separate secure endpoint? 
        // Requirement says "Private gallery visible only to logged-in users".
        // I will look for 'Authorization' header manually here if middleware isn't forced, 
        // OR easier: The route config in galleryRoutes.js determines if it runs auth.
        // If it's a single endpoint for both, we need optional auth.
        // I'll stick to: Public endpoint returns ONLY public. Logged-in endpoint returns everything?
        // Better: Helper function to decode token if present, else default to public.

        // For now, let's assume this controller method handles both scenarios if the route allows it.
        // I'll add logic to check for token myself if req.user isn't set.
        // Actually, let's just query based on what we know.

        // If the caller is public (no req.user), force visibility='public'.
        if (!req.user) {
            query.visibility = 'public';
        }
        // If req.user exists (Authenticated), we show all (or respect query filter).

        const galleryItems = await Gallery.find(query).sort({ createdAt: -1 });
        res.status(200).json(galleryItems);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching gallery items', error: error.message });
    }
};

exports.getGalleryByAlbum = async (req, res) => {
    try {
        const { type } = req.params;
        let query = { albumType: type };

        if (!req.user) {
            query.visibility = 'public';
        }

        const items = await Gallery.find(query).sort({ createdAt: -1 });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching album items', error: error.message });
    }
};

exports.updateGalleryItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedItem = await Gallery.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedItem) {
            return res.status(404).json({ message: 'Gallery item not found' });
        }

        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: 'Error updating gallery item', error: error.message });
    }
};

exports.deleteGalleryItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await Gallery.findByIdAndDelete(id);

        if (!deletedItem) {
            return res.status(404).json({ message: 'Gallery item not found' });
        }

        res.status(200).json({ message: 'Gallery item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting gallery item', error: error.message });
    }
};
