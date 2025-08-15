# D. Dimitrov - Personal Portfolio & Blog

> Modern personal website showcasing my professional journey, skills, and projects with integrated blog functionality

[![Live Demo](https://img.shields.io/badge/demo-live-success.svg)](https://mitaka-website-stage.vercel.app/Home-page)
[![Vercel](https://img.shields.io/badge/deployed-vercel-black.svg)](https://mitaka-website-stage.vercel.app/Home-page)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 🌐 Live Demo

**[View Portfolio →](https://mitaka-website-stage.vercel.app/Home-page)**

![Portfolio Preview](https://via.placeholder.com/800x400/0066cc/ffffff?text=Portfolio+Screenshot)

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Pages & Structure](#-pages--structure)
- [Getting Started](#-getting-started)
- [Installation](#-installation)
- [Development](#-development)
- [Database Setup](#-database-setup)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

## 🎯 Overview

This is my personal portfolio website and blog platform where I share information about myself, my professional journey, interests, hobbies, and technical skills. The platform features a modern design with multiple sections and will soon include article publishing capabilities with user interaction features.

### What Makes It Special
- 🎨 **Modern Design** - Clean, responsive interface with smooth user experience
- 📱 **Multi-Page Structure** - Dedicated sections for different aspects of my profile
- 📝 **Blog Integration** - Upcoming article publishing system
- 💬 **Interactive Features** - Comment and sharing functionality (coming soon)
- 🚀 **Performance Optimized** - Built with Next.js for optimal performance
- 🐳 **Containerized** - Docker setup for easy deployment

## ✨ Features

### Current Features
- 🏠 **Home Page** - Welcome section with personal introduction
- 👨‍💻 **About Page** - Detailed information about my background and journey  
- 🛠️ **My Skills** - Comprehensive overview of technical competencies
- 📞 **Contacts** - Multiple ways to get in touch
- 🚀 **Projects** - Showcase of my work and achievements
- 📅 **Timeline** - Professional and personal milestones

### Upcoming Features
- 📝 **Blog Articles** - Publishing platform for technical and personal content
- 💬 **Comment System** - User engagement through comments
- 🔄 **Content Sharing** - Social sharing capabilities
- 🔍 **Search Functionality** - Easy content discovery

## 🛠️ Tech Stack

### Frontend
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-593D88?style=for-the-badge&logo=redux&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

### Backend & Database
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=nodedotjs&logoColor=white)

### DevOps & Tools
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![DBeaver](https://img.shields.io/badge/DBeaver-382923?style=for-the-badge&logo=dbeaver&logoColor=white)

## 📁 Pages & Structure

```
Portfolio Structure:
├── 🏠 Home Page          # Welcome & introduction
├── 👨‍💻 About              # Personal background & story
├── 🛠️ My Skills          # Technical competencies
├── 📞 Contacts           # Contact information & social links
├── 🚀 Projects           # Portfolio showcasing my work
└── 📅 Timeline           # Professional & personal milestones
```

### Page Details

| Page | Purpose | Features |
|------|---------|----------|
| **Home** | First impression & introduction | Hero section, overview |
| **About** | Personal story & background | Detailed biography, interests |
| **My Skills** | Technical competencies | Skills matrix, proficiency levels |
| **Contacts** | Get in touch | Contact form, social links |
| **Projects** | Work showcase | Project gallery, descriptions |
| **Timeline** | Journey milestones | Career progression, achievements |

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) (for containerized setup)
- [PostgreSQL](https://www.postgresql.org/) (for database)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/mitaka1210/d-dimitrov.git

# Navigate to project directory
cd d-dimitrov

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio locally.

## 📦 Installation

### Step-by-step Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/mitaka1210/d-dimitrov.git
   cd d-dimitrov
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   Configure your environment variables:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/portfolio_db
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key
   ```

4. **Database Setup**
   ```bash
   # Start PostgreSQL (if using Docker)
   docker-compose up -d postgres
   
   # Run database migrations
   npm run db:migrate
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

## 🔧 Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | TypeScript type checking |
| `npm run db:migrate` | Run database migrations |

### Development Guidelines

- **Code Style**: The project follows ESLint and Prettier configurations
- **Commits**: Use conventional commit messages
- **Branches**: Create feature branches from `main`
- **Testing**: Write tests for new features (coming soon)

## 🗄️ Database Setup

### Using Docker (Recommended)

```bash
# Start PostgreSQL container
docker-compose up -d

# Access database with DBeaver
# Host: localhost
# Port: 5432
# Database: portfolio_db
```

### Manual PostgreSQL Setup

```bash
# Create database
createdb portfolio_db

# Run migrations
npm run db:migrate

# Seed initial data (optional)
npm run db:seed
```

### Database Management

The project uses **DBeaver** for database management. You can:
- View and edit data
- Run custom queries
- Manage database schema
- Monitor performance

## 🚀 Deployment

### Vercel (Current)

The portfolio is currently deployed on **Vercel**:
- **Production**: [mitaka-website-stage.vercel.app](https://mitaka-website-stage.vercel.app/Home-page)
- Automatic deployments from `main` branch
- Environment variables configured in Vercel dashboard

### Docker Deployment

```bash
# Build Docker image
docker build -t portfolio .

# Run container
docker run -p 3000:3000 --env-file .env portfolio
```

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🔮 Upcoming Features

- [ ] **Blog System** - Article publishing and management
- [ ] **Comment System** - User interaction on blog posts
- [ ] **Social Sharing** - Share content on social platforms
- [ ] **Search Functionality** - Find content easily
- [ ] **Analytics** - Track visitor engagement
- [ ] **Newsletter** - Subscribe to updates
- [ ] **Multi-language** - Bulgarian and English versions

## 🤝 Contributing

While this is a personal portfolio, suggestions and feedback are always welcome!

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add some improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

## 📞 Contact

**Димитър Димитров (D. Dimitrov)**

- 🌐 **Portfolio**: [mitaka-website-stage.vercel.app](https://mitaka-website-stage.vercel.app/Home-page)
- 💻 **GitHub**: [@mitaka1210](https://github.com/mitaka1210)
- 📧 **Email**: [Contact through website](https://mitaka-website-stage.vercel.app/Home-page)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>✨ Built with passion using Next.js, React, and modern web technologies ✨</p>
  <p>🚀 <a href="https://mitaka-website-stage.vercel.app/Home-page">Visit Live Portfolio</a> 🚀</p>
</div>

## 🎨 Screenshots

### Home Page
*Clean and modern landing experience*

### About Page  
*Personal story and background*

### Skills Page
*Technical competencies overview*

### Projects Page
*Showcase of work and achievements*

### Timeline Page
*Professional journey milestones*

---

*Last updated: August 2025*
