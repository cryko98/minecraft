import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, '.', '');

  // Prioritize VITE_API_KEY, fallback to API_KEY (for Vercel compatibility)
  const apiKey = env.VITE_API_KEY || env.API_KEY || '';

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