import { useState } from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import { NavbarProvider } from "./context/NavbarContext";
import Navbar from "./components/globales/Navbar";
import { Toaster } from "react-hot-toast";
import GlobalStyles from "./components/globales/GlobalStyles";
import PricingPage from "./pages/globales/pricing";
import BlogPage from "./pages/globales/blog";
import Calendar from "./pages/globales/Calendar";
import AboutPage from "./pages/globales/about";
import LoginPage from "./pages/usuarios/LoginPage";
import RegisterPage from "./pages/usuarios/RegisterPage";
import DashboardPage from "./pages/globales/Dashboard";
import PrivateRoute from "./components/usuarios/RutaPrivada";
import TipoEspeciePage from "./pages/cultivo/TipoEspeciePage";
import TipoActividadPage from "./pages/cultivo/TipoActividadPage";
import LotesPage from "./pages/cultivo/LotesPage";
import BancalPage from "./pages/cultivo/BancalPage";
import EspeciePage from "./pages/cultivo/EspeciePage";
import ProgramacionPage from "./pages/cultivo/ProgramacionPage";
import CultivoPage from "./pages/cultivo/CultivoPage";
import ActividadPage from "./pages/cultivo/ActividadPage";
import ListaTipoEspeciePage from "./pages/cultivo/ListaTipoEspeciePage";
import ListaTipoActividadPage from "./pages/cultivo/listaTipoActividadPage";
import ListarLotesPage from "./pages/cultivo/ListaLotesPage";
import ListaBancalPage from "./pages/cultivo/ListaBancalPage";
import ListaEspeciePage from "./pages/cultivo/ListaEspeciePage";
import ListarCultivoPage from "./pages/cultivo/ListaCultivoPage";
import ListaProgramacion from "./pages/cultivo/ListaProgramacion";
import ListaActividadPage from "./pages/cultivo/ListaActividadPage";
import TipoPlagaPage from "./pages/cultivo/TipoPlagaPage";
import ListaTipoPlagaPage from "./pages/cultivo/ListaTipoPlagaPage";
import PlagaPage from "./pages/cultivo/PlagaPage";
import ListaPlagasPage from "./pages/cultivo/ListaPlagaPage";
import CosechaPage from "./pages/cultivo/CosechaPage";
import ListaCosechasPage from "./pages/cultivo/ListaCosechaPage";
import TipoControlPage from "./pages/cultivo/TipoControlPage";
import ListaTipoControlPage from "./pages/cultivo/ListaTipoControlPage";
import ProductosControlPage from "./pages/cultivo/ProductosControlPage";
import ListaProductoControlPage from "./pages/cultivo/ListaProductosControlPage";
import UsuariosPage from "./pages/usuarios/UsuariosPage";
import HerramientasPage from "./pages/inventario/HerramientasPage";
import ListaHerramientaPage from "./pages/inventario/ListaHerramientaPage";
import InsumoPage from "./pages/inventario/InsumoPage";
import ListaInsumoPage from "./pages/inventario/ListaInsumoPage";
import Precio_ProductoPage from "./pages/inventario/Precio_ProductoPage";
import ListaPrecio_ProductoPage from "./pages/inventario/ListaPrecio_ProductoPage";
import PerfilPage from "./pages/usuarios/PerfilPage";
import SensoresPage from "./pages/iot/SensoresPage";
import DatosMeteorologicosPage from "./pages/iot/DatosMeteorologicosPage";
import ForgotPasswordPage from "./pages/usuarios/ForgotPasswordPage";
import ResetPasswordPage from "./pages/usuarios/ResetPasswordPage";
import RegistrarSensorPage from "./pages/iot/RegistrarSensorPage";
import ListarSensores from "@/components/Iot/ListarSensores";
import Mapa from "./pages/globales/Mapa";
import SalarioPage from "./pages/finanzas/SalarioPage";
import VentaPage from "./pages/finanzas/VentaPage";
import ListaVentaPage from "./pages/finanzas/ListaVentaPage";
import ListaSalarioPage from "./pages/finanzas/ListaSalarioPage";
import UsuariosSecondPage from "./pages/usuarios/RegisterSecondPage";
import Reportes from "./pages/reportes/Reportes";
import CosechaGraficasPage from "./pages/cultivo/CosechasGraficasPage";
import GraficaIngreso from "./pages/reportes/GraficaIngreso";
import ListaPagoPage from "./pages/finanzas/ListaPagoPage";
import PagoPage from "./pages/finanzas/PagoPage";

