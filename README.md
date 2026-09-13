# OJT Placement System — Frontend

React frontend for the OJT Placement and Monitoring System, consuming the NestJS backend API.

## Tech Stack
- React + Vite
- Tailwind CSS v4
- React Router
- Axios

## Features
- Login with JWT authentication
- Dashboard showing placements (role-aware: student sees own placements, coordinator sees all)
- Create new placement applications
- Placement detail view with logbook entries
- Coordinator approve/reject workflow

## Running Locally

1. Clone the repository
2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`
3. Make sure the backend (ojt-placement-api) is running at `http://localhost:3000`
4. Run the dev server:
   \`\`\`
   npm run dev
   \`\`\`
5. Open `http://localhost:5173`

## Backend Repository
https://github.com/leeebisreal616/ojt-placement-api