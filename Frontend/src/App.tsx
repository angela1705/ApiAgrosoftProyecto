import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import DocsPage from './pages/globales/docs';
import PricingPage from './pages/globales/pricing';
import BlogPage from './pages/globales/blog';
import AboutPage from './pages/globales/about';
import LoginPage from './pages/usuarios/LoginPage';
import RegisterPage from './pages/usuarios/RegisterPage';
import DashboardPage from './pages/globales/Dashboard';
import PrivateRoute from './components/usuarios/RutaPrivada';
import TipoEspeciePage from './pages/cultivo/TipoEspeciePage';
import TipoActividadPage from './pages/cultivo/TipoActividadPage';
import LotesPage from './pages/cultivo/LotesPage';
import BancalPage from './pages/cultivo/BancalPage';
import EspeciePage from './pages/cultivo/EspeciePage';
import ProgramacionPage from './pages/cultivo/ProgramacionPage';
import CultivoPage from './pages/cultivo/CultivoPage';
import ActividadPage from './pages/cultivo/ActividadPage';
import UsuariosPage from './pages/usuarios/UsuariosPage';
import BodegaPage from './pages/BodegaPage';
import BodegaHerramientaPage from './pages/BodegaHerramientaPage';
import HerramientasPage from './pages/HerramientasPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes>
          <Route element={<LoginPage />} path="/login" />
          <Route element={<RegisterPage />} path="/register" />
          <Route
            path="/"
            element={<PrivateRoute><DashboardPage /></PrivateRoute>}
          />
          {/* Rutas de la versión remota */}
          <Route
            path="/inventario/bodega"
            element={<PrivateRoute><BodegaPage /></PrivateRoute>}
          />
          <Route
            path="/inventario/bodegaherramienta"
            element={<PrivateRoute><BodegaHerramientaPage /></PrivateRoute>}
          />
          <Route
            path="/inventario/herramientas"
            element={<PrivateRoute><HerramientasPage /></PrivateRoute>}
          />
          {/* Rutas de ambas versiones */}
          <Route
            path="/docs"
            element={<PrivateRoute><DocsPage /></PrivateRoute>}
          />
          <Route
            path="/cultivo/tipoespecie/"
            element={<PrivateRoute><TipoEspeciePage /></PrivateRoute>}
          />
          <Route
            path="/cultivo/tipo_actividad/"
            element={<PrivateRoute><TipoActividadPage /></PrivateRoute>}
          />
          <Route
            path="/cultivo/lotes/"
            element={<PrivateRoute><LotesPage /></PrivateRoute>}
          />
          <Route
            path="/cultivo/bancal/"
            element={<PrivateRoute><BancalPage /></PrivateRoute>}
          />
          <Route
            path="/cultivo/especies/"
            element={<PrivateRoute><EspeciePage /></PrivateRoute>}
          />
          <Route
            path="/cultivo/programacion/"
            element={<PrivateRoute><ProgramacionPage /></PrivateRoute>}
          />
          <Route
            path="/cultivo/cultivo/"
            element={<PrivateRoute><CultivoPage /></PrivateRoute>}
          />
          <Route
            path="/cultivo/actividad/"
            element={<PrivateRoute><ActividadPage /></PrivateRoute>}
          />
          {/* Ruta de la versión local */}
          <Route
            path="/usuarios"
            element={<PrivateRoute><UsuariosPage /></PrivateRoute>}
          />
          <Route
            path="/pricing"
            element={<PrivateRoute><PricingPage /></PrivateRoute>}
          />
          <Route
            path="/blog"
            element={<PrivateRoute><BlogPage /></PrivateRoute>}
          />
          <Route
            path="/about"
            element={<PrivateRoute><AboutPage /></PrivateRoute>}
          />
          <Route path="*" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;