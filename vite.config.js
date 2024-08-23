import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    hmr: false,
    headers: {
      "Content-Security-Policy": `
      default-src 'self'; 
      connect-src 'self' https://quiz-app-backend-cy25.onrender.com http://localhost:* https://*.dial.to https://proxy.dial.to; 
      img-src 'self' https://media.dscvr.one https://*.dial.to https://proxy.dial.to; 
      script-src 'self' https://xxxx 'unsafe-inline' 'unsafe-eval';
      style-src 'self' 'unsafe-inline';
    `
        .replace(/\s{2,}/g, " ")
        .trim(), // Minimize spaces
    },
  },
});

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   base: "/",
//   server: {
//     hmr: false,
//     headers: {
//       "Content-Security-Policy": `
//       default-src 'self';
//       connect-src 'self' https://quiz-app-backend-cy25.onrender.com http://localhost:* https://*.dial.to/ https://proxy.dial.to/;
//       img-src 'self' https://media.dscvr.one https://*.dial.to/ https://proxy.dial.to/;
//       script-src 'self';
//       style-src 'self' 'unsafe-inline';
//     `,
//     },
//   },
// });
