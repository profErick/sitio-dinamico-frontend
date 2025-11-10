import { useState } from 'react';

const CATEGORIAS = [
  { value: '', label: 'Todas las categorías' },
  { value: 'Web', label: 'Web' },
  { value: 'Móvil', label: 'Móvil' },
  { value: 'Cloud', label: 'Cloud' },
  { value: 'Data', label: 'Data' },
  { value: 'Seguridad', label: 'Seguridad' },
  { value: 'Consultoría', label: 'Consultoría' },
];

const ServiceFilters = ({ filters, onFilterChange, onReset }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      search: '',
      categoria: '',
      activo: '',
      min_precio: '',
      max_precio: '',
      ordenar_por: '',
    };
    setLocalFilters(resetFilters);
    onReset(resetFilters);
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5 className="mb-0">
          <i className="bi bi-funnel me-2"></i>
          Filtros y Búsqueda
        </h5>
      </div>
      <div className="card-body">
        <div className="row g-3">
          {/* Búsqueda por texto */}
          <div className="col-md-6 col-lg-4">
            <label htmlFor="search" className="form-label">
              Buscar
            </label>
            <input
              type="text"
              className="form-control"
              id="search"
              placeholder="Nombre o descripción..."
              value={localFilters.search || ''}
              onChange={(e) => handleChange('search', e.target.value)}
            />
          </div>

          {/* Filtro por categoría */}
          <div className="col-md-6 col-lg-3">
            <label htmlFor="categoria" className="form-label">
              Categoría
            </label>
            <select
              className="form-select"
              id="categoria"
              value={localFilters.categoria || ''}
              onChange={(e) => handleChange('categoria', e.target.value)}
            >
              {CATEGORIAS.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro por estado activo */}
          <div className="col-md-6 col-lg-2">
            <label htmlFor="activo" className="form-label">
              Estado
            </label>
            <select
              className="form-select"
              id="activo"
              value={localFilters.activo || ''}
              onChange={(e) => handleChange('activo', e.target.value)}
            >
              <option value="">Todos</option>
              <option value="true">Activos</option>
              <option value="false">Inactivos</option>
            </select>
          </div>

          {/* Precio mínimo */}
          <div className="col-md-6 col-lg-3">
            <label htmlFor="min_precio" className="form-label">
              Precio Mínimo
            </label>
            <input
              type="number"
              className="form-control"
              id="min_precio"
              placeholder="0.00"
              min="0"
              step="0.01"
              value={localFilters.min_precio || ''}
              onChange={(e) => handleChange('min_precio', e.target.value)}
            />
          </div>

          {/* Precio máximo */}
          <div className="col-md-6 col-lg-3">
            <label htmlFor="max_precio" className="form-label">
              Precio Máximo
            </label>
            <input
              type="number"
              className="form-control"
              id="max_precio"
              placeholder="999999.99"
              min="0"
              step="0.01"
              value={localFilters.max_precio || ''}
              onChange={(e) => handleChange('max_precio', e.target.value)}
            />
          </div>

          {/* Ordenar por */}
          <div className="col-md-6 col-lg-3">
            <label htmlFor="ordenar_por" className="form-label">
              Ordenar por
            </label>
            <select
              className="form-select"
              id="ordenar_por"
              value={localFilters.ordenar_por || ''}
              onChange={(e) => handleChange('ordenar_por', e.target.value)}
            >
              <option value="">Por defecto</option>
              <option value="precio_asc">Precio: Menor a Mayor</option>
              <option value="precio_desc">Precio: Mayor a Menor</option>
              <option value="fecha_asc">Fecha: Más Antigua</option>
              <option value="fecha_desc">Fecha: Más Reciente</option>
            </select>
          </div>

          {/* Botón reset */}
          <div className="col-md-12 col-lg-3 d-flex align-items-end">
            <button
              type="button"
              className="btn btn-outline-secondary w-100"
              onClick={handleReset}
            >
              <i className="bi bi-arrow-counterclockwise me-2"></i>
              Limpiar Filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceFilters;


