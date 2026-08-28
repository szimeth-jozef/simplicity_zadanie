import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tanstackRouterVite from '@tanstack/router-plugin/vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tanstackRouterVite(),
    react(),
    tailwindcss(),
  ],
})