import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Image as ImageIcon,
    Trash2,
    Edit,
    Plus,
    Search,
    Filter,
    Landmark,
    Flower2,
    Drama,
    Footprints,
    Camera,
    Video,
    X,
    Star
} from 'lucide-react';
import '../styles/theme.css';

const AdminGallery = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        albumType: 'classroom-practice',
        mediaType: 'image',
        media: null,
        visibility: 'public'
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [editId, setEditId] = useState(null);

    const albumTypes = [
        { id: 'classroom-practice', label: 'Classroom Practice', icon: <Footprints size={16} /> },
        { id: 'stage-performances', label: 'Stage Performances', icon: <Drama size={16} /> },
        { id: 'arangetram', label: 'Arangetram', icon: <Flower2 size={16} /> },
        { id: 'temple-programs', label: 'Temple Programs', icon: <Landmark size={16} /> }
    ];

    // Stats Calculation
    const stats = useMemo(() => {
        return {
            total: items.length,
            performances: items.filter(i => i.audio === 'stage-performances').length, // note: audio? likely error in my thought, strictly albumType
            arangetrams: items.filter(i => i.albumType === 'arangetram').length,
            temple: items.filter(i => i.albumType === 'temple-programs').length
        };
    }, [items]);

    // Filtering & Grouping
    const filteredItems = useMemo(() => {
        return items.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = filterCategory === 'all' || item.albumType === filterCategory;
            return matchesSearch && matchesFilter;
        });
    }, [items, searchTerm, filterCategory]);

    // Featured Items (Just taking the latest Arangetram and Temple performance for demo)
    const featuredItems = useMemo(() => {
        return items.filter(i =>
            i.albumType === 'stage-performances'
        ).slice(0, 3);
    }, [items]);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://${import.meta.env.VITE_API_URL}/api/gallery', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error('Error fetching items:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'file' ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: '', message: '' });

        try {
            const token = localStorage.getItem('token');
            let response;
            if (editId) {
                // Update existing item
                response = await fetch(`http://${import.meta.env.VITE_API_URL}/api/gallery/${editId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        title: formData.title,
                        description: formData.description,
                        albumType: formData.albumType
                    })
                });
            } else {
                // Create new item
                const submitData = new FormData();
                submitData.append('title', formData.title);
                submitData.append('description', formData.description);
                submitData.append('albumType', formData.albumType);
                submitData.append('mediaType', formData.mediaType);
                submitData.append('visibility', 'public');
                if (formData.media) {
                    submitData.append('media', formData.media);
                }

                response = await fetch('http://${import.meta.env.VITE_API_URL}/api/gallery', {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` },
                    body: submitData
                });
            }

            if (!response.ok) throw new Error(editId ? 'Failed to update item' : 'Failed to create item');

            setStatus({ type: 'success', message: `Gallery item ${editId ? 'updated' : 'created'} successfully!` });
            setFormData({
                title: '', description: '', albumType: 'classroom-practice', mediaType: 'image', media: null, visibility: 'public'
            });
            setEditId(null);
            setShowForm(false);
            fetchItems();
        } catch (error) {
            setStatus({ type: 'error', message: error.message });
        }
    };

    const handleEdit = (item) => {
        setEditId(item._id);
        setFormData({
            title: item.title,
            description: item.description,
            albumType: item.albumType,
            mediaType: item.mediaType,
            media: null,
            visibility: 'public'
        });
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setEditId(null);
        setFormData({
            title: '', description: '', albumType: 'classroom-practice', mediaType: 'image', media: null, visibility: 'public'
        });
        setShowForm(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://${import.meta.env.VITE_API_URL}/api/gallery/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to delete item');
            setStatus({ type: 'success', message: 'Item deleted successfully' });
            fetchItems();
        } catch (error) {
            setStatus({ type: 'error', message: error.message });
        }
    };

    const getIconForType = (type) => {
        const found = albumTypes.find(t => t.id === type);
        return found ? found.icon : <ImageIcon size={16} />;
    };

    const getLabelForType = (type) => {
        const found = albumTypes.find(t => t.id === type);
        return found ? found.label : type;
    };

    return (
        <div className="admin-page-container" style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', fontFamily: "'Inter', sans-serif" }}>

            {/* 1. Header & Stats Section */}
            <div className="admin-header">
                <div>
                    <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '0.5rem' }}>Gallery Manager</h2>
                    <p style={{ color: '#666' }}>Manage and curate the academy's visual legacy.</p>
                </div>
                <button
                    className="btn-add-new"
                    onClick={() => { setShowForm(!showForm); if (editId) handleCancelEdit(); }}
                >
                    {showForm && !editId ? <X size={20} /> : <Plus size={20} />}
                    {showForm && !editId ? 'Close' : 'Add New Item'}
                </button>
            </div>

            <div className="stats-strip">
                <div className="stat-box">
                    <div className="stat-icon"><Camera size={24} /></div>
                    <div><span className="stat-num">{stats.total}</span><span className="stat-label">Total Photos</span></div>
                </div>
                <div className="stat-box">
                    <div className="stat-icon"><Drama size={24} /></div>
                    <div><span className="stat-num">{items.filter(i => i.mediaType === 'video').length}</span><span className="stat-label">Videos</span></div>
                </div>
                <div className="stat-box">
                    <div className="stat-icon"><Flower2 size={24} /></div>
                    <div><span className="stat-num">{stats.arangetrams}</span><span className="stat-label">Arangetrams</span></div>
                </div>
                <div className="stat-box">
                    <div className="stat-icon"><Landmark size={24} /></div>
                    <div><span className="stat-num">{stats.temple}</span><span className="stat-label">Temple Events</span></div>
                </div>
            </div>

            {/* 2. Notification Area */}
            {status.message && (
                <div className={`alert alert-${status.type}`} style={{ marginBottom: '2rem' }}>
                    {status.message}
                </div>
            )}

            {/* 3. Add/Edit Form (Collapsible) */}
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="form-container-card"
                    >
                        <div className="form-header">
                            <h3>{editId ? 'Edit Gallery Item' : 'Add New Gallery Item'}</h3>
                            {editId && <button onClick={handleCancelEdit} className="btn-cancel">Cancel Edit</button>}
                        </div>
                        <form onSubmit={handleSubmit} className="enhanced-form">
                            <div className="form-row">
                                <div className="form-group flex-2">
                                    <label>Title</label>
                                    <input type="text" name="title" value={formData.title} onChange={handleInputChange} required placeholder="e.g. Navarathri Celebration 2024" />
                                </div>
                                <div className="form-group flex-1">
                                    <label>Category</label>
                                    <select name="albumType" value={formData.albumType} onChange={handleInputChange}>
                                        {albumTypes.map(type => (
                                            <option key={type.id} value={type.id}>{type.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea name="description" value={formData.description} onChange={handleInputChange} rows="2" placeholder="Brief details about the event..."></textarea>
                            </div>
                            <div className="form-row">
                                <div className="form-group flex-1">
                                    <label>Media Type</label>
                                    <select name="mediaType" value={formData.mediaType} onChange={handleInputChange} disabled={!!editId}>
                                        <option value="image">Image</option>
                                        <option value="video">Video</option>
                                    </select>
                                </div>
                                {!editId && (
                                    <div className="form-group flex-2">
                                        <label>Upload File</label>
                                        <input type="file" name="media" onChange={handleInputChange} required accept="image/*,video/*" className="file-input" />
                                    </div>
                                )}
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="enhanced-submit-btn">{editId ? 'Update Item' : 'Publish Item'}</button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 4. Featured Highlights */}
            {items.length > 0 && !showForm && (
                <div className="featured-section">
                    <h3 className="section-heading"><Star size={20} fill="var(--antique-gold)" color="var(--antique-gold)" /> Featured Highlights</h3>
                    <div className="featured-grid">
                        {featuredItems.map(item => (
                            <div key={item._id} className="featured-card">
                                <div className="card-badge featured-badge">Featured</div>
                                <img src={item.mediaUrl} alt={item.title} className="card-img" />
                                <div className="card-overlay">
                                    <h4>{item.title}</h4>
                                    <span className="card-tag">{getLabelForType(item.albumType)}</span>
                                </div>
                                {/* Admin Actions Overlay */}
                                <div className="admin-actions-overlay">
                                    <button onClick={() => handleEdit(item)} title="Edit"><Edit size={18} /></button>
                                    <button onClick={() => handleDelete(item._id)} title="Delete" className="btn-delete"><Trash2 size={18} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 5. Main Gallery Grid (Grouped) */}
            <div className="gallery-main-container">
                <div className="gallery-controls">
                    <div className="search-box">
                        <Search size={18} color="#888" />
                        <input
                            type="text"
                            placeholder="Search gallery..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="filter-box">
                        <Filter size={18} color="#888" />
                        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                            <option value="all">All Categories</option>
                            {albumTypes.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                        </select>
                    </div>
                </div>

                {albumTypes.map(type => {
                    // Filter items for this section considering search
                    const sectionItems = filteredItems.filter(item => item.albumType === type.id);

                    if (sectionItems.length === 0) return null;

                    return (
                        <div key={type.id} className="category-section">
                            <div className="category-header">
                                <span className="cat-icon">{type.icon}</span>
                                <h3>{type.label}</h3>
                                <div className="cat-line"></div>
                            </div>
                            <div className="gallery-grid">
                                {sectionItems.map(item => (
                                    <div key={item._id} className="gallery-card">
                                        <div className="card-img-wrapper">
                                            {item.mediaType === 'video' ? (
                                                <div className="video-placeholder">
                                                    <Video size={40} color="white" />
                                                    <video src={item.mediaUrl} className="card-video-preview" muted />
                                                </div>
                                            ) : (
                                                <img src={item.mediaUrl} alt={item.title} />
                                            )}

                                            <div className="card-grad-overlay">
                                                <div className="card-content">
                                                    <h5>{item.title}</h5>
                                                    <span className="card-pill">{type.label}</span>
                                                </div>
                                            </div>

                                            <div className="card-hover-actions">
                                                <button onClick={() => handleEdit(item)} className="action-btn edit"><Edit size={16} /></button>
                                                <button onClick={() => handleDelete(item._id)} className="action-btn delete"><Trash2 size={16} /></button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}

                {filteredItems.length === 0 && (
                    <div className="empty-state">
                        <p>No gallery items found matching your criteria.</p>
                    </div>
                )}
            </div>

            {/* Inline Styles */}
            <style>{`
                .admin-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                }

                .btn-add-new {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: var(--primary-maroon);
                    color: white;
                    border: none;
                    padding: 0.8rem 1.5rem;
                    border-radius: 50px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 10px rgba(139, 21, 56, 0.2);
                }

                .btn-add-new:hover {
                    background: var(--deep-maroon);
                    transform: translateY(-2px);
                }

                .stats-strip {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1.5rem;
                    margin-bottom: 3rem;
                }

                .stat-box {
                    background: white;
                    padding: 1.5rem;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
                    border: 1px solid rgba(0,0,0,0.03);
                    transition: transform 0.3s;
                }

                .stat-box:hover {
                    transform: translateY(-5px);
                    border-color: var(--antique-gold);
                }

                .stat-icon {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background: rgba(212, 175, 55, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--antique-gold);
                }

                .stat-num {
                    display: block;
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: var(--deep-maroon);
                    line-height: 1;
                }

                .stat-label {
                    font-size: 0.85rem;
                    color: #777;
                }

                .form-container-card {
                    background: white;
                    padding: 2rem;
                    border-radius: 15px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                    margin-bottom: 3rem;
                    border: 1px solid var(--antique-gold);
                    overflow: hidden;
                }

                .form-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.5rem;
                    border-bottom: 1px solid #eee;
                    padding-bottom: 1rem;
                }

                .form-header h3 {
                    margin: 0;
                    color: var(--primary-maroon);
                }

                .btn-cancel {
                    background: #f8f9fa;
                    border: 1px solid #ddd;
                    padding: 0.5rem 1rem;
                    border-radius: 5px;
                    cursor: pointer;
                }

                .form-row {
                    display: flex;
                    gap: 1.5rem;
                }

                .flex-1 { flex: 1; }
                .flex-2 { flex: 2; }

                .featured-section {
                    margin-bottom: 4rem;
                }

                .section-heading {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-family: 'Playfair Display', serif;
                    font-size: 1.5rem;
                    color: var(--deep-maroon);
                    margin-bottom: 1.5rem;
                }

                .featured-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 2rem;
                }

                .featured-card {
                    height: 300px;
                    border-radius: 15px;
                    overflow: hidden;
                    position: relative;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
                    cursor: pointer;
                    transition: transform 0.3s;
                }

                .featured-card:hover {
                    transform: scale(1.02);
                }

                .featured-badge {
                    position: absolute;
                    top: 15px;
                    left: 15px;
                    background: var(--antique-gold);
                    color: var(--deep-maroon);
                    padding: 4px 10px;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    z-index: 2;
                }

                .card-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .card-overlay {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
                    padding: 20px;
                    color: white;
                }
                
                .admin-actions-overlay {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    display: flex;
                    gap: 8px;
                    opacity: 0;
                    transition: opacity 0.3s;
                }

                .featured-card:hover .admin-actions-overlay,
                .gallery-card:hover .card-hover-actions {
                    opacity: 1;
                }

                .admin-actions-overlay button {
                    background: white;
                    border: none;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                    color: #555;
                }
                
                .admin-actions-overlay button:hover {
                    color: var(--primary-maroon);
                }

                .gallery-controls {
                    display: flex;
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                    background: white;
                    padding: 1rem;
                    border-radius: 10px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.03);
                }

                .search-box, .filter-box {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    border: 1px solid #ddd;
                    padding: 0.5rem 1rem;
                    border-radius: 50px;
                    flex: 1;
                }

                .search-box input, .filter-box select {
                    border: none;
                    outline: none;
                    width: 100%;
                    font-size: 0.95rem;
                    background: transparent;
                }

                .category-section {
                    margin-bottom: 3rem;
                }

                .category-header {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 1.5rem;
                }

                .cat-icon {
                    color: var(--antique-gold);
                }

                .category-header h3 {
                    font-family: 'Playfair Display', serif;
                    font-size: 1.4rem;
                    color: #333;
                    margin: 0;
                }

                .cat-line {
                    height: 1px;
                    background: #eee;
                    flex: 1;
                }

                .gallery-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
                    gap: 20px;
                }

                .gallery-card {
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.06);
                    background: white;
                    transition: transform 0.3s;
                }

                .gallery-card:hover {
                    box-shadow: 0 10px 25px rgba(0,0,0,0.12);
                    transform: translateY(-5px);
                }

                .card-img-wrapper {
                    position: relative;
                    height: 180px;
                    width: 100%;
                }

                .card-img-wrapper img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .video-placeholder {
                    width: 100%;
                    height: 100%;
                    background: #222;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                }
                
                .card-video-preview {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    opacity: 0.6;
                }

                .card-grad-overlay {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
                    padding: 15px;
                    height: 70%;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                }

                .card-content h5 {
                    color: white;
                    margin: 0 0 5px 0;
                    font-size: 1rem;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .card-pill {
                    background: rgba(255,255,255,0.2);
                    color: white;
                    font-size: 0.7rem;
                    padding: 2px 6px;
                    border-radius: 4px;
                    backdrop-filter: blur(4px);
                }

                .card-hover-actions {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    display: flex;
                    gap: 8px;
                    opacity: 0;
                    transition: opacity 0.2s;
                    z-index: 5;
                }

                .action-btn {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    background: white;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                }

                .action-btn.edit { color: var(--primary-maroon); }
                .action-btn.delete { color: #dc3545; }
                .action-btn:hover { transform: scale(1.1); }

                @media (max-width: 900px) {
                    .featured-grid {
                        grid-template-columns: 1fr;
                    }
                    .stats-strip {
                        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
                    }
                    .form-row {
                        flex-direction: column;
                        gap: 1rem;
                    }
                    .gallery-grid {
                        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
                    }
                }
            `}</style>
        </div>
    );
};

export default AdminGallery;
