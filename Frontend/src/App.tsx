import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
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
import ListaTipoEspeciePage from './pages/cultivo/ListaTipoEspeciePage';
import ListaTipoActividadPage from './pages/cultivo/ListaTipoActividadPage';
import ListarLotesPage from './pages/cultivo/ListaLotesPage';
import ListaBancalPage from './pages/cultivo/ListaBancalPage';
import ListaEspeciePage from './pages/cultivo/ListaEspeciePage';
import ListarCultivoPage from './pages/cultivo/ListaCultivoPage';
import ListaProgramacion from './pages/cultivo/ListaProgramacion';
import UsuariosPage from './pages/usuarios/UsuariosPage';
import BodegaPage from './pages/inventario/BodegaPage';
import ListaBodegaPage from './pages/inventario/ListaBodegaPage';
import BodegaHerramientaPage from './pages/inventario/BodegaHerramientaPage';
import ListaBodegaHerramientaPage from './pages/inventario/ListaBodegaHerramientaPage';
import HerramientasPage from './pages/inventario/HerramientasPage';
import ListaHerramientaPage from './pages/inventario/ListaHerramientaPage'; 
import BodegaInsumoPage from './pages/inventario/BodegaInsumoPage';
import ListaBodegaInsumoPage from './pages/inventario/ListaBodegaInsumoPage';
import InsumoPage from './pages/inventario/InsumoPage';
import ListaInsumoPage from './pages/inventario/ListaInsumoPage';
import PerfilPage from './pages/usuarios/PerfilPage';
import BodegaInsumoNotifications from './components/inventario/BodegaInsumoNotifications';
import BodegaHerramientaNotifications from './components/inventario/BodegaHerramientaNotifications';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route element={<LoginPage />} path="/login" />
          <Route element={<RegisterPage />} path="/register" />
          <Route path="/" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
          <Route path="/perfil" element={<PrivateRoute><PerfilPage /></PrivateRoute>} />
          <Route path="/inventario/bodega/" element={<PrivateRoute><BodegaPage /></PrivateRoute>} />
          <Route path="/inventario/listarbodega/" element={<PrivateRoute><ListaBodegaPage /></PrivateRoute>} />
          <Route
            path="/inventario/bodegaherramienta/"
            element={
              <PrivateRoute>
                <BodegaHerramientaPage />
                <BodegaHerramientaNotifications />
              </PrivateRoute>
            }
          />
          <Route 
            path="/inventario/listarbodegaherramienta/" 
            element={
              <PrivateRoute>
                <ListaBodegaHerramientaPage />
                <BodegaHerramientaNotifications />
              </PrivateRoute>
            } 
          />
          <Route path="/inventario/herramientas/" element={<PrivateRoute><HerramientasPage /></PrivateRoute>} />
          <Route path="/inventario/listarherramientas/" element={<PrivateRoute><ListaHerramientaPage /></PrivateRoute>} />
          <Route
            path="/inventario/bodegainsumo/"
            element={
              <PrivateRoute>
                <BodegaInsumoPage />
                <BodegaInsumoNotifications />
              </PrivateRoute>
            }
          />
          <Route 
            path="/inventario/listarbodegainsumos/" 
            element={
              <PrivateRoute>
                <ListaBodegaInsumoPage />
                <BodegaInsumoNotifications />
              </PrivateRoute>
            } 
          />
          <Route path="/inventario/insumos/" element={<PrivateRoute><InsumoPage /></PrivateRoute>} />
          <Route path="/inventario/listarinsumos/" element={<PrivateRoute><ListaInsumoPage /></PrivateRoute>} />
          <Route path="/docs" element={<PrivateRoute><DocsPage /></PrivateRoute>} />
          <Route path="/cultivo/tipoespecie/" element={<PrivateRoute><TipoEspeciePage /></PrivateRoute>} />
          <Route path="/cultivo/listartipoespecie/" element={<PrivateRoute><ListaTipoEspeciePage /></PrivateRoute>} />
          <Route path="/cultivo/tipo_actividad/" element={<PrivateRoute><TipoActividadPage /></PrivateRoute>} />
          <Route path="/cultivo/listartipoactividad/" element={<PrivateRoute><ListaTipoActividadPage /></PrivateRoute>} />
          <Route path="/cultivo/lotes/" element={<PrivateRoute><LotesPage /></PrivateRoute>} />
          <Route path="/cultivo/listarlotes/" element={<PrivateRoute><ListarLotesPage /></PrivateRoute>} />
          <Route path="/cultivo/bancal/" element={<PrivateRoute><BancalPage /></PrivateRoute>} />
          <Route path="/cultivo/listarbancal/" element={<PrivateRoute><ListaBancalPage /></PrivateRoute>} />
          <Route path="/cultivo/especies/" element={<PrivateRoute><EspeciePage /></PrivateRoute>} />
          <Route path="/cultivo/listarespecies/" element={<PrivateRoute><ListaEspeciePage /></PrivateRoute>} />
          <Route path="/cultivo/programacion/" element={<PrivateRoute><ProgramacionPage /></PrivateRoute>} />
          <Route path="/cultivo/listarprogramaciones/" element={<PrivateRoute><ListaProgramacion /></PrivateRoute>} />
          <Route path="/cultivo/cultivo/" element={<PrivateRoute><CultivoPage /></PrivateRoute>} />
          <Route path="/cultivo/listarcultivos/" element={<PrivateRoute><ListarCultivoPage /></PrivateRoute>} />
          <Route path="/cultivo/actividad/" element={<PrivateRoute><ActividadPage /></PrivateRoute>} />
          <Route path="/usuarios" element={<PrivateRoute><UsuariosPage /></PrivateRoute>} />
          <Route path="/pricing" element={<PrivateRoute><PricingPage /></PrivateRoute>} />
          <Route path="/blog" element={<PrivateRoute><BlogPage /></PrivateRoute>} />
          <Route path="/about" element={<PrivateRoute><AboutPage /></PrivateRoute>} />
          <Route path="*" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;