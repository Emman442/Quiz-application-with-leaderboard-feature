import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",

  // server: {
  //   headers: {
  //     "Content-Security-Policy": "connect-src 'self' https://api.dscvr.one https://api1.stg.dscvr.one https://*.helius-rpc.com https://quiz-app-backend-cy25.onrender.com/api/v1/user/signup",
  //   },
  // },
});
