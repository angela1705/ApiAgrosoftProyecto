import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "@/layouts/default";
import { useVenta } from "@/hooks/finanzas/useVenta";
import { ReuInput } from "@/components/globales/ReuInput";
import { Venta } from "@/types/finanzas/Venta";
import { usePreciosProductos } from "@/hooks/inventario/usePrecio_Producto";
import Tabla from "@/components/globales/Tabla";
import { Trash2 } from 'lucide-react';
import { PagoModal } from "@/components/finanzas/PagoModal";
import { TiqueteModal } from "@/components/finanzas/TiqueteModal";
import { useUnidadesMedida } from "@/hooks/inventario/useInsumo";
import { ModalUnidadMedida } from "@/components/cultivo/ModalUnidadMedida";
import { Plus } from 'lucide-react';

const VentaPage: React.FC = () => {
  const [venta, setVenta] = useState<Venta>({
    producto: 0,
    cantidad: 0,
    precio: 0,
    total: 0,
    fecha: '',
    monto_entregado: 0,
    cambio: 0,
    unidades_de_medida: 0,
  });

  const [productosAgregados, setProductosAgregados] = useState<Venta[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTiqueteModalOpen, setIsTiqueteModalOpen] = useState(false);
  const [ventaIdForTiquete, setVentaIdForTiquete] = useState<number | null>(null);
  const { registrarVenta, isRegistrando } = useVenta();
  const { data: precio_producto, isLoading: precioProductoLoading } = usePreciosProductos();
  const navigate = useNavigate();
  const { data: unidadesMedida, isLoading: loadingUnidadesMedida } = useUnidadesMedida();
  const [openUnidadesMedidaModal, setOpenUnidadesMedidaModal] = useState(false);
  
  const handleChange = (field: keyof Venta) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { value } = e.target;
    setVenta((prev) => ({
      ...prev,
      [field]: field === "cantidad" || field === "precio" || field === "producto" || field === "unidades_de_medida" 
        ? Number(value) 
        : value,
    }));
  };

  const agregarProducto = () => {
    const productoSeleccionado = precio_producto?.find(p => p.id === venta.producto);
    if (!productoSeleccionado) return;
    const unidadMedida = venta.unidades_de_medida || productoSeleccionado.unidad_medida?.id || 0;


    const nuevoProducto = {
      ...venta,
      precio: productoSeleccionado.precio,
      total: venta.cantidad * productoSeleccionado.precio,
    unidades_de_medida: unidadMedida,
    };

    if (editIndex !== null) {
      const nuevosProductos = [...productosAgregados];
      nuevosProductos[editIndex] = nuevoProducto;
      setProductosAgregados(nuevosProductos);
      setEditIndex(null);
    } else {
      setProductosAgregados([...productosAgregados, nuevoProducto]);
    }

    setVenta({
      producto: 0,
      cantidad: 0,
      precio: 0,
      total: 0,
      fecha: venta.fecha,
      monto_entregado: 0,
      cambio: 0,
      unidades_de_medida: venta.unidades_de_medida,
    });
  };

  const handleDelete = (index: number) => {
    const nuevosProductos = productosAgregados.filter((_, i) => i !== index);
    setProductosAgregados(nuevosProductos);
  };

  const columns = [
    { name: "Producto", uid: "producto" },
    { name: "Cantidad", uid: "cantidad" },
    { name: "Unidad", uid: "unidad" },
    { name: "Precio Unitario", uid: "precio" },
    { name: "Total", uid: "total" },
    { name: "Quitar", uid: "acciones" },
  ];
  
  const transformedData = productosAgregados.map((venta, index) => {
    const productoNombre = precio_producto?.find(p => p.id === venta.producto)?.cosecha || "Desconocido";
    const unidadNombre = precio_producto?.find(p => p.id === venta.producto)?.unidad_medida?.nombre || "unidad";
    const precio = Number(venta.precio) || 0;
    const total = Number(venta.total) || 0;
    
    return {
      id: index.toString(),
      producto: productoNombre,
      cantidad: venta.cantidad,
      unidad: unidadNombre,
      precio: `${precio.toFixed(2)}`,
      total: `${total.toFixed(2)}`,
      acciones: (
        <button
          className="text-red-500 hover:underline"
          onClick={() => handleDelete(index)}
        >
          <Trash2 size={22} color='red'/>
        </button>
      ),
    };
  });

  const calcularTotalVenta = () => {
    return productosAgregados.reduce((sum, item) => sum + item.total, 0);
  };

  const handleFinalizarVenta = (montoEntregado: number) => {
    const ventasConMonto = productosAgregados.map(producto => ({
      ...producto,
      monto_entregado: montoEntregado,
      fecha: venta.fecha || new Date().toISOString().split("T")[0],
    }));

    registrarVenta(
      ventasConMonto[0], 
      {
        onSuccess: (ventaRegistrada) => {
          setProductosAgregados([]);
          setVenta({
            producto: 0,
            cantidad: 0,
            precio: 0,
            total: 0,
            fecha: new Date().toISOString().split("T")[0],
            monto_entregado: 0,
            cambio: 0,
            unidades_de_medida: 0,
          });
          setIsModalOpen(false);
          
          setVentaIdForTiquete(ventaRegistrada.id ?? null);
          setIsTiqueteModalOpen(true);
        },
      }
    );
  };

  return (
    <DefaultLayout>
     <ModalUnidadMedida 
        isOpen={openUnidadesMedidaModal} 
        onOpenChange={setOpenUnidadesMedidaModal} 
      />
        <div className="w-full flex flex-col items-center min-h-screen p-6">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Registro de Venta</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Producto</label>
              <select
                name="producto"
                value={venta.producto || ""}
                onChange={handleChange("producto")}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={precioProductoLoading}
              >
                <option value="0">Seleccione un producto</option>
                {precio_producto?.map((precioProducto) => (
                  <option key={precioProducto.id} value={precioProducto.id}>
                    {precioProducto.cosecha} - {precioProducto.unidad_medida?.nombre || 'unidad'}
                  </option>
                ))}
              </select>
            </div>

            <ReuInput
              label="Cantidad"
              placeholder="Ingrese la cantidad"
              type="number"
              value={String(venta.cantidad)}
              onChange={handleChange("cantidad")}
            />
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <label className="block text-sm font-medium text-gray-700">Unidad de Medida</label>
                <button 
                  className="p-1 h-6 w-6 flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                  onClick={() => setOpenUnidadesMedidaModal(true)}
                  type="button"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <select
                value={venta.unidades_de_medida}
                onChange={handleChange("unidades_de_medida")}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                disabled={loadingUnidadesMedida}
              >
                <option value="">Seleccione una unidad</option>
                {unidadesMedida?.map((unidad) => (
                  <option key={unidad.id} value={unidad.id}>
                    {unidad.nombre}
                  </option>
                ))}
              </select>
            </div>

            <ReuInput
              label="Fecha"
              placeholder="Seleccione la fecha"
              type="date"
              value={venta.fecha}
              onChange={handleChange("fecha")}
            />

            <div className="pt-2">
              <button
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
                onClick={(e) => {
                  e.preventDefault();
                  agregarProducto();
                }}
                disabled={venta.producto === 0 || venta.cantidad <= 0}
              >
                {editIndex !== null ? "Actualizar Producto" : "Agregar Producto"}
              </button>
            </div>
          </div>
        </div>

        {productosAgregados.length > 0 && (
          <div className="space-y-4">
            <div className="mb-4">
              <Tabla columns={columns} data={transformedData} />
            </div>

            <div className="flex justify-between items-center">
              <div className="text-lg font-semibold">
                Total Venta: ${calcularTotalVenta().toFixed(2)}
              </div>

              <button
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
                disabled={isRegistrando || productosAgregados.length === 0}
                onClick={() => setIsModalOpen(true)}
              >
                {isRegistrando ? "Registrando..." : "Finalizar Venta"}
              </button>
            </div>
          </div>
        )}

        <button
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg mt-4 hover:bg-blue-700 transition-colors"
          onClick={() => navigate("/finanzas/listarventas/")}
        >
          Listar Ventas
        </button>
      </div>

      <PagoModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        total={calcularTotalVenta()}
        onConfirm={handleFinalizarVenta}
      />
      
      <TiqueteModal
        isOpen={isTiqueteModalOpen}
        onOpenChange={setIsTiqueteModalOpen}
        ventaId={ventaIdForTiquete}
      />
    </div>
    </DefaultLayout>
  );
};

export default VentaPage;