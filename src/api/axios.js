import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Log para debugging (solo en desarrollo)
if (import.meta.env.DEV) {
  console.log('API Base URL:', baseURL);
}

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      const { status, data } = error.response;
      let message = 'Ha ocurrido un error';
      
      if (data?.message) {
        message = data.message;
      } else if (data?.details) {
        // Si hay detalles de validación
        const details = typeof data.details === 'string' 
          ? data.details 
          : Object.values(data.details).join(', ');
        message = details;
      } else if (data?.error) {
        message = data.error;
      }
      
      return Promise.reject({
        status,
        message,
        data: data?.details || data,
      });
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta
      return Promise.reject({
        status: 0,
        message: 'No se pudo conectar con el servidor. Verifica que el backend esté corriendo.',
      });
    } else {
      // Algo pasó al configurar la petición
      return Promise.reject({
        status: 0,
        message: error.message || 'Error al realizar la petición',
      });
    }
  }
);

export default apiClient;


