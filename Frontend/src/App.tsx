import { Routes, Route, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/globales/Navbar";
import { Header } from "./components/globales/Header";
import { Toaster } from "react-hot-toast";
import GlobalStyles from "./components/globales/GlobalStyles";
import PricingPage from "./pages/globales/pricing";
import BlogPage from "./pages/globales/blog";
import Calendar from "./pages/globales/Calendar";
import AboutPage from "./pages/globales/about";
import DashboardPage from "./pages/globales/Dashboard";
import Mapa from "./pages/globales/Mapa";

// Cultivo
import TipoEspeciePage from "./pages/cultivo/TipoEspeciePage";
import TipoActividadPage from "./pages/cultivo/TipoActividadPage";
import LotesPage from "./pages/cultivo/LotesPage";
import BancalPage from "./pages/cultivo/BancalPage";
import EspeciePage from "./pages/cultivo/EspeciePage";
import CultivoPage from "./pages/cultivo/CultivoPage";
import ActividadPage from "./pages/cultivo/ActividadPage";
import ListaTipoEspeciePage from "./pages/cultivo/ListaTipoEspeciePage";
import ListaTipoActividadPage from "./pages/cultivo/listaTipoActividadPage";
import ListarLotesPage from "./pages/cultivo/ListaLotesPage";
import ListaBancalPage from "./pages/cultivo/ListaBancalPage";
import ListaEspeciePage from "./pages/cultivo/ListaEspeciePage";
import ListarCultivoPage from "./pages/cultivo/ListaCultivoPage";
import ListaActividadPage from "./pages/cultivo/ListaActividadPage";
import TipoPlagaPage from "./pages/cultivo/TipoPlagaPage";
import ListaTipoPlagaPage from "./pages/cultivo/ListaTipoPlagaPage";
import PlagaPage from "./pages/cultivo/PlagaPage";
import ListaPlagasPage from "./pages/cultivo/ListaPlagaPage";
import CosechaPage from "./pages/cultivo/CosechaPage";
import ListaCosechasPage from "./pages/cultivo/ListaCosechaPage";
import TipoControlPage from "./pages/cultivo/TipoControlPage";
import ListaTipoControlPage from "./pages/cultivo/ListaTipoControlPage";
import CosechaGraficasPage from "./pages/graficas/CosechasGraficasPage";
import RegistroReportePlaga from "./pages/cultivo/ReportePlaga";
import ListaReportePlaga from "./pages/cultivo/ListaReportePlaga";
import DetalleReportePlaga from "./pages/cultivo/DetalleReportePlaga";
import AfeccionesPage from "./pages/cultivo/AfeccionesPage";
import ListaAfecciones from "./pages/cultivo/ListaAfeccionesPage";
import ControlPage from "./pages/cultivo/ControlPage";
import ListaControlPage from "./pages/cultivo/ListaControlPage";
import { TrazabilidadCosecha } from "./pages/cultivo/TrazabilidadCosecha";
import TipoResiduoPage from "./pages/cultivo/TipoResiduoPage";
import ResiduoPage from "./pages/cultivo/ResiduosPage";
import ListaResiduoPage from "./pages/cultivo/ListaResiduosPage";
import ActividadCostosGraficasPage from "./pages/graficas/ActividadCostosGraficasPage";

// Inventario
import HerramientasPage from "./pages/inventario/HerramientasPage";
import ListaHerramientaPage from "./pages/inventario/ListaHerramientaPage";
import InsumoPage from "./pages/inventario/InsumoPage";
import ListaInsumoPage from "./pages/inventario/ListaInsumoPage";
import Precio_ProductoPage from "./pages/inventario/Precio_ProductoPage";
import ListaPrecio_ProductoPage from "./pages/inventario/ListaPrecio_ProductoPage";
import BodegaInsumoPage from "./pages/inventario/BodegaInsumoPage";
import ListaBodegaInsumoPage from "./pages/inventario/ListaBodegaInsumoPage";
import BodegaHerramientaPage from "./pages/inventario/BodegaHerramientaPage";
import ListaBodegaHerramientaPage from "./pages/inventario/ListaBodegaHerramientaPage";
import BodegaPage from "./pages/inventario/BodegaPage";
import ListaBodegaPage from "./pages/inventario/ListaBodegaPage";

// IoT
import SensoresPage from "./pages/iot/SensoresPage";
import SensoresPage2 from "./pages/iot/SensoresPage2";
import DatosMeteorologicosPage from "./pages/iot/DatosMeteorologicosPage";
import RegistrarSensorPage from "./pages/iot/sensores/RegistrarSensorPage";
import ListarSensores from "./pages/iot/sensores/ListarSensoresPage";
import EvapotranspiracionPage from "./pages/iot/EvapotranspiracionPage";

// Usuarios
import RegisterPage from "./pages/usuarios/RegisterPage";
import UsuariosPage from "./pages/usuarios/UsuariosPage";
import PrivateRoute from "./components/usuarios/RutaPrivada";
import LoginPage from "./pages/usuarios/LoginPage";
import PerfilPage from "./pages/usuarios/PerfilPage";
import ForgotPasswordPage from "./pages/usuarios/ForgotPasswordPage";
import ResetPasswordPage from "./pages/usuarios/ResetPasswordPage";
import UsuariosSecondPage from "./pages/usuarios/RegisterSecondPage";

// Finanzas
import SalarioPage from "./pages/finanzas/SalarioPage";
import VentaPage from "./pages/finanzas/VentaPage";
import ListaVentaPage from "./pages/finanzas/ListaVentaPage";
import ListaSalarioPage from "./pages/finanzas/ListaSalarioPage";
import ListaPagoPage from "./pages/finanzas/ListaPagoPage";
import PagoPage from "./pages/finanzas/PagoPage";
import EgresoPruebaGraficasPage from "./pages/graficas/EgresosGraficas";
import DetalleReportePago from "./pages/finanzas/ReporteEgresos";
import CostoBeneficioPage from "./pages/finanzas/CostoBeneficioPage";

// Reportes
import Reportes from "./pages/reportes/Reportes";
import GraficaIngreso from "./pages/graficas/GraficaIngreso";
import ListaTipoResiduoPage from "./pages/cultivo/ListaTipoResiduoPage";

const queryClient = new QueryClient();

const AuthenticatedLayout: React.FC = () => {
  const isSidebarOpen = true;
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Navbar />
        <div
          className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "md:ml-64" : "md:ml-20"} pt-16`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GlobalStyles />
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          {/* Rutas públicas (Usuarios) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

          {/* Rutas protegidas con Navbar y Header */}
          <Route element={<PrivateRoute><AuthenticatedLayout /></PrivateRoute>}>
            {/* Dashboard (Globales) */}
            <Route path="/" element={<DashboardPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/calendario" element={<Calendar />} />
            <Route path="/about" element={<AboutPage />} />

            {/* Usuarios */}
            <Route path="/perfil" element={<PerfilPage />} />
            <Route path="/usuarios/secondregis" element={<UsuariosSecondPage />} />
            <Route path="/usuarios" element={<UsuariosPage />} />

            {/* IoT */}
            <Route path="/iot/sensores" element={<SensoresPage />} />
            <Route path="/iot/sensores-http" element={<SensoresPage2 />} />
            <Route path="/iot/datosmeteorologicos" element={<DatosMeteorologicosPage />} />
            <Route path="/iot/registrar-sensor" element={<RegistrarSensorPage />} />
            <Route path="/iot/listar-sensores" element={<ListarSensores />} />
            <Route path="/iot/evapotranspiracion" element={<EvapotranspiracionPage />} />

            {/* Cultivo */}
            <Route path="/cultivo/tipoespecie" element={<TipoEspeciePage />} />
            <Route path="/cultivo/listartipoespecie" element={<ListaTipoEspeciePage />} />
            <Route path="/cultivo/tipo_actividad" element={<TipoActividadPage />} />
            <Route path="/cultivo/listartipoactividad" element={<ListaTipoActividadPage />} />
            <Route path="/cultivo/lotes" element={<LotesPage />} />
            <Route path="/cultivo/listarlotes" element={<ListarLotesPage />} />
            <Route path="/cultivo/bancal" element={<BancalPage />} />
            <Route path="/cultivo/listarbancal" element={<ListaBancalPage />} />
            <Route path="/cultivo/especies" element={<EspeciePage />} />
            <Route path="/cultivo/listarespecies" element={<ListaEspeciePage />} />
            <Route path="/cultivo/cultivo" element={<CultivoPage />} />
            <Route path="/cultivo/listarcultivos" element={<ListarCultivoPage />} />
            <Route path="/cultivo/actividad" element={<ActividadPage />} />
            <Route path="/cultivo/listaractividad" element={<ListaActividadPage />} />
            <Route path="/cultivo/tipoplaga" element={<TipoPlagaPage />} />
            <Route path="/cultivo/listartipoplaga" element={<ListaTipoPlagaPage />} />
            <Route path="/cultivo/plaga" element={<PlagaPage />} />
            <Route path="/cultivo/listarplaga" element={<ListaPlagasPage />} />
            <Route path="/cultivo/reportarplaga" element={<RegistroReportePlaga />} />
            <Route path="/cultivo/listareporteplaga" element={<ListaReportePlaga />} />
            <Route path="/cultivo/detallereporteplaga/:id" element={<DetalleReportePlaga />} />
            <Route path="/cultivo/afecciones" element={<AfeccionesPage />} />
            <Route path="/cultivo/listafecciones" element={<ListaAfecciones />} />
            <Route path="/cultivo/control" element={<ControlPage />} />
            <Route path="/cultivo/listacontrol" element={<ListaControlPage />} />
            <Route path="/cultivo/trazabilidad" element={<TrazabilidadCosecha />} />
            <Route path="/cultivo/tiporesiduo" element={<TipoResiduoPage />} />
            <Route path="/cultivo/residuo" element={<ResiduoPage />} />
            <Route path="/cultivo/listatiporesiduo" element={<ListaTipoResiduoPage />} />
            <Route path="/cultivo/listaresiduo" element={<ListaResiduoPage />} />
            <Route path="/graficas/actividadcosto" element={<ActividadCostosGraficasPage />} />
            <Route path="/mapa" element={<Mapa />} />
            <Route path="/cultivo/cosecha" element={<CosechaPage />} />
            <Route path="/cultivo/listarcosechas" element={<ListaCosechasPage />} />
            <Route path="/cultivo/tipo_control" element={<TipoControlPage />} />
            <Route path="/cultivo/listartipocontrol" element={<ListaTipoControlPage />} />
            <Route path="/graficas/cosechas" element={<CosechaGraficasPage />} />

            {/* Inventario */}
            <Route path="/inventario/herramientas" element={<HerramientasPage />} />
            <Route path="/inventario/listarherramientas" element={<ListaHerramientaPage />} />
            <Route path="/inventario/insumos" element={<InsumoPage />} />
            <Route path="/inventario/listarinsumos" element={<ListaInsumoPage />} />
            <Route path="/inventario/preciosproductos" element={<Precio_ProductoPage />} />
            <Route path="/inventario/listarpreciosproductos" element={<ListaPrecio_ProductoPage />} />
            <Route path="/inventario/bodegaherramienta" element={<BodegaHerramientaPage />} />
            <Route path="/inventario/listarbodegaherramienta" element={<ListaBodegaHerramientaPage />} />
            <Route path="/inventario/bodegainsumo" element={<BodegaInsumoPage />} />
            <Route path="/inventario/listarbodegainsumos" element={<ListaBodegaInsumoPage />} />
            <Route path="/inventario/bodega" element={<BodegaPage />} />
            <Route path="/inventario/listarbodega" element={<ListaBodegaPage />} />

            {/* Finanzas */}
            <Route path="/finanzas/salario" element={<SalarioPage />} />
            <Route path="/finanzas/listarsalarios" element={<ListaSalarioPage />} />
            <Route path="/finanzas/ventas" element={<VentaPage />} />
            <Route path="/finanzas/listarventas" element={<ListaVentaPage />} />
            <Route path="/finanzas/listarpagos" element={<ListaPagoPage />} />
            <Route path="/finanzas/pago" element={<PagoPage />} />
            <Route path="/graficas/egresos" element={<EgresoPruebaGraficasPage />} />
            <Route path="/finanzas/reporteEgresos/:id" element={<DetalleReportePago />} />
            <Route path="/finanzas/costo_beneficio" element={<CostoBeneficioPage />} />

            {/* Reportes */}
            <Route path="/reportes" element={<Reportes />} />
            <Route path="/graficas/ingresos" element={<GraficaIngreso />} />

            {/* Ruta por defecto */}
            <Route path="*" element={<DashboardPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;