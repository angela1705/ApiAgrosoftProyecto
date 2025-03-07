import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import DocsPage from './pages/docs';
import PricingPage from './pages/pricing';
import BlogPage from './pages/blog';
import AboutPage from './pages/about';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/Dashboard';
import PrivateRoute from './components/RutaPrivada';
import TipoEspeciePage from './pages/TipoEspeciePage';
import TipoActividadPage from './pages/TipoActividadPage';
import LotesPage from './pages/LotesPage';
import BancalPage from './pages/BancalPage';
import EspeciePage from './pages/EspeciePage';
import ProgramacionPage from './pages/ProgramacionPage';
import CultivoPage from './pages/CultivoPage';
import ActividadPage from './pages/ActividadPage';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes>
          <Route element={<LoginPage />} path="/login" />
          <Route
            path="/"
            element={<PrivateRoute><DashboardPage /></PrivateRoute>}
          />

          {/* Ruta pública para registar */}
          <Route
           element={<RegisterPage />} path="/register" />

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