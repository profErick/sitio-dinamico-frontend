import { useState, useEffect } from 'react';

const ESTATUS_OPTIONS = [
  { value: 'nuevo', label: 'Nuevo' },
  { value: 'en_proceso', label: 'En Proceso' },
  { value: 'cerrado', label: 'Cerrado' },
];

const RequestForm = ({ serviceId, request, onSubmit, loading, showEstatus = false }) => {
  const [formData, setFormData] = useState({
    cliente_nombre: '',
    cliente_email: '',
    mensaje: '',
    estatus: 'nuevo',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (request) {
      setFormData({
        cliente_nombre: request.cliente_nombre || '',
        cliente_email: request.cliente_email || '',
        mensaje: request.mensaje || '',
        estatus: request.estatus || 'nuevo',
      });
    }
  }, [request]);

  const validate = () => {
    const newErrors = {};

    if (!formData.cliente_nombre || !formData.cliente_nombre.trim()) {
      newErrors.cliente_nombre = 'El nombre es requerido';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.cliente_email || !emailRegex.test(formData.cliente_email)) {
      newErrors.cliente_email = 'Debe ser un email válido';
    }

    if (!formData.mensaje || !formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validate();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({
      cliente_nombre: true,
      cliente_email: true,
      mensaje: true,
    });

    if (validate()) {
      onSubmit(formData);
    }
  };

  const getFieldClass = (fieldName) => {
    if (touched[fieldName] && errors[fieldName]) {
      return 'is-invalid';
    }
    if (touched[fieldName] && !errors[fieldName]) {
      return 'is-valid';
    }
    return '';
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-3">
        {/* Nombre del Cliente */}
        <div className="col-md-6">
          <label htmlFor="cliente_nombre" className="form-label">
            Nombre del Cliente <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control ${getFieldClass('cliente_nombre')}`}
            id="cliente_nombre"
            name="cliente_nombre"
            value={formData.cliente_nombre}
            onChange={handleChange}
            onBlur={() => handleBlur('cliente_nombre')}
            required
          />
          {touched.cliente_nombre && errors.cliente_nombre && (
            <div className="invalid-feedback d-block">{errors.cliente_nombre}</div>
          )}
        </div>

        {/* Email del Cliente */}
        <div className="col-md-6">
          <label htmlFor="cliente_email" className="form-label">
            Email del Cliente <span className="text-danger">*</span>
          </label>
          <input
            type="email"
            className={`form-control ${getFieldClass('cliente_email')}`}
            id="cliente_email"
            name="cliente_email"
            value={formData.cliente_email}
            onChange={handleChange}
            onBlur={() => handleBlur('cliente_email')}
            required
          />
          {touched.cliente_email && errors.cliente_email && (
            <div className="invalid-feedback d-block">{errors.cliente_email}</div>
          )}
        </div>

        {/* Mensaje */}
        <div className="col-12">
          <label htmlFor="mensaje" className="form-label">
            Mensaje <span className="text-danger">*</span>
          </label>
          <textarea
            className={`form-control ${getFieldClass('mensaje')}`}
            id="mensaje"
            name="mensaje"
            rows="4"
            value={formData.mensaje}
            onChange={handleChange}
            onBlur={() => handleBlur('mensaje')}
            required
          />
          {touched.mensaje && errors.mensaje && (
            <div className="invalid-feedback d-block">{errors.mensaje}</div>
          )}
        </div>

        {/* Estatus (solo si showEstatus es true) */}
        {showEstatus && (
          <div className="col-12">
            <label htmlFor="estatus" className="form-label">
              Estatus
            </label>
            <select
              className="form-select"
              id="estatus"
              name="estatus"
              value={formData.estatus}
              onChange={handleChange}
            >
              {ESTATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Botones */}
        <div className="col-12">
          <div className="d-flex gap-2">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Enviando...
                </>
              ) : (
                <>
                  <i className="bi bi-send me-2"></i>
                  {request ? 'Actualizar' : 'Crear'} Solicitud
                </>
              )}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => window.history.back()}
              disabled={loading}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RequestForm;


