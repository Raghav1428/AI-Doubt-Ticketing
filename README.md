# AI Ticket Assistant

A modern ticket management system built with React, Node.js, and MongoDB, featuring AI-powered ticket handling and automated responses.

## 🚀 Features

- **User Authentication**
  - Secure login and registration
  - Role-based access control (Admin, Support Agent, User)
  - JWT-based authentication

- **Ticket Management**
  - Create, view, and manage support tickets
  - Real-time ticket status updates
  - File attachments support
  - Ticket categorization and prioritization

- **AI-Powered Features**
  - Automated ticket categorization
  - Smart response suggestions
  - Ticket priority prediction
  - Natural language processing for ticket analysis

- **Admin Dashboard**
  - User management
  - Ticket analytics and reporting
  - System configuration
  - Performance metrics

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Vite
- React Router
- Axios
- React Query

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Inngest for background jobs

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd ai-ticket-assistant
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd Backend
   npm install

   # Install frontend dependencies
   cd ../Frontend
   npm install
   ```

3. **Environment Setup**
   - Copy `.sample.env` to `.env` in both Frontend and Backend directories
   - Update the environment variables with your configuration

4. **Start the development servers**
   ```bash
   # Start backend server
   cd Backend
   npm run dev

   # Start frontend server
   cd Frontend
   npm run dev
   ```

## 🔧 Configuration

### Backend Environment Variables
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT
- `NODE_ENV`: Environment (development/production)

### Frontend Environment Variables
- `VITE_API_URL`: Backend API URL
- `VITE_APP_NAME`: Application name

## 📁 Project Structure

```
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   └── public/
└── Backend/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middlewares/
    └── utils/
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project
- Special thanks to the open-source community for the amazing tools and libraries 