const queryClient = new QueryClient();
const AuthenticatedLayout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = () => {
    setSidebarOpen((prev: boolean) => !prev);
  };

  return (
    <div className="flex min-h-screen">
      <Navbar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NavbarProvider>
          <GlobalStyles />
          <Toaster position="top-right" reverseOrder={false} />
          <Routes>
            {/* Rutas públicas */}
            <Route element={<LoginPage />} path="/login" />
            <Route element={<RegisterPage />} path="/register" />
            <Route element={<ForgotPasswordPage />} path="/forgot-password" />
            <Route element={<ResetPasswordPage />} path="/reset-password/:token" />

            {/* Rutas protegidas con Navbar */}
            <Route element={<PrivateRoute><AuthenticatedLayout /></PrivateRoute>}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/perfil" element={<PerfilPage />} />
              <Route path="/usuarios/secondregis/" element={<UsuariosSecondPage />} />
              <Route path="/inventario/herramientas/" element={<HerramientasPage />} />
              <Route path="/inventario/listarherramientas/" element={<ListaHerramientaPage />} />
              <Route path="/finanzas/salario/" element={<SalarioPage />} />
              <Route path="/finanzas/listarsalarios/" element={<ListaSalarioPage />} />
              <Route path="/finanzas/ventas/" element={<VentaPage />} />
              <Route path="/finanzas/listarventas/" element={<ListaVentaPage />} />
              <Route path="/finanzas/listarpagos/" element={<ListaPagoPage />} />
              <Route path="/finanzas/pago/" element={<PagoPage />} />
              <Route path="/inventario/insumos/" element={<InsumoPage />} />
              <Route path="/inventario/preciosproductos/" element={<Precio_ProductoPage />} />
              <Route path="/inventario/listarpreciosproductos/" element={<ListaPrecio_ProductoPage />} />
              <Route path="/inventario/listarinsumos/" element={<ListaInsumoPage />} />
              <Route path="/reportes/" element={<Reportes />} />
              <Route path="/cultivo/tipoespecie/" element={<TipoEspeciePage />} />
              <Route path="/cultivo/listartipoespecie/" element={<ListaTipoEspeciePage />} />
              <Route path="/cultivo/tipo_actividad/" element={<TipoActividadPage />} />
              <Route path="/cultivo/listartipoactividad/" element={<ListaTipoActividadPage />} />
              <Route path="/cultivo/lotes/" element={<LotesPage />} />
              <Route path="/cultivo/listarlotes/" element={<ListarLotesPage />} />
              <Route path="/cultivo/bancal/" element={<BancalPage />} />
              <Route path="/cultivo/listarbancal/" element={<ListaBancalPage />} />
              <Route path="/cultivo/especies/" element={<EspeciePage />} />
              <Route path="/cultivo/listarespecies/" element={<ListaEspeciePage />} />
              <Route path="/cultivo/programacion/" element={<ProgramacionPage />} />
              <Route path="/cultivo/listarprogramaciones/" element={<ListaProgramacion />} />
              <Route path="/cultivo/cultivo/" element={<CultivoPage />} />
              <Route path="/cultivo/listarcultivos/" element={<ListarCultivoPage />} />
              <Route path="/cultivo/actividad/" element={<ActividadPage />} />
              <Route path="/cultivo/listaractividad/" element={<ListaActividadPage />} />
              <Route path="/cultivo/tipoplaga/" element={<TipoPlagaPage />} />
              <Route path="/cultivo/listartipoplaga/" element={<ListaTipoPlagaPage />} />
              <Route path="/cultivo/plaga/" element={<PlagaPage />} />
              <Route path="/cultivo/listarplaga/" element={<ListaPlagasPage />} />
              <Route path="/cultivo/cosecha/" element={<CosechaPage />} />
              <Route path="/cultivo/listarcosechas/" element={<ListaCosechasPage />} />
              <Route path="/cultivo/tipo_control/" element={<TipoControlPage />} />
              <Route path="/cultivo/listartipocontrol/" element={<ListaTipoControlPage />} />
              <Route path="/cultivo/productoscontrol/" element={<ProductosControlPage />} />
              <Route path="/cultivo/listarproductoscontrol/" element={<ListaProductoControlPage />} />
              <Route path="/usuarios" element={<UsuariosPage />} />
              <Route path="/iot/sensores" element={<SensoresPage />} />
              <Route path="/iot/datosmetereologicos" element={<DatosMeteorologicosPage />} />
              <Route path="/iot/registrar-sensor" element={<RegistrarSensorPage />} />
              <Route path="/iot/listar-sensores" element={<ListarSensores />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/mapa" element={<Mapa />} />
              <Route path="/graficas/cosechas" element={<CosechaGraficasPage />} />
              <Route path="/graficas/ingresos" element={<GraficaIngreso />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/calendario" element={<Calendar />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<DashboardPage />} />
            </Route>
          </Routes>
        </NavbarProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;