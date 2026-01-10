import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa';


export default defineConfig({
  plugins: [
    tailwindcss(),
  
  
],



  server: {
    proxy: {
      "/api": {
      target: "http://localhost:5001",
        changeOrigin: true,
        secure: false,
      }
    }
  }
  
})
