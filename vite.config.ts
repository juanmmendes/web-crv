import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc' // ou '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/web-crv/', // necessário para GitHub Pages
})
