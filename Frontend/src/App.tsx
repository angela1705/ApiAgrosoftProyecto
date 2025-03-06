import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import DocsPage from './pages/docs';
import PricingPage from './pages/pricing';
import BlogPage from './pages/blog';
import AboutPage from './pages/about';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/Dashboard';
import PrivateRoute from './components/RutaPrivada';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Ruta pública para login */}
        <Route element={<LoginPage />} path="/login" />

        {/* Rutas protegidas */}
        <Route
          path="/"
          element={<PrivateRoute><DashboardPage /></PrivateRoute>}
        />
        <Route
          path="/docs"
          element={<PrivateRoute><DocsPage /></PrivateRoute>}
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

        {/* Ruta por defecto redirige a login ese todo bonito */}
        <Route path="*" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;