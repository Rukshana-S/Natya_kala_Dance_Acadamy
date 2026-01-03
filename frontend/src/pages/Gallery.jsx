import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { API_BASE_URL } from '../config/api';

const Gallery = () => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [filter, setFilter] = useState('all');
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(true);

    const getImageUrl = (url) => {
        if (!url) return '';
        if (url.includes('localhost:5000/uploads/')) {
            const filename = url.split('/').pop();
            return `${API_BASE_URL}/uploads/${filename}`;
        }
        if (url.startsWith('http') || url.startsWith('data:')) return url;
        return `${API_BASE_URL}/uploads/${url}`;
    };

    const albumTypes = [
        { id: 'all', label: 'All' },
        { id: 'classroom-practice', label: 'Classroom Practice' },
        { id: 'stage-performances', label: 'Stage Performances' },
        { id: 'arangetram', label: 'Arangetram' },
        { id: 'temple-programs', label: 'Temple Programs' }
    ];

    useEffect(() => {
        fetchGalleryItems();
    }, []);

    useEffect(() => {
        if (filter === 'all') {
            setFilteredItems(items);
        } else {
            setFilteredItems(items.filter(item => item.albumType === filter));
        }
    }, [filter, items]);

    const fetchGalleryItems = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                'Content-Type': 'application/json'
            };
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(`${API_BASE_URL}/api/gallery`, {
                headers
            });

            if (!response.ok) {
                throw new Error('Failed to fetch gallery items');
            }

            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error('Error fetching gallery:', error);
        } finally {
            setLoading(false);
        }
    };

    const openLightbox = (item) => {
        setSelectedItem(item);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedItem(null);
        document.body.style.overflow = 'unset';
    };

    return (
        <div className="page-container animate-fade-in" >
            {/* Hero Section */}
            < div className="page-hero" style={{
                background: 'linear-gradient(135deg, #8B1538 0%, #B8860B 100%)',
                padding: '6rem 0 3rem',
                textAlign: 'center',
                color: 'white'
            }} >
                <div className="container">
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', color: '#D4AF37' }}>Gallery</h1>
                    <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', color: '#F4E4BC' }}>
                        Moments captured in time - witnessing the divine art of Bharatanatyam through our journey.
                    </p>
                </div>
            </div >

            <div className="container section">
                {/* Filters */}
                <div className="gallery-filters" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    marginBottom: '3rem'
                }}>
                    {albumTypes.map(type => (
                        <button
                            key={type.id}
                            onClick={() => setFilter(type.id)}
                            style={{
                                background: filter === type.id ? 'var(--primary-maroon)' : 'transparent',
                                color: filter === type.id ? 'var(--antique-gold)' : 'var(--deep-maroon)',
                                border: `2px solid ${filter === type.id ? 'var(--primary-maroon)' : 'var(--antique-gold)'}`,
                                padding: '0.6rem 1.5rem',
                                borderRadius: '25px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {type.label}
                        </button>
                    ))}
                </div>

                {/* Gallery Grid */}
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '3rem' }}>Loading gallery...</div>
                ) : filteredItems.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
                        No images found for this category.
                    </div>
                ) : (
                    <motion.div
                        layout
                        className="gallery-grid"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: '2rem'
                        }}
                    >
                        {filteredItems.map(item => (
                            <motion.div
                                layout
                                key={item._id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => openLightbox(item)}
                                style={{
                                    cursor: 'pointer',
                                    borderRadius: '15px',
                                    overflow: 'hidden',
                                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                                    background: 'white',
                                    transition: 'transform 0.3s ease'
                                }}
                                whileHover={{ y: -5 }}
                            >
                                <div style={{ height: '250px', overflow: 'hidden', position: 'relative' }}>
                                    {item.mediaType === 'video' ? (
                                        <div style={{
                                            width: '100%',
                                            height: '100%',
                                            background: '#000',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white'
                                        }}>
                                            <span style={{ fontSize: '3rem' }}>▶</span>
                                        </div>
                                    ) : (
                                        <img
                                            src={getImageUrl(item.mediaUrl)}
                                            alt={item.title}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=Image+Not+Found'; }}
                                        />
                                    )}

                                </div>
                                <div style={{ padding: '1.2rem' }}>
                                    <h3 style={{
                                        margin: '0 0 0.5rem',
                                        fontSize: '1.2rem',
                                        color: 'var(--deep-maroon)',
                                        fontFamily: 'Playfair Display, serif'
                                    }}>
                                        {item.title}
                                    </h3>
                                    <p style={{
                                        margin: 0,
                                        fontSize: '0.9rem',
                                        color: '#666',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeLightbox}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            background: 'rgba(0,0,0,0.9)',
                            zIndex: 2000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2rem'
                        }}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="gallery-modal-content"
                            style={{
                                width: '90%',
                                maxWidth: '1200px',
                                maxHeight: '90vh',
                                position: 'relative',
                                background: 'transparent',
                                borderRadius: '15px',
                                padding: '1rem',
                                display: 'flex',
                                gap: '2rem',
                                alignItems: 'center'
                            }}
                        >
                            <button
                                onClick={closeLightbox}
                                style={{
                                    position: 'absolute',
                                    top: '-40px',
                                    right: '0',
                                    background: 'none',
                                    border: 'none',
                                    color: 'white',
                                    fontSize: '2.5rem',
                                    cursor: 'pointer',
                                    zIndex: 10
                                }}
                            >
                                ×
                            </button>

                            {/* Text Section (Left on Desktop, Bottom on Mobile) */}
                            <div className="modal-text" style={{ flex: '1', color: 'white', textAlign: 'left', minWidth: '300px' }}>
                                <h2 style={{
                                    color: 'var(--antique-gold)',
                                    marginBottom: '1rem',
                                    fontSize: '2rem',
                                    fontFamily: 'Playfair Display, serif'
                                }}>
                                    {selectedItem.title}
                                </h2>
                                <p style={{
                                    fontSize: '1.1rem',
                                    lineHeight: '1.6',
                                    color: '#eee'
                                }}>
                                    {selectedItem.description}
                                </p>
                            </div>

                            {/* Media Section (Right on Desktop, Top on Mobile) */}
                            <div className="modal-media" style={{ flex: '1.5', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                {selectedItem.mediaType === 'video' ? (
                                    <video
                                        src={getImageUrl(selectedItem.mediaUrl)}
                                        controls
                                        autoPlay
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '70vh',
                                            borderRadius: '8px',
                                            boxShadow: '0 5px 25px rgba(0,0,0,0.5)'
                                        }}
                                    />
                                ) : (
                                    <img
                                        src={getImageUrl(selectedItem.mediaUrl)}
                                        alt={selectedItem.title}
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '70vh',
                                            borderRadius: '8px',
                                            objectFit: 'contain',
                                            boxShadow: '0 5px 25px rgba(0,0,0,0.5)'
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    );
};

export default Gallery;
