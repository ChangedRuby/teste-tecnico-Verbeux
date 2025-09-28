# Teste-Tecnico-Verbeux
This project was created for the Verbeux company's talent gathering process as a technical challenge.

# Objectives
The project is a feedback platform for costumers of a food sector company, aiming to gather positive and negative feedbacks to improve services.

# How the project works
The project uses the Verboo platform api to communicate with an agentic llm (chat bot), which can activate actions and communicate with apis. The Verboo platform, in other hand, communicates with a Firestore Database to store the feedbacks, which the frontend reads to generate the feedbacks visually.
The project also features a backend that communicates with Firebase and the Verboo api.
#
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
