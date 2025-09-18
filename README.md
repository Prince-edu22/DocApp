# Doctor Appointment App (MERN)

A full-stack doctor appointment booking application built with MongoDB, Express, React (Vite), and Node.js.

## Features
- JWT authentication (patient/doctor roles)
- Doctor profiles: specialty, clinic, location, fee, availability scaffold
- Search/browse doctors
- Appointments: create, list (patient + doctor), cancel
- Polished UI with Chakra UI, custom branding, and subtle animations

## Tech Stack
- Backend: Node.js, Express, Mongoose, JSON Web Tokens
- Frontend: React (Vite), React Router, Axios, Chakra UI, Framer Motion
- Database: MongoDB

## Prerequisites
- Node.js LTS (>= 18)
- MongoDB running locally or a connection URI

## Getting Started

1) Install dependencies:

```powershell
# From project root
cd server
npm install
cd ..\client
npm install
```

2) Configure environment variables (backend): create `server/.env`

```ini
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/doctor_appointments
JWT_SECRET=change_me_local
```

3) Run the development servers (two terminals):

```powershell
# Terminal A (API)
cd server
npm run dev

# Terminal B (Client)
cd client
npm run dev
```

- API health: http://localhost:5000/health
- App URL: http://localhost:5173

The client proxies `/api` to `http://localhost:5000` (see `client/vite.config.js`).

## Scripts
Backend (`server/package.json`):
- `npm run dev` - start API with nodemon
- `npm start` - start API without nodemon

Frontend (`client/package.json`):
- `npm run dev` - start Vite dev server
- `npm run build` - production build
- `npm run preview` - preview production build

## Structure
```
app/
  server/
    src/
      models/            # User, DoctorProfile, Appointment
      routes/            # auth, doctors, appointments
      middleware/        # JWT auth middleware
      server.js          # Express app + Mongo connection
      config.js          # Loads .env config
    package.json
  client/
    src/
      pages/             # Login, Register, Doctors, Book, MyAppointments, DoctorDashboard
      context/           # AuthContext (JWT storage + axios header)
      App.jsx, main.jsx  # Router + Chakra theme
      index.css          # Global styles
    public/
      doctor.svg         # Favicon
    vite.config.js
    package.json
README.md
```

## API Overview
Auth (`/api/auth`)
- `POST /register` { name, email, password, role? patient|doctor }
- `POST /login` { email, password }

Doctors (`/api/doctors`)
- `GET /` list/search doctors `?q=...&specialty=...`
- `GET /me` (doctor) get my profile
- `POST /me` (doctor) upsert my profile

Appointments (`/api/appointments`)
- `POST /` (patient) book { doctorId, date (ISO), slot, notes? }
- `GET /me` (patient) my appointments
- `GET /doctor/me` (doctor) upcoming appointments
- `POST /:id/cancel` (patient/doctor) cancel

Send `Authorization: Bearer <token>` for protected routes.

## Notes
- Doctor `fee` is optional in the UI; empty input saves as 0.
- Availability UI is basic; extend `DoctorProfile.availability` to drive dynamic slots.

## Build
```powershell
cd client
npm run build
# serve dist or integrate with the API server
```

## Troubleshooting
- Proxy error from client: ensure API is running on 5000 and `/health` returns ok.
- White screen: check browser console; restart client `npm run dev`.
- Mongo connection error: start `mongod` and verify `MONGO_URI`.

## License
MIT
