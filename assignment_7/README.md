# Dynamic Resume — Node.js, Express, EJS and MongoDB

The resume content is stored in MongoDB and loaded dynamically by Express before rendering `views/resume.ejs`. The existing resume styling is kept in `public/style.css`.

## 1. Requirements
- Node.js 18 or newer
- MongoDB Community Server running locally, or a MongoDB Atlas connection string

## 2. Install dependencies
Open this project folder in VS Code / CMD:

```bash
npm install
```

## 3. Configure MongoDB
Copy `.env.example` and rename the copy to `.env`.

For local MongoDB, use:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/fathima_resume
```

For MongoDB Atlas, replace the URI with your Atlas connection string. Keep `.env` private and do not upload it to GitHub.

## 4. Insert the sample resume into MongoDB

```bash
npm run seed
```

This creates or updates one resume document with the content from your uploaded resume.

## 5. Start the application

```bash
npm start
```

Open http://localhost:3000.

## How it works
1. `models/Resume.js` defines the MongoDB/Mongoose schema.
2. `seed.js` inserts the initial resume information into MongoDB.
3. `server.js` connects to MongoDB and fetches the resume document.
4. `views/resume.ejs` displays the data using EJS variables and loops.
5. `public/style.css` contains the resume styling.

To change resume information, update the document in MongoDB and refresh the page. You do not need to edit the EJS template for normal content changes.

## Project structure

```text
Fathima_Rana_Node_Resume/
├── models/
│   └── Resume.js
├── public/
│   └── style.css
├── views/
│   └── resume.ejs
├── .env.example
├── .gitignore
├── package.json
├── README.md
├── seed.js
└── server.js
```

## Important
The sample data is based on the resume content supplied in the uploaded project. Review it for accuracy before publishing. The database connection must be available before the app can start.
