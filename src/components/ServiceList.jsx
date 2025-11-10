import { Link } from 'react-router-dom';

const ServiceList = ({ services, loading, onDelete, onEdit }) => {
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando servicios...</p>
      </div>
    );
  }

  // Validar que services sea un array
  if (!Array.isArray(services)) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        <i className="bi bi-exclamation-triangle me-2"></i>
        Error: Los datos recibidos no son válidos. Verifica la configuración de la API.
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="alert alert-info text-center" role="alert">
        <i className="bi bi-info-circle me-2"></i>
        No se encontraron servicios.
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(price);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX');
  };

  const getCategoryBadge = (categoria) => {
    const colors = {
      Web: 'primary',
      Móvil: 'success',
      Cloud: 'info',
      Data: 'warning',
      Seguridad: 'danger',
      Consultoría: 'secondary',
    };
    return colors[categoria] || 'secondary';
  };

  return (
    <div className="row g-4">
      {services.map((service) => (
        <div key={service.id} className="col-md-6 col-lg-4">
          <div className="card h-100 shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
              <span className={`badge bg-${getCategoryBadge(service.categoria)}`}>
                {service.categoria}
              </span>
              <span className={`badge ${service.activo ? 'bg-success' : 'bg-secondary'}`}>
                {service.activo ? 'Activo' : 'Inactivo'}
              </span>
            </div>
            <div className="card-body">
              <h5 className="card-title">{service.nombre}</h5>
              <p className="card-text text-muted small">
                {service.descripcion.length > 100
                  ? `${service.descripcion.substring(0, 100)}...`
                  : service.descripcion}
              </p>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Precio:</span>
                  <strong className="text-primary">{formatPrice(service.precio_mxn)}</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Prioridad:</span>
                  <span className="badge bg-info">{service.nivel_prioridad}/5</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Publicado:</span>
                  <small>{formatDate(service.fecha_publicacion)}</small>
                </div>
              </div>
            </div>
            <div className="card-footer bg-transparent">
              <div className="btn-group w-100" role="group">
                <Link
                  to={`/servicios/${service.id}`}
                  className="btn btn-sm btn-outline-primary"
                  title="Ver detalle"
                >
                  <i className="bi bi-eye"></i>
                </Link>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-warning"
                  onClick={() => onEdit(service.id)}
                  title="Editar"
                >
                  <i className="bi bi-pencil"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onDelete(service)}
                  title="Eliminar"
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceList;


