import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@heroui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  FaHome,
  FaUser,
  FaCalendarAlt,
  FaLeaf,
  FaDollarSign,
  FaBug,
  FaCloudRain,
  FaTachometerAlt,
  FaTemperatureHigh,
  FaWarehouse,
  FaFileAlt,
  FaChartBar,
  FaMap,
} from "react-icons/fa";
import { GiProcessor } from "react-icons/gi";
import { useNavbar } from "../../context/NavbarContext";
import LogoSena from "../../assets/def_AGROSIS_LOGOTIC.png";
import Sena from "../../assets/logo sena.png";
import { useAuth } from "@/context/AuthContext"; 


const menuItemsBase = [
  { id: 1, label: "Inicio", path: "/", icon: <FaHome /> },
  { id: 46, label: "Mapa", path: "/mapa", icon: <FaMap /> },
  { id: 3, label: "Usuarios", path: "/usuarios", icon: <FaUser /> },
  { id: 4, label: "Calendario", path: "/calendario", icon: <FaCalendarAlt /> },
  {
    id: 5,
    label: "Cultivos",
    icon: <FaLeaf />,
    subItems: [
      { id: 6, label: "Tipo especies", path: "/cultivo/listartipoespecie/" },
      { id: 7, label: "Especies", path: "/cultivo/listarespecies/" },
      { id: 8, label: "Cultivo", path: "/cultivo/listarcultivos/" },
      { id: 9, label: "Bancal", path: "/cultivo/listarbancal/" },
      { id: 10, label: "Lotes", path: "/cultivo/listarlotes/" },
      { id: 11, label: "Tipo Actividad", path: "/cultivo/listartipoactividad/" },
      { id: 12, label: "Actividades", path: "/cultivo/listaractividad/" },
      { id: 14, label: "Cosecha", path: "/cultivo/listarcosechas/" },
      { id: 99, label: "Trazabilidad", path: "/cultivo/trazabilidad/" },
      { id: 100, label: "Residuos", path: "/cultivo/listaresiduo/" },
    ],
  },
  {
    id: 15,
    label: "Finanzas",
    icon: <FaDollarSign />,
    subItems: [
      { id: 16, label: "Salario", path: "/finanzas/listarsalarios/" },
      { id: 17, label: "Ventas", path: "/finanzas/listarventas/" },
      { id: 18, label: "Pagos", path: "/finanzas/listarpagos/" },
      { id: 19, label: "Costo Beneficio", path: "/finanzas/costo_beneficio/" },
    ],
  },
  {
    id: 20,
    label: "Plagas",
    icon: <FaBug />,
    subItems: [
      { id: 21, label: "Tipo Plaga", path: "/cultivo/listartipoplaga/" },
      { id: 22, label: "Plaga", path: "/cultivo/listarplaga/" },
      { id: 23, label: "Control", path: "/cultivo/listacontrol/" },
      { id: 24, label: "Tipo Control", path: "/cultivo/listartipocontrol/" },
      { id: 25, label: "Afecciones", path: "/cultivo/listafecciones/" },
      { id: 27, label: "Reportar plaga", path: "/cultivo/listareporteplaga/" },
    ],
  },
  {
    id: 28,
    label: "Inventario",
    icon: <FaWarehouse />,
    subItems: [
      { id: 29, label: "Herramientas", path: "/inventario/listarherramientas", icon: <FaWarehouse /> },
      { id: 30, label: "Insumos", path: "/inventario/listarinsumos", icon: <FaWarehouse /> },
      { id: 31, label: "Producto", path: "/inventario/listarpreciosproductos", icon: <FaWarehouse /> },
      { id: 32, label: "Bodega", path: "/inventario/listarbodega", icon: <FaWarehouse /> },
      { id: 33, label: "Bodega Herramienta", path: "/inventario/listarbodegaherramienta", icon: <FaWarehouse /> },
      { id: 34, label: "Bodega Insumo", path: "/inventario/listarbodegainsumos", icon: <FaWarehouse /> },
    ],
  },
  {
    id: 35,
    label: "IoT",
    icon: <GiProcessor />,
    subItems: [
      { id: 36, label: "Datos en Tiempo Real", path: "/iot/sensores", icon: <FaTachometerAlt /> },
      { id: 37, label: "Datos Históricos", path: "/iot/datosmeteorologicos", icon: <FaTemperatureHigh /> },
      { id: 38, label: "Lista de Sensores", path: "/iot/listar-sensores", icon: <FaTachometerAlt /> },
      { id: 39, label: "Evapotranspiración", path: "/iot/evapotranspiracion", icon: <FaCloudRain /> },
    ],
  },
  { id: 40, label: "Reportes", path: "/reportes/", icon: <FaFileAlt /> },
  {
    id: 41,
    label: "Gráficas",
    icon: <FaChartBar />,
    subItems: [
      { id: 42, label: "Ingresos", path: "/graficas/ingresos" },
      { id: 43, label: "Cosechas", path: "/graficas/cosechas" },
      { id: 44, label: "Egresos", path: "/graficas/egresos" },
      { id: 45, label: "Costo actividad", path: "/graficas/actividadcosto" },
    ],
  },
];

