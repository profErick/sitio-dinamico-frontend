import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { servicesAPI } from '../api/services';
import ServiceForm from '../components/ServiceForm';

const ServiceCreatePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      await servicesAPI.create(formData);
      alert('Servicio creado correctamente');
      navigate('/servicios');
    } catch (err) {
      setError(err.message || 'Error al crear el servicio');
      console.error('Error creating service:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="mb-4">
        <h1>
          <i className="bi bi-plus-circle me-2"></i>
          Crear Nuevo Servicio
        </h1>
        <p className="text-muted">Completa el formulario para crear un nuevo servicio</p>
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
          <ServiceForm onSubmit={handleSubmit} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default ServiceCreatePage;


