import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import ServiceCreatePage from './pages/ServiceCreatePage';
import ServiceEditPage from './pages/ServiceEditPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <ServicesPage />,
      },
      {
        path: 'servicios',
        element: <ServicesPage />,
      },
      {
        path: 'servicios/crear',
        element: <ServiceCreatePage />,
      },
      {
        path: 'servicios/:id',
        element: <ServiceDetailPage />,
      },
      {
        path: 'servicios/:id/editar',
        element: <ServiceEditPage />,
      },
    ],
  },
]);

export default router;


