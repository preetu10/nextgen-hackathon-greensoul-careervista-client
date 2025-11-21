# CareerVista!
**CareerVista** is an AI-powered youth employment and career roadmap platform designed to support **SDG 8: Decent Work and Economic Growth**. The platform helps students, fresh graduates, and job seekers identify relevant opportunities, understand their skills, and plan their career journey effectively.

This project was developed during **IIUC Tech Fest 2025 - NextGen Hackathon**, where our team (Team GreenSoul) achieved **7th place** among competing teams. The hackathon challenged participants to create innovative solutions addressing the United Nations Sustainable Development Goals.

## 🔗 GitHub Repositories
-   **Frontend Client**: [nextgen-hackathon-greensoul-careervista-client](https://github.com/preetu10/nextgen-hackathon-greensoul-careervista-client)
-   **Backend Server**: [nextgen-hackathon-greensoul-careervista-server](https://github.com/RaisaNuzhat/nextgen-hackathon-greensoul-careervista-server)

## 🛠️ Tech Stack
### Core Technologies
-   **React.js** - Frontend framework
-   **Tailwind CSS** - Styling
-   **Express.js** - Backend framework
-   **Firebase** - Authentication
-   **MongoDB** - Database
-   **Hugging Face API** - AI/LLM integration (GPT-OSS-120B)

## 🎯 Key Features

### 🔐 Authentication & User Management
-   Secure user registration and login with Firebase Authentication
-   Email/password authentication
-   Protected routes and session management
-   User profile creation with comprehensive details

### 👤 User Profile & Skills Management
-   Interactive profile dashboard
-   Add, edit, and manage skills with tag-based interface according to interested career track
-   Experience and project descriptions
-   Career interest or  target role selection
-   CV/resume link upload

### 💼 Jobs & Opportunities
-   Browse all available job listings
-   Advanced filtering by role, location, and job type
-   Detailed job view with requirements
-   Match percentage display for personalized recommendations based on skills, experience level, and career track
-   Recommendation of courses to gain missing skills for specific jobs

### 📚 Learning Resources
-   Curated collection of learning resources
-   Filter by skill, platform, and cost (Free/Paid)
-   Resources from YouTube, Coursera, Udemy, and local platforms
-   Direct links to learning materials
-   Recommendation of courses according to career track

### 🤖 AI-Powered Features
-   **Smart Skill Extraction & Career Track Recommendation**: AI-based CV analysis using Hugging Face LLM with automatic skill extraction and career track suggestions based on identified skills, with profile update options
-   **AI-Generated Career Roadmap**: Personalized step-by-step learning plans with PDF download and copy options
-   **CareerBot Assistant**: AI-powered mentor for career guidance and queries

### 📊 Analytics & Insights
-   Match percentage for job opportunities
-   Skill overlap visualization
-   Missing skills identification
-   Learning recommendations based on skill gaps
-   User dashboard showing analytics and trends of jobs and required skills

### 📄 CV Tools
-   Auto-generate professional CV from profile data
-   Professional summary selection according to career path and user preferences
-   Export to PDF 

### 🛡️ Admin Panel
-   Manage job listings
-   Manage learning resources
-   Add new job posts
-   Dashboard showing platform analytics and trends
## 🚀 Installation & Setup

### 1. Clone the Repository

bash

```bash
git clone https://github.com/preetu10/nextgen-hackathon-greensoul-careervista-client.git
cd nextgen-hackathon-greensoul-careervista-client
```

### 2. Install Dependencies

bash

```bash
npm install
# or
yarn install
```

### 3. Environment Configuration

Create a `.env` file in the root directory and set all configurations.

### 4. Run Development Server

bash

```bash
npm run dev
# or
yarn dev
```

The application will start at http://localhost:5173


### Contributors
- [Mahfuja Yesmin](https://github.com/preetu10)
- [Raisa Nuzhat](https://github.com/RaisaNuzhat)