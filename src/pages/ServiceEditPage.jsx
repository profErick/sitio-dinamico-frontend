import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { servicesAPI } from '../api/services';
import ServiceForm from '../components/ServiceForm';

const ServiceEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchService();
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

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    setError(null);
    try {
      await servicesAPI.update(id, formData);
      alert('Servicio actualizado correctamente');
      navigate(`/servicios/${id}`);
    } catch (err) {
      setError(err.message || 'Error al actualizar el servicio');
      console.error('Error updating service:', err);
    } finally {
      setSubmitting(false);
    }
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

  if (error && !service) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/servicios')}>
          Volver a Servicios
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="mb-4">
        <h1>
          <i className="bi bi-pencil me-2"></i>
          Editar Servicio
        </h1>
        <p className="text-muted">Modifica la información del servicio</p>
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

      <div className="card">
        <div className="card-body">
          <ServiceForm service={service} onSubmit={handleSubmit} loading={submitting} />
        </div>
      </div>
    </div>
  );
};

export default ServiceEditPage;


