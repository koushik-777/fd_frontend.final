export default defineConfig({
  plugins: [react()],
  base: './', // Make sure this is correct for relative paths
  server: {
    proxy: {
      '/api': {
        target: 'https://foodelivery-backend-final.onrender.com',
        changeOrigin: true,
      }
    }
  }
});
