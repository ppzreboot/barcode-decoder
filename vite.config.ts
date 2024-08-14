import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { app_base_path } from './const'

// https://vitejs.dev/config/
export default defineConfig({
  base: app_base_path,
  plugins: [react()],
})
