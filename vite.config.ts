import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          icons: [
            {
              src: '/vite-192-192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/vite-512-512.png',
              sizes: '512x512',
              type: 'image/png',
            }
          ]
        }
      })
  ],
})
