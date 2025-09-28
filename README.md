# Teste-Tecnico-Verbeux
This project was created for the Verbeux company's talent gathering process as a technical challenge.

# Objectives
The project is a feedback platform for costumers of a food sector company, aiming to gather positive and negative feedbacks for further research.

# Features
- Chat session with Verboo chat bot.
- Feedback registration.
- Feedback history with separation from positive to negative.
- The bot can interpret messages from chat history.

# How the project works
The project uses the Verboo platform api to communicate with an agentic llm (chat bot), which allows Verboo to activate actions and communicate with apis. The Verboo platform, in other hand, communicates with a Firestore Database to store the feedbacks, which the frontend reads to generate the feedbacks visually.
The project also features a backend that communicates with Firebase and the Verboo api.
# Visit
The project is hosted in Vercel.

App url: https://teste-tecnico-verbeux.vercel.app/

# Usage
```
git clone <this.repository>
```
Create .env document with 'API_KEY: your-verboo-api-key'
```
npm install
vercel dev
```
Login to Vercel and follow the setup steps.
