# Melvin Mathew — Portfolio Website

A responsive, dark editorial-style personal portfolio built with Next.js 15, TypeScript, Tailwind CSS v4 and lucide-react.

## Run locally

1. Install Node.js 20.9 or later.
2. Open a terminal in this folder.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open http://localhost:3000

## Production build

```bash
npm run build
npm start
```

## Deploy free on Vercel

1. Create a free account at https://vercel.com.
2. Create a GitHub repository and upload the contents of this folder.
3. In Vercel, choose **Add New → Project**, then import that GitHub repository.
4. Keep the detected Next.js settings and click **Deploy**.
5. Vercel will provide a public URL. You can connect a custom domain later if you have one.

## Animation controls

- **Pause / Resume** — pauses or resumes the build animation.
- **Agents On / Off** — toggles the robot cursor build sequence. The preference is saved in localStorage.
- **Tour** — reloads the page and automatically scrolls through the portfolio. Manual scrolling or Escape stops the tour.
- Keyboard shortcuts: **P** pause, **A** agents, **T** tour, **Esc** stop tour.
- `?agents=on` forces the build animation on; `?agents=off` disables it.

The animation respects reduced-motion preferences unless `?agents=on` is used.

## Personal details

The portfolio content is based on the supplied resume. The phone number is not included. The portrait is stored at `public/headshot.png`.
