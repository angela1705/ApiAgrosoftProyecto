"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@heroui/button";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import {
  FaHome,
  FaUser,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaLeaf,
  FaDollarSign,
  FaBug,
  FaBox,
  FaCloudRain,
  FaTachometerAlt,
  FaTemperatureHigh,
  FaWarehouse,
} from "react-icons/fa";
import { GiProcessor } from "react-icons/gi";
import LogoSena from "../../assets/def_AGROSIS_LOGOTIC.png";
import Sena from "../../assets/logo sena.png";

const menuItems = [
  { id: 1, label: "Inicio", path: "/", icon: <FaHome /> },
  { id: 21, label: "Usuarios", path: "/usuarios", icon: <FaUser /> },
  { id: 3, label: "Calendario", path: "/calendario", icon: <FaCalendarAlt /> },
  { id: 4, label: "Mapa", path: "/mapa", icon: <FaMapMarkerAlt /> },
  {
    id: 5,
    label: "Cultivos",
    icon: <FaLeaf />,
    subItems: [
      { id: 6, label: "Cultivo", path: "/cultivo/cultivo/" },
      { id: 7, label: "Especies", path: "/cultivo/especies/" },
      { id: 8, label: "Tipo Especie", path: "/cultivo/tipoespecie/" },
      { id: 9, label: "Bancal", path: "/cultivo/bancal/" },
      { id: 10, label: "Lotes", path: "/cultivo/lotes/" },
      { id: 11, label: "Tipo Actividad", path: "/cultivo/tipo_actividad/" },
      { id: 12, label: "Actividades", path: "/cultivo/actividad/" },
      { id: 13, label: "Programación", path: "/cultivo/programacion/" },
      { id: 14, label: "Cosecha", path: "/cultivo/cosecha/" },

    ],
  },
  { id: 15, 
    label: "Finanzas",
     path: "/finanzas",
     icon: <FaDollarSign />,
    subItems:[
      { id: 31, label: "Salario", path: "/finanzas/salario/" },
      { id: 32, label: "Ventas", path: "/finanzas/ventas/" },
    ] },
  {
    id: 16,
    label: "Plagas",
    icon: <FaBug />,
    subItems: [
      { id: 17, label: "Tipo Plaga", path: "/cultivo/tipoplaga/"},
      { id: 18, label: "Plaga", path: "/cultivo/plaga/"},
      { id: 19, label: "Control", path: "/inventario/bodegaherramienta" },

    ],
  },  {
    id: 20,
    label: "Inventario",
    icon: <FaBox />,
    subItems: [
      { id: 21, label: "Bodega", path: "/inventario/bodega", icon: <FaWarehouse /> },
      { id: 22, label: "Bodega Herramienta", path: "/inventario/bodegaherramienta", icon: <FaBox /> },
      { id: 23, label: "Herramientas", path: "/inventario/herramientas", icon: <FaBox /> },
      { id: 24, label: "Bodega Insumo", path: "/inventario/bodegainsumo", icon: <FaBox /> },
      { id: 25, label: "Insumos", path: "/inventario/insumo", icon: <FaBox /> },
    ],
  },
  {
    id: 26,
    label: "IoT",
    icon: <GiProcessor />,
    subItems: [
      { id: 27, label: "Evapotranspiración", path: "/iot/evapotranspiracion", icon: <FaCloudRain /> },
      { id: 28, label: "Sensores", path: "/iot/sensores", icon: <FaTachometerAlt /> },
      { id: 29, label: "Humedad", path: "/iot/humedad", icon: <FaTemperatureHigh /> },
    ],
  },
  { id: 30, label: "Docs", path: "/docs", icon: <FaUser /> },
];

export default function Navbar({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) {
  return (
    <aside
      className={`h-screen bg-white shadow-lg transition-all duration-300 flex flex-col fixed top-0 bottom-0 z-50
      ${isOpen ? "w-64 p-4" : "w-20 p-2"} rounded-r-2xl`}
    >
      <div className="flex justify-between items-center">
        <Button isIconOnly variant="light" className="mb-4" onClick={toggleSidebar}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      <div className={`flex items-center justify-center transition-all ${!isOpen ? "hidden" : ""}`}>
        <img src={LogoSena} alt="Logo Agrosis" className="w-40 transition-all" />
      </div>

      <nav className="flex flex-col mt-6 gap-4 overflow-y-auto scrollbar-hidden flex-1">
        {menuItems.map((item) => (
          <SidebarItem key={item.id} item={item} isOpen={isOpen} />
        ))}
      </nav>

      <div className={`mt-6 flex items-center justify-center transition-all ${!isOpen ? "hidden" : ""}`}>
        <img src={Sena} alt="Logo Sena" className="w-20 transition-all" />
      </div>
    </aside>
  );
}

function SidebarItem({ item, isOpen }: { item: any; isOpen: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <Link
        to={item.path || "#"}
        className={`flex items-center gap-2 p-3 rounded-full transition-all font-medium cursor-pointer
        bg-white shadow-md hover:bg-gray-400 hover:text-white
        ${isOpen ? "w-5/6 mx-auto" : "justify-center w-12 mx-auto"}`}
        onClick={(e) => {
          if (item.subItems) {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          }
        }}
      >
        {item.icon}
        {isOpen && <span>{item.label}</span>}
        {item.subItems && isOpen && (isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
      </Link>

      {isOpen && isExpanded && item.subItems && (
        <div className="flex flex-col gap-2 mt-2">
          {item.subItems.map((subItem: any) => (
            <Link key={subItem.id} to={subItem.path} className="flex items-center gap-2 p-3 rounded-full transition-all font-medium cursor-pointer bg-white shadow-md hover:bg-gray-400 hover:text-white text-black w-5/6 mx-auto">
              {subItem.icon}
              <span>{subItem.label}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = `
  .scrollbar-hidden::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hidden {
    -ms-overflow-style: none; /* IE y Edge */
    scrollbar-width: none; /* Firefox */
  }
`;

export function GlobalStyles() {
  return <style>{styles}</style>;
}