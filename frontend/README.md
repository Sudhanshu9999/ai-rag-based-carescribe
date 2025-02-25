# AI RAG-Based CareScribe

**AI RAG-Based CareScribe** is an AI-powered, Retrieval-Augmented Generation (RAG) based application for summarizing medical notes. It includes:

- **Frontend:** Built with React, Next.js, TypeScript, and Tailwind CSS.
- **Backend:** Developed in Node.js and Express, with PostgreSQL for data storage.
- **AI Service:** A FastAPI application that leverages LangChain and FAISS for summarization.

## Features

- **User Authentication:** Secure login and registration.
- **Medical Note Management:** Create, edit, and delete your notes.
- **AI Summaries:** Generate concise summaries of your notes.
- **RAG-Based Summarization:** Retrieval-Augmented Generation technology for accurate summaries.

## Setup

### Frontend

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with:
   ```dotenv
   NEXT_PUBLIC_API_BASE_URL=http://localhost:5001/api
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   Your Next.js app will run at [http://localhost:3000](http://localhost:3000).

### Backend

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following (replace placeholders with actual values):
   ```dotenv
   PORT=5001
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=ai_med_notes
   JWT_SECRET=your_jwt_secret
   SUMMARIZATION_API_URL=http://localhost:8000/api/summarize
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
   or build and run:
   ```bash
   npm run build
   node dist/server.js
   ```
   Your Express server will run at [http://localhost:5001](http://localhost:5001).

### AI Service

1. Navigate to the `ai-service` folder:
   ```bash
   cd ai-service
   ```
2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the FastAPI service:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```
   The AI service will run at [http://localhost:8000](http://localhost:8000).

### Environment Variables

Make sure to set the necessary environment variables in the appropriate `.env` or `.env.local` files:

- **Frontend (.env.local):**
  ```dotenv
  NEXT_PUBLIC_API_BASE_URL=http://localhost:5001/api
  ```
- **Backend (.env):**
  ```dotenv
  PORT=5001
  DB_USER=your_db_user
  DB_PASSWORD=your_db_password
  DB_HOST=localhost
  DB_PORT=5432
  DB_NAME=ai_med_notes
  JWT_SECRET=your_jwt_secret
  SUMMARIZATION_API_URL=http://localhost:8000/api/summarize
  ```
- **AI Service (.env if needed):**
  ```dotenv
  OPENAI_API_KEY=your_openai_api_key
  ```

## Deployment

For deployment, consider using Docker (or an alternative container solution) to containerize your application. A Docker setup is provided in the `docker/` folder.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements.

## Author

Created by Sudhanshu Jadhav