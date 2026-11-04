# My Dynamic Resume — Single Folder Project

A dynamic resume application using React.js, Node.js, Express, MongoDB, Mongoose and Axios. The frontend and backend are kept in one project folder. You do not need MongoDB Atlas; this setup uses local MongoDB.

## Folder structure

```text
my-resume-single-folder/
├── src/                    # React frontend
│   ├── components/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── config/
│   └── db.js
├── models/
│   └── Resume.js
├── routes/
│   └── resumeRoutes.js
├── data/
│   └── resumeData.js
├── server.js               # Express backend
├── index.html
├── vite.config.mjs
├── package.json
└── .env.example
```

## Requirements

Install Node.js LTS and MongoDB Community Server on your computer. MongoDB Compass is optional but helpful for viewing your database.

- MongoDB Community Server: https://www.mongodb.com/try/download/community
- MongoDB Compass: https://www.mongodb.com/try/download/compass

## Step 1: Open project

Extract the ZIP and open the `my-resume-single-folder` folder in VS Code.

## Step 2: Configure environment

Create a file named `.env` in the project root (same level as `server.js`) and add:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/resumeDB
CLIENT_URL=http://localhost:5173
```

Make sure your local MongoDB service is running.

## Step 3: Install dependencies

Open the VS Code terminal in the project root:

```bash
npm install
```

## Step 4: Start backend

Open the first terminal:

```bash
npm run server
```

Expected output:

```text
MongoDB connected successfully
Initial resume data inserted into MongoDB
Server running at http://localhost:5000
```

The initial resume record is inserted only if the collection is empty.

You can test the API at:
- http://localhost:5000/api/health
- http://localhost:5000/api/resume

## Step 5: Start React frontend

Open a SECOND terminal in the same project root:

```bash
npm run dev
```

Open the Vite URL, usually http://localhost:5173.

Keep both terminals running. The project is in one folder, but the frontend development server and backend API server are separate processes.

## How it works

1. `data/resumeData.js` provides initial resume data.
2. `models/Resume.js` defines the MongoDB schema.
3. `server.js` connects to MongoDB and seeds the first resume record.
4. `routes/resumeRoutes.js` exposes `GET /api/resume`.
5. `src/App.jsx` uses Axios inside `useEffect` to fetch the API response.
6. React stores the result in state and uses `.map()` to display dynamic sections.

## Update your resume data

Edit `data/resumeData.js` before the first run. If the database already contains a resume document, the seed data will not overwrite it. To reseed after editing, open MongoDB Compass, select `resumeDB` → `resumes`, delete the existing document, then restart the backend.

## Important

- Do not put MongoDB credentials in React files.
- Do not upload `.env` to GitHub.
- `npm run server` starts Express; `npm run dev` starts React.
