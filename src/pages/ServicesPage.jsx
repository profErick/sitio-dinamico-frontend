import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { servicesAPI } from '../api/services';
import ServiceList from '../components/ServiceList';
import ServiceFilters from '../components/ServiceFilters';

const ServicesPage = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    categoria: '',
    activo: '',
    min_precio: '',
    max_precio: '',
    ordenar_por: '',
  });
  const [pagination, setPagination] = useState({
    current: 1,
    total: 0,
    pageSize: 20,
  });

  const fetchServices = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page,
        ...Object.fromEntries(
          Object.entries(filters).filter(([_, v]) => v !== '')
        ),
      };

      const response = await servicesAPI.getAll(params);
      setServices(response.data.results || response.data);
      
      if (response.data.count !== undefined) {
        setPagination({
          current: page,
          total: response.data.count,
          pageSize: 20,
        });
      }
    } catch (err) {
      setError(err.message || 'Error al cargar los servicios');
      console.error('Error fetching services:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices(1);
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handleResetFilters = (resetFilters) => {
    setFilters(resetFilters);
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handleDelete = async (service) => {
    if (
      !window.confirm(
        `¿Estás seguro de que deseas eliminar el servicio "${service.nombre}"?`
      )
    ) {
      return;
    }

    try {
      await servicesAPI.delete(service.id);
      // Mostrar mensaje de éxito
      alert('Servicio eliminado correctamente');
      fetchServices(pagination.current);
    } catch (err) {
      alert(err.message || 'Error al eliminar el servicio');
      console.error('Error deleting service:', err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/servicios/${id}/editar`);
  };

  const handlePageChange = (newPage) => {
    fetchServices(newPage);
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>
          <i className="bi bi-list-ul me-2"></i>
          Servicios
        </h1>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/servicios/crear')}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Crear Servicio
        </button>
      </div>

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
          <button
            type="button"
            className="btn-close"
            onClick={() => setError(null)}
          ></button>
        </div>
      )}

      <ServiceFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      <ServiceList
        services={services}
        loading={loading}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      {/* Paginación */}
      {!loading && pagination.total > pagination.pageSize && (
        <nav aria-label="Paginación de servicios" className="mt-4">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${pagination.current === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(pagination.current - 1)}
                disabled={pagination.current === 1}
              >
                Anterior
              </button>
            </li>
            <li className="page-item active">
              <span className="page-link">
                Página {pagination.current} de {Math.ceil(pagination.total / pagination.pageSize)}
              </span>
            </li>
            <li
              className={`page-item ${
                pagination.current >= Math.ceil(pagination.total / pagination.pageSize)
                  ? 'disabled'
                  : ''
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(pagination.current + 1)}
                disabled={
                  pagination.current >= Math.ceil(pagination.total / pagination.pageSize)
                }
              >
                Siguiente
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default ServicesPage;


