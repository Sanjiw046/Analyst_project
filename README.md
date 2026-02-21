# Analytics Platform - Frontend

This is the frontend application for the Analytics Platform built using:

- React (Vite)
- React Router
- Axios
- Context API
- React Leaflet (Map Visualization)
- JWT Authentication

The frontend connects to a Django REST backend and provides:

- Secure Login / Signup
- Role-Based Navigation
- Analytics Dashboard
- Interactive India Map
- State-wise and City-wise filtering
- Button click tracking

---

## Tech Stack

- React (Vite)
- React Router DOM
- Axios
- React Context API
- React Leaflet
- CSS Modules
- React Toastify

---

## Authentication Flow

1. User logs in via `/login`
2. Backend returns:

```json
{
  "user": {
    "id": 1,
    "username": "john",
    "role": "admin"
  },
  "refresh": "jwt_refresh_token",
  "access": "jwt_access_token"
}
```

