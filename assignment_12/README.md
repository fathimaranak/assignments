# Personal Website — React + MongoDB

This project converts the supplied HTML/CSS personal website into a dynamic React application. Portfolio information is stored in local MongoDB and fetched with Axios from an Express API.

## Requirements

- Node.js LTS
- MongoDB Community Server running locally
- MongoDB Compass (optional)

## Run the project

1. Open this folder in VS Code.
2. Create `.env` in the root folder (same location as `server.js`):

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/personalWebsiteDB
CLIENT_URL=http://localhost:5173
```

3. Install dependencies:

```bash
npm install
```

4. Start backend in terminal 1:

```bash
npm run server
```

Expected output includes MongoDB connected, initial website data inserted, and server running on port 5000.

5. Start frontend in terminal 2:

```bash
npm run dev
```

6. Open http://localhost:5173.

## API

- `GET http://localhost:5000/api/health`
- `GET http://localhost:5000/api/website`

## How dynamic data works

- `data/websiteData.js` contains the initial portfolio content.
- `models/Website.js` defines the Mongoose schema.
- `server.js` connects to MongoDB and inserts initial data only if the collection is empty.
- `routes/websiteRoutes.js` exposes the GET endpoint.
- `src/App.jsx` uses Axios inside `useEffect` and React state to display data.

## Update the portfolio

Edit the document in MongoDB Compass under `personalWebsiteDB` → `websites`. Refresh the React page to fetch and display the updated data. The initial seed data is only inserted when the collection is empty; editing `data/websiteData.js` later does not overwrite an existing database document.

## Git safety

Do not commit `.env` or `node_modules`. Both are ignored by `.gitignore`.
