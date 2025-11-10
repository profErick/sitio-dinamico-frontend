import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { servicesAPI } from '../api/services';
import RequestForm from '../components/RequestForm';

const ServiceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [error, setError] = useState(null);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [submittingRequest, setSubmittingRequest] = useState(false);

  useEffect(() => {
    fetchService();
    fetchRequests();
  }, [id]);

  const fetchService = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await servicesAPI.getById(id);
      setService(response.data);
    } catch (err) {
      setError(err.message || 'Error al cargar el servicio');
      console.error('Error fetching service:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRequests = async () => {
    setLoadingRequests(true);
    try {
      const response = await servicesAPI.getRequests(id);
      setRequests(response.data);
    } catch (err) {
      console.error('Error fetching requests:', err);
    } finally {
      setLoadingRequests(false);
    }
  };

  const handleCreateRequest = async (formData) => {
    setSubmittingRequest(true);
    try {
      await servicesAPI.createRequest(id, formData);
      alert('Solicitud creada correctamente');
      setShowRequestForm(false);
      fetchRequests();
    } catch (err) {
      alert(err.message || 'Error al crear la solicitud');
      console.error('Error creating request:', err);
    } finally {
      setSubmittingRequest(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(price);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('es-MX');
  };

  const getStatusBadge = (estatus) => {
    const badges = {
      nuevo: 'primary',
      en_proceso: 'warning',
      cerrado: 'success',
    };
    return badges[estatus] || 'secondary';
  };

  const getStatusLabel = (estatus) => {
    const labels = {
      nuevo: 'Nuevo',
      en_proceso: 'En Proceso',
      cerrado: 'Cerrado',
    };
    return labels[estatus] || estatus;
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3">Cargando servicio...</p>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error || 'Servicio no encontrado'}
        </div>
        <Link to="/servicios" className="btn btn-primary">
          Volver a Servicios
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="mb-4">
        <Link to="/servicios" className="btn btn-outline-secondary mb-3">
          <i className="bi bi-arrow-left me-2"></i>
          Volver a Servicios
        </Link>
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h1>{service.nombre}</h1>
            <div className="d-flex gap-2 mb-3">
              <span className={`badge bg-${service.activo ? 'success' : 'secondary'}`}>
                {service.activo ? 'Activo' : 'Inactivo'}
              </span>
              <span className="badge bg-info">{service.categoria}</span>
              <span className="badge bg-warning">Prioridad: {service.nivel_prioridad}/5</span>
            </div>
          </div>
          <div className="d-flex gap-2">
            <button
              className="btn btn-warning"
              onClick={() => navigate(`/servicios/${id}/editar`)}
            >
              <i className="bi bi-pencil me-2"></i>
              Editar
            </button>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Información del Servicio */}
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-info-circle me-2"></i>
                Información del Servicio
              </h5>
            </div>
            <div className="card-body">
              <dl className="row">
                <dt className="col-sm-4">Descripción:</dt>
                <dd className="col-sm-8">{service.descripcion}</dd>

                <dt className="col-sm-4">Precio:</dt>
                <dd className="col-sm-8">
                  <strong className="text-primary">{formatPrice(service.precio_mxn)}</strong>
                </dd>

                <dt className="col-sm-4">Tiempo Estimado:</dt>
                <dd className="col-sm-8">{service.tiempo_estimado_dias} días</dd>

                <dt className="col-sm-4">Responsable:</dt>
                <dd className="col-sm-8">
                  <a href={`mailto:${service.responsable_email}`}>
                    {service.responsable_email}
                  </a>
                </dd>

                <dt className="col-sm-4">Fecha de Publicación:</dt>
                <dd className="col-sm-8">{formatDate(service.fecha_publicacion)}</dd>

                <dt className="col-sm-4">Última Actualización:</dt>
                <dd className="col-sm-8">{formatDateTime(service.ultima_actualizacion)}</dd>
              </dl>
            </div>
          </div>
        </div>

        {/* Solicitudes */}
        <div className="col-lg-4">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <i className="bi bi-envelope me-2"></i>
                Solicitudes ({requests.length})
              </h5>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => setShowRequestForm(!showRequestForm)}
              >
                <i className="bi bi-plus-circle me-1"></i>
                Nueva
              </button>
            </div>
            <div className="card-body">
              {showRequestForm && (
                <div className="mb-4 p-3 bg-light rounded">
                  <h6 className="mb-3">Crear Nueva Solicitud</h6>
                  <RequestForm
                    serviceId={id}
                    onSubmit={handleCreateRequest}
                    loading={submittingRequest}
                  />
                </div>
              )}

              {loadingRequests ? (
                <div className="text-center py-3">
                  <div className="spinner-border spinner-border-sm text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                </div>
              ) : requests.length === 0 ? (
                <p className="text-muted text-center">No hay solicitudes</p>
              ) : (
                <div className="list-group list-group-flush">
                  {requests.map((request) => (
                    <div key={request.id} className="list-group-item px-0">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <strong>{request.cliente_nombre}</strong>
                        <span className={`badge bg-${getStatusBadge(request.estatus)}`}>
                          {getStatusLabel(request.estatus)}
                        </span>
                      </div>
                      <p className="small text-muted mb-1">{request.cliente_email}</p>
                      <p className="small mb-2">{request.mensaje}</p>
                      <small className="text-muted">
                        {formatDateTime(request.fecha_creacion)}
                      </small>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;


