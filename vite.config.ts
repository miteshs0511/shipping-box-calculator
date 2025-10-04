import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/shipping-box-calculator/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
