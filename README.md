# Leucine-Todo Summary Assistant
A Full-stack To-Do tool that allows users to manage to-do items and summarize pending tasks using Cohere's LLM API. The summary is automatically sent to a Slack channel.

This project includes:
- A React frontend built with Vite and tailwindCSS for styling.
- A Supabase backend that acts as BaaS(Backend As A Service).
- A Node.js backend integrated with cohere's LLM API (The model being command-r-plus in this case).
- Slack integration to post task summaries. So we can view these summaries in slack channels.
- Finally, Vercel deployement of the same.

  ## Setup Instructions

### Packages used:
- Node.js (v18 or later)
#### Backend Packages:
- "@supabase/supabase-js": "^2.49.7",
- "axios": "^1.9.0",
- "body-parser": "^2.2.0",
- "cohere-ai": "^7.17.1",
- "cors": "^2.8.5",
- "dotenv": "^16.5.0",
- "express": "^5.1.0",
- "node-fetch": "^3.3.2",
- "nodemon": "^3.1.10"
#### Frontend Packages:
- "@tailwindcss/cli": "^4.1.7",
 -   "@tailwindcss/vite": "^4.1.7",
 -   "axios": "^1.9.0",
 -   "react": "^19.1.0",
 -   "react-dom": "^19.1.0",
  -  "react-hot-toast": "^2.5.2",
  -  "styled-components": "^6.1.18"
- npm
- A Slack workspace with access to create Incoming Webhooks
- A HuggingFace or similar LLM API key (if using remote models)

