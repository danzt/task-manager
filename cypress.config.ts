import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    supportFile: false, // Deshabilita el archivo de soporte
    baseUrl: 'http://localhost:4200', // Asegúrate de configurar tu base URL
  },
});
