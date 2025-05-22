# Leucine-Todo Summary Assistant
A Full-stack To-Do tool that allows users to manage to-do items and summarize pending tasks using Cohere's LLM API. The summary is automatically sent to a Slack channel.

This project includes:
- A React frontend built with Vite and tailwindCSS for styling.
- A Supabase backend that acts as BaaS(Backend As A Service).
- A Node.js backend integrated with cohere's LLM API (The model being command-r-plus in this case).
- Slack integration to post task summaries. So we can view these summaries in slack channels.
- Finally, Vercel deployement of the same.


## Requirements:
- Node.js (v18 or later)
- - npm
- A Slack workspace with access to create Incoming Webhooks and a webhook URL
- A Cohere account and Cohere API Key
- A Supabase account with Supabase URL and Supabase Key
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

  ## Slack and LLM setup:
1) Setting up Supabase:
   - Create a supabase account and a table with columns 'title' and 'completed'.
   - Disable RLS on the sql editor with sql query such as 'ALTER TABLE todos DISABLE ROW LEVEL SECURITY;'. This is optional. If you want security, you can ignore. I disabled it to avoid errors and also since it's 
     a low scale project.
   - Copy your supabase url and key and store it in a env file to access them.
2) Setting up Cohere:
   - Create a cohere account and go to API keys.
   - Copy the trial API key and store it on env file to access a cohere LLM of your choosing, I chose command-r-plus.
   - After integrating the llm, prompt it according to your needs.
3) Setting up Slack API:
   - Create a slack account
   - Create a slack workspace/app and name it
   - Go to the app's settings, specifically features. You will come across 'Incoming Webhooks'.
   - Copy the webhook URL and store it on your env file.
   - But first, create a slack channel so the LLM could send the summaries to the bot/channel.
   - Allow the channel access to you slack app.
   - Post the summary using node via post request to webhook url.
  
  ## Setup Instructions:
  1) git clone https://github.com/HarisJSV/Leucine-Todo.git
  2) cd to the project directory
  3) use 'npm install' on both backend and front end terminals, npm will install all dependencies using backend and frontend's respective package.json file.
  4) npm run dev for frontend
  5) nodemon index.js for backend. I used nodemon because it was much easier because I never had to manually restart my server for every change. (Optional to use nodemon).
  6) I have included all the necessary variables in the .env.example file to seamlessly connect with your respective supabase, cohere accounts ,etc.

## Design/Architecture decisions:
1) Frontend Framework:
- The application is built using React with Vite for fast development and optimized build performance.

2) Styling:
- Tailwind CSS is used for utility-first styling, enabling rapid UI development and consistent design.

3) Task Views:
- A dashboard layout is implemented to allow users to navigate between different views:

->All Tasks

->Completed Tasks

->Pending Tasks

4) Task Completion:
- Task completion is managed via a checkbox, which updates the completed boolean column in the Supabase todos table.

- When marked complete, the task title appears with a strikethrough effect.

5)User Feedback:
- The app uses toast notifications to provide real-time feedback for the following actions:

  -> Adding a new task

-> Deleting a task

-> Editing a task

->Sending a task summary to Slack channel (success or failure)

6)Database:
- Supabase is used as the backend database. Each task record includes a completed boolean field to track its status.

![image](https://github.com/user-attachments/assets/ffb862c0-cc48-41fd-972f-900108981b82)

