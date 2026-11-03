# Express + MongoDB Authentication

Username/password login using Node.js, Express, Mongoose, bcrypt and express-session
(sessions stored in MongoDB via connect-mongo). Views are rendered with EJS.

## Project structure

```
auth-app/
├── server.js              # App setup, sessions, MongoDB connection
├── package.json
├── .env.example           # Copy to .env
├── models/User.js         # Mongoose schema (bcrypt hashing on save)
├── routes/auth.js         # /login, /register, /dashboard, /logout
├── middleware/auth.js     # requireAuth, redirectIfAuth
├── views/
│   ├── login.ejs
│   ├── register.ejs
│   ├── dashboard.ejs
│   └── partials/ (head.ejs, foot.ejs)
└── public/css/style.css
```

## Prerequisites

- Node.js 18 or newer
- MongoDB running locally (`mongodb://127.0.0.1:27017`) or a MongoDB Atlas connection string

## Install and run

```bash
cd auth-app
npm install
cp .env.example .env        # Windows PowerShell: copy .env.example .env
# edit .env and set SESSION_SECRET (and MONGODB_URI if not local)
npm start
```

Open http://localhost:3000, click **Register** to create a user, then log in.

For auto-restart during development: `npm run dev`.

## Routes

| Method | Path        | Description                          |
|--------|-------------|--------------------------------------|
| GET    | /           | Redirects to /dashboard or /login    |
| GET    | /login      | Login form                           |
| POST   | /login      | Verify credentials, start session    |
| GET    | /register   | Registration form                    |
| POST   | /register   | Create user (password hashed)        |
| GET    | /dashboard  | Protected page (login required)      |
| POST   | /logout     | Destroy session                      |

## Using this in your existing app

1. Copy `models/User.js`, `middleware/auth.js`, `routes/auth.js`.
2. Add the session setup and `express.urlencoded` from `server.js`.
3. In your existing login EJS, make the form `method="POST" action="/login"` with
   inputs named `username` and `password`, and render the `error` variable.
4. Protect any route with `requireAuth`.
5. `npm install bcrypt connect-mongo dotenv express-rate-limit express-session mongoose`

## Security notes

- Passwords are hashed with bcrypt (cost 12); plain text is never stored.
- Login errors are intentionally generic ("Invalid username or password.") so attackers
  cannot discover which usernames exist.
- Login is rate-limited (20 attempts / 15 min per IP).
- The session ID is regenerated on login; cookies are `httpOnly` and `sameSite=lax`.
- In production, serve over HTTPS and set `NODE_ENV=production` (enables secure cookies).
- Logout uses POST. For stronger protection on forms, add CSRF tokens
  (e.g. the `csrf-csrf` package) before going live.
