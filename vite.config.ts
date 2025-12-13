import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react()],
    define: {
      // Expose process.env.API_KEY via define for the SDK
      // Prioritize VITE_API_KEY, then API_KEY
      'process.env.API_KEY': JSON.stringify(env.VITE_API_KEY || env.API_KEY),
      // Add a build timestamp to help debug stale deployments
      'process.env.BUILD_TIME': JSON.stringify(new Date().toISOString()),
    },
  };
});