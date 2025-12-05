# D. Dimitrov - Personal Portfolio & Blog

> Modern personal website showcasing my professional journey, skills, and projects with integrated blog functionality

[![Live Demo](https://img.shields.io/badge/demo-live-success.svg)](https://d-dimitrov.eu)
[![Domain](https://img.shields.io/badge/domain-d--dimitrov.eu-blue.svg)](https://d-dimitrov.eu)
[![English](https://img.shields.io/badge/english-eng.d--dimitrov.eu-green.svg)](https://eng.d-dimitrov.eu)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 🌐 Live Demo

**[View Portfolio →](https://d-dimitrov.eu)** | **[English Version →](https://eng.d-dimitrov.eu)**

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
- 🎨 **Modern Full-Stack Architecture** - Clean separation between frontend and backend
- 🌐 **Custom Domain & Routing** - Professional domain with subdomain routing
- 🐳 **Containerized Infrastructure** - Docker containers orchestrated with Nginx
- ☁️ **CDN & DNS** - Cloudflare integration for performance and security
- 📱 **Multi-Language Support** - Separate subdomains for different languages
- 📝 **RESTful API** - Express.js backend with PostgreSQL database
- 🚀 **Production-Ready** - Self-hosted on dedicated server infrastructure

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
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

### Infrastructure & DevOps
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white)
![DBeaver](https://img.shields.io/badge/DBeaver-382923?style=for-the-badge&logo=dbeaver&logoColor=white)

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Cloudflare                           │
│                     (DNS + CDN + SSL)                       │
└─────────────────────┬───────────────────────────────────────┘
                      │
              ┌───────▼────────┐
              │  d-dimitrov.eu │ ◄──── Main Domain
              └───────┬────────┘
                      │
              ┌───────▼────────┐
              │eng.d-dimitrov.eu│ ◄──── English Subdomain
              └───────┬────────┘
                      │
        ┌─────────────▼──────────────┐
        │        Your Server          │
        │  ┌─────────────────────────┐ │
        │  │        Nginx            │ │ ◄──── Reverse Proxy
        │  │    (Load Balancer)      │ │
        │  └─────────┬───────────────┘ │
        │            │                 │
        │  ┌─────────▼───────────────┐ │
        │  │   Frontend Container    │ │ ◄──── Next.js App
        │  │      (Next.js)          │ │
        │  └─────────┬───────────────┘ │
        │            │                 │
        │  ┌─────────▼───────────────┐ │
        │  │   Backend Container     │ │ ◄──── Express.js API
        │  │     (Express.js)        │ │
        │  └─────────┬───────────────┘ │
        │            │                 │
        │  ┌─────────▼───────────────┐ │
        │  │  PostgreSQL Container   │ │ ◄──── Database
        │  │      (Database)         │ │
        │  └─────────────────────────┘ │
        └─────────────────────────────┘
```

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

## 🌐 Infrastructure Details

### Domain Configuration
- **Main Domain**: `d-dimitrov.eu` (Bulgarian version)
- **English Subdomain**: `eng.d-dimitrov.eu` (English version)
- **DNS Provider**: Cloudflare (with SSL/TLS encryption)
- **CDN**: Cloudflare global network for performance

### Server Architecture
- **Hosting**: Self-hosted on dedicated server
- **Reverse Proxy**: Nginx for container routing and load balancing  
- **Containerization**: Docker containers for each service
- **Container Orchestration**: Docker Compose
- **SSL Termination**: Nginx with Cloudflare SSL certificates

### API Architecture
- **Backend Framework**: Express.js (RESTful API)
- **Database**: PostgreSQL with connection pooling
- **Container Communication**: Internal Docker network
- **API Endpoints**: `/api/v1/*` structure

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
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- [PostgreSQL](https://www.postgresql.org/) (or use Docker container)

### Development Setup

For local development, you'll need to run both frontend and backend:

```bash
# Clone the repository
git clone https://github.com/mitaka1210/d-dimitrov.git
cd d-dimitrov

# Install frontend dependencies
npm install

# Start local PostgreSQL (if using Docker)
docker-compose up -d postgres

# Start backend API server (Express.js)
cd backend && npm install && npm run dev

# Start frontend development server (Next.js)
cd .. && npm run dev
```

### Production Docker Setup

The production environment uses Docker containers with Nginx:

```bash
# Build and start all containers
docker-compose up -d --build

# Check container status
docker ps

# View logs
docker-compose logs -f
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
   cp ..env.example ..env.local
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
| `npm run dev` | Start frontend development server |
| `npm run build` | Build frontend for production |
| `npm run start` | Start production frontend server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | TypeScript type checking |
| `docker-compose up -d` | Start all containers in background |
| `docker-compose logs -f` | View container logs |
| `docker-compose down` | Stop all containers |

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

### Production Architecture

The portfolio runs on a **self-hosted server** with the following setup:

#### Domain & DNS Configuration
```bash
# Main domain (Bulgarian)
d-dimitrov.eu → Server IP → Nginx → Frontend Container

# English subdomain  
eng.d-dimitrov.eu → Server IP → Nginx → Frontend Container (EN)
```

#### Docker Compose Production Setup
```yaml
# docker-compose.yml structure
services:
  nginx:          # Reverse proxy & load balancer
  frontend:       # Next.js application
  backend:        # Express.js API server
  postgres:       # PostgreSQL database
```

#### Nginx Configuration
```nginx
# Simplified nginx.conf structure
server {
    server_name d-dimitrov.eu;
    location / {
        proxy_pass http://frontend:3000;
    }
    location /api/ {
        proxy_pass http://backend:5000;
    }
}

server {
    server_name eng.d-dimitrov.eu;
    location / {
        proxy_pass http://frontend-en:3000;
    }
}
```

### Deployment Process

1. **Code Push** to GitHub repository
2. **Server Pull** latest changes
3. **Container Rebuild** with Docker Compose
4. **Nginx Reload** for routing updates
5. **Cloudflare Cache** purging (if needed)

### Environment Variables

```bash
# Production ..env
DATABASE_URL=postgresql://user:pass@postgres:5432/portfolio
API_URL=http://backend:5000
NEXTAUTH_URL=https://d-dimitrov.eu
CLOUDFLARE_API_TOKEN=your_token
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

- 🌐 **Portfolio**: [d-dimitrov.eu](https://d-dimitrov.eu)
- 🇬🇧 **English**: [eng.d-dimitrov.eu](https://eng.d-dimitrov.eu)
- 💻 **GitHub**: [@mitaka1210](https://github.com/mitaka1210)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>✨ Built with passion using Next.js, React, and modern web technologies ✨</p>
  <p>🚀 <a href="https://d-dimitrov.eu">Visit Live Portfolio</a> | <a href="https://eng.d-dimitrov.eu">English Version</a> 🚀</p>
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
