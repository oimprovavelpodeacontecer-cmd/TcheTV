import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
// NOVO: Importar para definir __dirname
import { fileURLToPath } from 'url' 

// NOVO: Definição de __filename e __dirname para ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  server: {
    host: true,
  },
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Agora __dirname funcionará
    },
  },
})