export default function Navbar() {
  const { isSidebarOpen, setSidebarOpen, expandedItems, setExpandedItems, navScrollPosition, setNavScrollPosition } = useNavbar();
  const navRef = useRef<HTMLElement>(null);
  const { user } = useAuth(); 
  const rol = user?.rol?.rol ?? ""; 

const menuItemsFiltrados = menuItemsBase.filter(item => {
  if (rol === "Pasante") {
    return ![3, 15, 28, 35, 41].includes(item.id); // Oculta por ID
  }
  if (rol === "Invitado") {
    return [1].includes(item.id); // Solo Inicio
  }
  return true;
});

  // Restaurar posición del scroll
  useEffect(() => {
    if (navRef.current) {
      navRef.current.scrollTop = navScrollPosition;
    }
  }, [navScrollPosition]);

  // Actualizar posición del scroll
  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        setNavScrollPosition(navRef.current.scrollTop);
      }
    };

    const navElement = navRef.current;
    if (navElement) {
      navElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (navElement) {
        navElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const toggleExpanded = (itemId: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <aside
      className={`h-screen bg-white shadow-lg transition-all duration-300 flex flex-col fixed top-0 left-0 z-50
        ${isSidebarOpen ? "w-64 p-4" : "w-20 p-2"} rounded-r-lg`}
    >
      {/* Header con logos y barra vertical */}
      <div className="flex flex-col items-center gap-4">
        <Button isIconOnly variant="light" className="mb-4 rounded-md" onClick={toggleSidebar}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </Button>
        <div className={`flex items-center justify-center gap-4 ${!isSidebarOpen ? "hidden" : ""}`}>
          <img src={LogoSena} alt="Logo Agrosis" className="w-28" />
          <span className="text-gray-400 text-2xl font-light">|</span>
          <img src={Sena} alt="Logo Sena" className="w-12" />
        </div>
      </div>

      {/* Menú */}
      <nav ref={navRef} className="flex-1 mt-6 overflow-y-auto scrollbar-hide">
        <div className="flex flex-col gap-4">
          {menuItemsFiltrados.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              isOpen={isSidebarOpen}
              isExpanded={!!expandedItems[item.id]}
              toggleExpanded={() => toggleExpanded(item.id)}
            />
          ))}
        </div>
      </nav>
    </aside>
  );
}

function SidebarItem({
  item,
  isOpen,
  isExpanded,
  toggleExpanded,
}: {
  item: any;
  isOpen: boolean;
  isExpanded: boolean;
  toggleExpanded: () => void;
}) {
  return (
    <div>
      <Link
        to={item.path || "#"}
        className={`flex items-center gap-2 p-3 rounded-md transition-all font-medium cursor-pointer
          bg-white shadow-sm hover:bg-gray-400 hover:text-white
          ${isOpen ? "w-5/6 mx-auto" : "justify-center w-12 mx-auto"}`}
        onClick={(e) => {
          if (item.subItems) {
            e.preventDefault();
            toggleExpanded();
          }
        }}
      >
        {item.icon}
        {isOpen && <span>{item.label}</span>}
        {item.subItems && isOpen && (isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
      </Link>

      {isOpen && isExpanded && item.subItems && (
        <div className="flex flex-col gap-2 mt-2 ml-8">
          {item.subItems.map((subItem: any) => (
            <Link
              key={subItem.id}
              to={subItem.path}
              className="flex items-center gap-2 p-2 pl-6 rounded-md transition-all font-medium cursor-pointer
                bg-gray-100 shadow-sm hover:bg-gray-300 hover:text-white text-gray-700 w-5/6 mx-auto
                relative before:absolute before:left-3 before:w-2 before:h-2 before:bg-gray-400 before:rounded-full"
            >
              {subItem.icon && <span className="text-gray-600">{subItem.icon}</span>}
              <span className="text-sm">{subItem.label}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}