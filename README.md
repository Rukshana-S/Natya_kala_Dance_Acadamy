# 🕉️ Natya Kala Dance Academy - Management System

A stunning full-stack MERN application for managing a traditional Bharatanatyam dance academy with royal maroon and gold aesthetics.

## ✨ Features

### 🎭 Frontend (React + Vite)
- **Royal Design**: Traditional maroon & gold color scheme with sacred aesthetics
- **Responsive Layout**: Beautiful UI matching Bharatanatyam cultural heritage
- **Student Registration**: Comprehensive form for class enrollment
- **Admin Dashboard**: Registration management and approval system
- **Authentication**: Secure login for students and administrators

### 🏛️ Backend (Node.js + Express)
- **RESTful API**: Clean and organized API endpoints
- **MongoDB Integration**: Robust data storage with Mongoose
- **JWT Authentication**: Secure token-based authentication
- **Role-based Access**: Student and admin role management
- **Registration Management**: Complete CRUD operations

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dance_management_system
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   
   # Create .env file with your configurations
   cp .env.example .env
   
   # Start the server
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   
   # Start the development server
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://${import.meta.env.VITE_API_URL}
   - API Health: http://${import.meta.env.VITE_API_URL}/api/health

## 🔐 Default Admin Credentials

- **Email**: admin@natyakala.academy
- **Password**: admin123

## 📁 Project Structure

```
DANCE_MANAGEMENT_SYSTEM/
├── frontend/                 # React Frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── styles/         # CSS themes
│   └── package.json
├── backend/                 # Node.js Backend
│   ├── config/             # Database configuration
│   ├── models/             # MongoDB models
│   ├── controllers/        # Business logic
│   ├── routes/             # API routes
│   ├── middleware/         # Auth & validation
│   └── server.js
└── README.md
```

## 🎨 Design Philosophy

The application embodies the sacred and royal essence of Bharatanatyam:

- **Colors**: Deep maroon (#8B1538) and antique gold (#D4AF37)
- **Typography**: Elegant serif fonts for headings, clean sans-serif for body
- **Layout**: Generous spacing, rounded cards, soft shadows
- **Cultural Elements**: Om symbols, mandala patterns, temple aesthetics

## 🛠️ API Endpoints

### Authentication
- `POST /api/auth/login` - Student login
- `POST /api/auth/admin-login` - Admin login

### Registrations
- `POST /api/registrations` - Create registration
- `GET /api/registrations` - Get registrations

### Admin (Protected)
- `GET /api/admin/registrations` - Get all registrations
- `PATCH /api/admin/registrations/:id/approve` - Approve registration
- `GET /api/admin/dashboard-stats` - Get statistics

## 🌟 Key Features

### Student Experience
- Elegant registration form with batch and experience level selection
- Secure login system
- Beautiful home page with academy information
- Detailed about page with Guru-Shishya tradition

### Admin Experience
- Comprehensive dashboard with registration statistics
- Easy approval system for student registrations
- Clean table view with status management
- Secure admin authentication

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dance_academy
JWT_SECRET=your_jwt_secret_key
ADMIN_EMAIL=admin@natyakala.academy
ADMIN_PASSWORD=admin123
```

## 🎯 Usage

1. **Student Registration**: Visit the homepage and click "Register for Class"
2. **Admin Management**: Login as admin to view and approve registrations
3. **Dashboard**: Monitor academy statistics and student enrollment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Inspired by the sacred art of Bharatanatyam
- Traditional South Indian temple architecture
- Guru-Shishya parampara teaching methodology

---

*"Dance is the hidden language of the soul"* - Martha Graham