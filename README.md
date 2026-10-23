# Aurora Access

A modern self-hosted browser portal inspired by the clean architecture of the Holy Unblocker-style frontend, but rebuilt with a cleaner, more premium theme and a simpler deployment model.

## Overview

Aurora Access is a modern browser UI that routes web requests through a backend proxy instead of fetching pages directly from the browser. This keeps the front-end lightweight and easy to host on GitHub Pages while the backend handles the actual network requests.

## Recommended free architecture

- Frontend: GitHub Pages
- Backend: Replit, Render, or another lightweight Node-compatible hosting service
- Cost: $0 for a small personal deployment

## Project structure

- `index.html` — main webpage and browser shell
- `styles.css` — glassmorphism + neon dark theme
- `app.js` — frontend logic and proxy URL handling
- `backend/worker.js` — optional serverless proxy idea for a backend

## Deployment

1. Deploy your backend proxy service.
2. Replace the placeholder in `app.js`:
   `const PROXY_API = "https://your-backend-url.example.com/proxy";`
3. Push the front-end to GitHub.
4. Enable GitHub Pages in the repository settings.
5. Open the GitHub Pages URL in your browser.

## Notes

- GitHub Pages alone cannot fetch arbitrary websites directly in a browser.
- The backend is required to perform the actual request.
- This project is made for self-hosting and personal deployment use.

## License

MIT
