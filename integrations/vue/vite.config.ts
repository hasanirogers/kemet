import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
const customElements = ['kemet-drawer', 'kemet-icon', 'kemet-button'];
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => customElements.includes(tag),
        }
      }
    })
  ],
})
