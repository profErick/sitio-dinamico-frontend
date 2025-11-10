import { useState, useEffect } from 'react';

const CATEGORIAS = [
  'Web',
  'Móvil',
  'Cloud',
  'Data',
  'Seguridad',
  'Consultoría',
];

const ServiceForm = ({ service, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: 'Web',
    descripcion: '',
    precio_mxn: '',
    activo: true,
    nivel_prioridad: 3,
    responsable_email: '',
    tiempo_estimado_dias: 7,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (service) {
      setFormData({
        nombre: service.nombre || '',
        categoria: service.categoria || 'Web',
        descripcion: service.descripcion || '',
        precio_mxn: service.precio_mxn || '',
        activo: service.activo !== undefined ? service.activo : true,
        nivel_prioridad: service.nivel_prioridad || 3,
        responsable_email: service.responsable_email || '',
        tiempo_estimado_dias: service.tiempo_estimado_dias || 7,
      });
    }
  }, [service]);

  const validate = () => {
    const newErrors = {};

    if (!formData.nombre || !formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.descripcion || !formData.descripcion.trim()) {
      newErrors.descripcion = 'La descripción es requerida';
    }

    const precio = parseFloat(formData.precio_mxn);
    if (isNaN(precio) || precio < 0) {
      newErrors.precio_mxn = 'El precio debe ser un número mayor o igual a 0';
    }

    const prioridad = parseInt(formData.nivel_prioridad);
    if (isNaN(prioridad) || prioridad < 1 || prioridad > 5) {
      newErrors.nivel_prioridad = 'La prioridad debe estar entre 1 y 5';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.responsable_email || !emailRegex.test(formData.responsable_email)) {
      newErrors.responsable_email = 'Debe ser un email válido';
    }

    const tiempo = parseInt(formData.tiempo_estimado_dias);
    if (isNaN(tiempo) || tiempo < 0) {
      newErrors.tiempo_estimado_dias = 'El tiempo estimado debe ser un número mayor o igual a 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
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
      nombre: true,
      descripcion: true,
      precio_mxn: true,
      nivel_prioridad: true,
      responsable_email: true,
      tiempo_estimado_dias: true,
    });

    if (validate()) {
      const submitData = {
        ...formData,
        precio_mxn: parseFloat(formData.precio_mxn),
        nivel_prioridad: parseInt(formData.nivel_prioridad),
        tiempo_estimado_dias: parseInt(formData.tiempo_estimado_dias),
      };
      onSubmit(submitData);
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
        {/* Nombre */}
        <div className="col-md-6">
          <label htmlFor="nombre" className="form-label">
            Nombre <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control ${getFieldClass('nombre')}`}
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            onBlur={() => handleBlur('nombre')}
            required
          />
          {touched.nombre && errors.nombre && (
            <div className="invalid-feedback d-block">{errors.nombre}</div>
          )}
        </div>

        {/* Categoría */}
        <div className="col-md-6">
          <label htmlFor="categoria" className="form-label">
            Categoría <span className="text-danger">*</span>
          </label>
          <select
            className="form-select"
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            required
          >
            {CATEGORIAS.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Descripción */}
        <div className="col-12">
          <label htmlFor="descripcion" className="form-label">
            Descripción <span className="text-danger">*</span>
          </label>
          <textarea
            className={`form-control ${getFieldClass('descripcion')}`}
            id="descripcion"
            name="descripcion"
            rows="4"
            value={formData.descripcion}
            onChange={handleChange}
            onBlur={() => handleBlur('descripcion')}
            required
          />
          {touched.descripcion && errors.descripcion && (
            <div className="invalid-feedback d-block">{errors.descripcion}</div>
          )}
        </div>

        {/* Precio */}
        <div className="col-md-6">
          <label htmlFor="precio_mxn" className="form-label">
            Precio (MXN) <span className="text-danger">*</span>
          </label>
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input
              type="number"
              className={`form-control ${getFieldClass('precio_mxn')}`}
              id="precio_mxn"
              name="precio_mxn"
              step="0.01"
              min="0"
              value={formData.precio_mxn}
              onChange={handleChange}
              onBlur={() => handleBlur('precio_mxn')}
              required
            />
          </div>
          {touched.precio_mxn && errors.precio_mxn && (
            <div className="invalid-feedback d-block">{errors.precio_mxn}</div>
          )}
        </div>

        {/* Nivel de Prioridad */}
        <div className="col-md-6">
          <label htmlFor="nivel_prioridad" className="form-label">
            Nivel de Prioridad (1-5) <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            className={`form-control ${getFieldClass('nivel_prioridad')}`}
            id="nivel_prioridad"
            name="nivel_prioridad"
            min="1"
            max="5"
            value={formData.nivel_prioridad}
            onChange={handleChange}
            onBlur={() => handleBlur('nivel_prioridad')}
            required
          />
          {touched.nivel_prioridad && errors.nivel_prioridad && (
            <div className="invalid-feedback d-block">{errors.nivel_prioridad}</div>
          )}
        </div>

        {/* Email Responsable */}
        <div className="col-md-6">
          <label htmlFor="responsable_email" className="form-label">
            Email del Responsable <span className="text-danger">*</span>
          </label>
          <input
            type="email"
            className={`form-control ${getFieldClass('responsable_email')}`}
            id="responsable_email"
            name="responsable_email"
            value={formData.responsable_email}
            onChange={handleChange}
            onBlur={() => handleBlur('responsable_email')}
            required
          />
          {touched.responsable_email && errors.responsable_email && (
            <div className="invalid-feedback d-block">{errors.responsable_email}</div>
          )}
        </div>

        {/* Tiempo Estimado */}
        <div className="col-md-6">
          <label htmlFor="tiempo_estimado_dias" className="form-label">
            Tiempo Estimado (días) <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            className={`form-control ${getFieldClass('tiempo_estimado_dias')}`}
            id="tiempo_estimado_dias"
            name="tiempo_estimado_dias"
            min="0"
            value={formData.tiempo_estimado_dias}
            onChange={handleChange}
            onBlur={() => handleBlur('tiempo_estimado_dias')}
            required
          />
          {touched.tiempo_estimado_dias && errors.tiempo_estimado_dias && (
            <div className="invalid-feedback d-block">{errors.tiempo_estimado_dias}</div>
          )}
        </div>

        {/* Activo */}
        <div className="col-12">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="activo"
              name="activo"
              checked={formData.activo}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="activo">
              Servicio activo
            </label>
          </div>
        </div>

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
                  Guardando...
                </>
              ) : (
                <>
                  <i className="bi bi-save me-2"></i>
                  {service ? 'Actualizar' : 'Crear'} Servicio
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

export default ServiceForm;


