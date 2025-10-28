# TicketApp — React Implementation


This is a complete React (Vite) implementation for the Ticket Management challenge.


## Features
- Landing page with wavy SVG hero, decorative circles, and cards
- Login and Signup with form validation and toasts
- Dashboard with summary stats
- Ticket management with full CRUD (create, read, update, delete)
- Client-side simulated auth (localStorage) using key `ticketapp_session`
- Protected routes: `/dashboard`, `/tickets` and ticket forms
- Accessible and responsive layout (max-width 1440px centered)


## Libraries
- React 18
- react-router-dom for routing
- react-hot-toast for notifications
- zustand (optional; not required in this minimal example)


## Setup
1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Open http://localhost:5173


## Seeded test account
- Email: `test@example.com`
- Password: `Password123!`


## Notes on structure
- `src/services/auth.js` & `src/services/tickets.js` simulate APIs via `localStorage`.
- Session token is stored in `localStorage` key `ticketapp_session`.
- Validation rules enforce required `title` and `status`, and status must be `open`, `in_progress`, or `closed`.


## Accessibility
- Semantic HTML and visible focus states used.
- Images include `alt` text.


## Known issues
- This is a single-user local front-end simulation. In a real app, replace services with real API calls and secure storage.


---


# End of project files



