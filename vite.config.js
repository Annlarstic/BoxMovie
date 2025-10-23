// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr'; // <-- NEW IMPORT

export default defineConfig({
  plugins: [
    react(),
    svgr() // <-- NEW PLUGIN CALL
  ],
});
