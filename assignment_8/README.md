# Personal Website — MongoDB + Express + EJS

This update converts the uploaded static HTML personal website into a dynamic website. Content is stored in MongoDB and fetched by Express before EJS renders each page. The original CSS is retained.

## Project structure

```text
personal_website/
├── models/
│   └── Website.js
├── public/
│   └── css/
│       └── style.css
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── home.ejs
│   ├── about.ejs
│   └── contact.ejs
├── .env.example
├── .gitignore
├── package.json
├── seed.js
└── server.js
```

## Run the project

1. Install Node.js and MongoDB Community Server, or create a MongoDB Atlas database.
2. Open this folder in a terminal.
3. Install packages:

   ```bash
   npm install
   ```

4. Copy `.env.example` to a new file named `.env` and set your MongoDB connection string:

   ```env
   PORT=3000
   MONGODB_URI=mongodb://127.0.0.1:27017/personal_website
   ```

   For Atlas, use your Atlas connection string instead. Never commit `.env` to GitHub.

5. Insert the sample website content:

   ```bash
   npm run seed
   ```

6. Start the server:

   ```bash
   npm start
   ```

7. Open http://localhost:3000.

## How the dynamic website works

- `models/Website.js` defines the Mongoose schema for profile, home, about, skills, education, contact cards and footer content.
- `seed.js` inserts the initial content from the uploaded website into MongoDB.
- `server.js` connects to MongoDB, retrieves the website document and renders the correct EJS page.
- `views/home.ejs`, `views/about.ejs` and `views/contact.ejs` display database values.
- Header and footer are reusable EJS partials.
- `public/css/style.css` is the original stylesheet.

After updating content in the MongoDB `websites` collection, refresh the relevant page to see the changes. Run `npm run seed` again only if you want to reset the content to the supplied sample values.
