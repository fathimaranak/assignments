# Movie Details App

Node.js + Express + MongoDB (Mongoose) + EJS. Movie details are loaded dynamically from the `Movies` collection in the `MovieDB` database.

## Setup

1. Install Node.js 18 or newer and MongoDB (or use a free MongoDB Atlas cluster).
2. Install dependencies:
   ```bash
   npm install
   ```
3. (Optional) Change the defaults:
   ```bash
   cp .env.example .env
   ```
   Defaults are `PORT=3000` and `MONGODB_URI=mongodb://127.0.0.1:27017/MovieDB`.
4. Load the 12 sample movies into MongoDB:
   ```bash
   npm run seed
   ```
5. Start the app and open http://localhost:3000:
   ```bash
   npm start
   ```
   For auto-restart while editing: `npm run dev`.

## Project structure

```
movie-details-app/
├── server.js               Express setup, error handlers
├── config/db.js            Mongoose connection with retry
├── models/Movie.js         Schema for the Movies collection
├── routes/movies.js        list/search/filter, detail page, add-movie form (GET /movies/new, POST /movies)
├── views/                  EJS templates (index, movie, error, partials)
├── public/css, js, posters Styles, small client script, sample poster images
├── data/movies.json        Sample documents
└── scripts/                seed.js, generate-posters.js
```

## Using your own data

Insert documents shaped like this (see `data/movies.json`):

```json
{
  "movieId": 13,
  "movieName": "Example Movie",
  "director": "Jane Doe",
  "genre": "Drama",
  "releaseYear": 2020,
  "language": "English",
  "duration": 110,
  "rating": 7.5,
  "description": "A short summary.",
  "posterUrl": "https://example.com/poster.jpg"
}
```

Run `npm run seed` again to reset the collection to the sample data (it deletes existing movies first).
