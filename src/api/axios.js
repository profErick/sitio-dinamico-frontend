import axios from 'axios';

let baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Normalizar la URL: agregar https:// si no tiene protocolo y /api si no termina con /api
if (baseURL && !baseURL.startsWith('http://') && !baseURL.startsWith('https://')) {
  baseURL = `https://${baseURL}`;
}
if (baseURL && !baseURL.endsWith('/api')) {
  baseURL = baseURL.endsWith('/') ? `${baseURL}api` : `${baseURL}/api`;
}

// Log para debugging (siempre, para ayudar en producción)
console.log('🔗 API Base URL configurada:', baseURL);

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para validar respuestas
apiClient.interceptors.response.use(
  (response) => {
    // Verificar que la respuesta sea JSON, no HTML
    const contentType = response.headers['content-type'] || '';
    if (contentType.includes('text/html')) {
      console.error('⚠️ ERROR: La API está devolviendo HTML en lugar de JSON.');
      console.error('URL configurada:', baseURL);
      console.error('Verifica que VITE_API_BASE_URL esté correctamente configurada en Netlify.');
      console.error('Debe ser: https://tu-backend.railway.app/api');
      throw new Error('La API está devolviendo HTML. Verifica la configuración de VITE_API_BASE_URL en Netlify.');
    }
    return response;
  },
  (error) => {
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      const { status, data, headers } = error.response;
      let message = 'Ha ocurrido un error';
      
      // Si la respuesta es HTML (error de Django), intentar extraer información
      const contentType = headers['content-type'] || '';
      if (contentType.includes('text/html') && typeof data === 'string') {
        // Intentar extraer el mensaje del HTML
        const titleMatch = data.match(/<title>(.*?)<\/title>/i);
        const h1Match = data.match(/<h1>(.*?)<\/h1>/i);
        const pMatch = data.match(/<p>(.*?)<\/p>/i);
        
        if (h1Match) {
          message = h1Match[1];
        } else if (titleMatch) {
          message = titleMatch[1];
        } else if (pMatch) {
          message = pMatch[1];
        } else {
          message = `Error ${status}: El servidor devolvió HTML en lugar de JSON. Esto puede indicar un problema con ALLOWED_HOSTS o CORS.`;
        }
        
        console.error('⚠️ El servidor devolvió HTML en lugar de JSON');
        console.error('Status:', status);
        console.error('Posibles causas:');
        console.error('1. ALLOWED_HOSTS no incluye el dominio de Railway');
        console.error('2. CORS no está configurado correctamente');
        console.error('3. El endpoint no existe o hay un error en el backend');
      } else if (data?.message) {
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


