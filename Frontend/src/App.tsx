import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import DocsPage from './pages/docs';
import PricingPage from './pages/pricing';
import BlogPage from './pages/blog';
import AboutPage from './pages/about';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/Dashboard';
import PrivateRoute from './components/RutaPrivada';
import TipoEspeciePage from './pages/TipoEspeciePage';
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
          <Route
            path="/docs"
            element={<PrivateRoute><DocsPage /></PrivateRoute>}
          />
          <Route
            path="/cultivo/tipoespecie/"
            element={<PrivateRoute><TipoEspeciePage /></PrivateRoute>}
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