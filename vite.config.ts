import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, '.', '');

  // CRITICAL FIX: Prioritize process.env (Vercel system envs) over loaded .env files
  // This ensures that when you update variables in Vercel, they take precedence immediately.
  const apiKey = process.env.VITE_API_KEY || process.env.API_KEY || env.VITE_API_KEY || env.API_KEY || '';

  return {
    plugins: [react()],
    define: {
      // Expose the API key on process.env.API_KEY as per coding guidelines
      'process.env.API_KEY': JSON.stringify(apiKey),
      // Add a build timestamp
      'process.env.BUILD_TIME': JSON.stringify(new Date().toISOString()),
    },
  };
});