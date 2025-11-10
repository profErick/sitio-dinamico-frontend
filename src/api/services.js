import apiClient from './axios';

export const servicesAPI = {
  // Listar servicios con filtros
  getAll: (params = {}) => {
    return apiClient.get('/servicios/', { params });
  },

  // Obtener un servicio por ID
  getById: (id) => {
    return apiClient.get(`/servicios/${id}/`);
  },

  // Crear servicio
  create: (data) => {
    return apiClient.post('/servicios/', data);
  },

  // Actualizar servicio
  update: (id, data) => {
    return apiClient.put(`/servicios/${id}/`, data);
  },

  // Actualizar servicio (parcial)
  patch: (id, data) => {
    return apiClient.patch(`/servicios/${id}/`, data);
  },

  // Eliminar servicio (soft delete)
  delete: (id) => {
    return apiClient.delete(`/servicios/${id}/`);
  },

  // Obtener solicitudes de un servicio
  getRequests: (id) => {
    return apiClient.get(`/servicios/${id}/solicitudes/`);
  },

  // Crear solicitud para un servicio
  createRequest: (id, data) => {
    return apiClient.post(`/servicios/${id}/solicitudes/`, data);
  },
};

export const requestsAPI = {
  // Listar todas las solicitudes
  getAll: (params = {}) => {
    return apiClient.get('/solicitudes/', { params });
  },

  // Obtener una solicitud por ID
  getById: (id) => {
    return apiClient.get(`/solicitudes/${id}/`);
  },

  // Crear solicitud
  create: (data) => {
    return apiClient.post('/solicitudes/', data);
  },

  // Actualizar solicitud
  update: (id, data) => {
    return apiClient.put(`/solicitudes/${id}/`, data);
  },

  // Eliminar solicitud
  delete: (id) => {
    return apiClient.delete(`/solicitudes/${id}/`);
  },
};


