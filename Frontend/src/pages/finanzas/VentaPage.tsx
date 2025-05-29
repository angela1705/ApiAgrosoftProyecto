import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "@/layouts/default";
import { useVenta } from "@/hooks/finanzas/useVenta";
import { ReuInput } from "@/components/globales/ReuInput";
import { DetalleVenta } from "@/types/finanzas/Venta";
import { usePreciosProductos } from "@/hooks/inventario/usePrecio_Producto";
import Tabla from "@/components/globales/Tabla";
import { Trash2, Edit, Plus } from 'lucide-react';
import { PagoModal } from "@/components/finanzas/PagoModal";
import { TiqueteModal } from "@/components/finanzas/TiqueteModal";
import { useUnidadesMedida } from "@/hooks/inventario/useInsumo";
import { ModalUnidadMedida } from "@/components/cultivo/ModalUnidadMedida";

const VentaPage: React.FC = () => {
  const [detalle, setDetalle] = useState<DetalleVenta>({
    producto: 0,
    cantidad: 0,
    unidades_de_medida: 0,
    total: 0,
  });

  const [detallesAgregados, setDetallesAgregados] = useState<DetalleVenta[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTiqueteModalOpen, setIsTiqueteModalOpen] = useState(false);
  const [ventaIdForTiquete, setVentaIdForTiquete] = useState<number | null>(null);
  const { registrarVenta, isRegistrando } = useVenta();
  const { data: precio_producto, isLoading: precioProductoLoading } = usePreciosProductos();
  const navigate = useNavigate();
  const { data: unidadesMedida, isLoading: loadingUnidadesMedida } = useUnidadesMedida();
  const [openUnidadesMedidaModal, setOpenUnidadesMedidaModal] = useState(false);


  const handleChange = (field: keyof DetalleVenta) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value } = e.target;
    setDetalle((prev) => ({
      ...prev,
      [field]: field === "cantidad" || field === "producto" || field === "unidades_de_medida" 
        ? Number(value) 
        : value,
    }));
  };

  const agregarDetalle = () => {
    const productoSeleccionado = precio_producto?.find(p => p.id === detalle.producto);
    if (!productoSeleccionado) return;

    const nuevoDetalle = {
      ...detalle,
      total: detalle.cantidad * (productoSeleccionado.precio || 0),
      unidades_de_medida: detalle.unidades_de_medida || productoSeleccionado.unidad_medida?.id || 0,
    };

    if (editIndex !== null) {
      const nuevosDetalles = [...detallesAgregados];
      nuevosDetalles[editIndex] = nuevoDetalle;
      setDetallesAgregados(nuevosDetalles);
      setEditIndex(null);
    } else {
      setDetallesAgregados([...detallesAgregados, nuevoDetalle]);
    }

    setDetalle({
      producto: 0,
      cantidad: 0,
      unidades_de_medida: 0,
      total: 0,
    });
  };

  const handleEdit = (index: number) => {
    const detalleAEditar = detallesAgregados[index];
    setDetalle(detalleAEditar);
    setEditIndex(index);
  };

  const handleDelete = (index: number) => {
    const nuevosDetalles = detallesAgregados.filter((_, i) => i !== index);
    setDetallesAgregados(nuevosDetalles);
  };

  const columns = [
    { name: "Producto", uid: "producto" },
    { name: "Cantidad", uid: "cantidad" },
    { name: "Unidad", uid: "unidad" },
    { name: "Precio Unitario", uid: "precio" },
    { name: "Total", uid: "total" },
    { name: "Acciones", uid: "acciones" },
  ];
  
  const transformedData = detallesAgregados.map((detalle, index) => {
    const productoSeleccionado = precio_producto?.find(p => p.id === detalle.producto);
    const productoNombre = productoSeleccionado?.nombre_cultivo || "Desconocido";

    const unidadNombre = unidadesMedida?.find(u => u.id === detalle.unidades_de_medida)?.nombre?.toString() || "unidad";
    const precio = productoSeleccionado?.precio || 0;
    const total = detalle.total || 0;
    
    return {
      id: index.toString(),
      producto: productoNombre,
      cantidad: detalle.cantidad.toString(),
      unidad: unidadNombre,
      precio: `$${precio.toFixed(2)}`,
      total: `$${total.toFixed(2)}`,
      acciones: (
        <div className="flex gap-2">
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => handleEdit(index)}
          >
            <Edit size={20} color="black" />
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => handleDelete(index)}
          >
            <Trash2 size={20} />
          </button>
        </div>
      ),
    };
  });


  const calcularTotalVenta = () => {
    return detallesAgregados.reduce((sum, item) => sum + (item.total || 0), 0);
  };

  const handleFinalizarVenta = (montoEntregado: number) => {
    const fechaActual = new Date().toISOString();
    
    registrarVenta(
      {
        fecha: fechaActual,
        monto_entregado: montoEntregado,
        cambio: montoEntregado - calcularTotalVenta(),
        detalles: detallesAgregados
      }, 
      {
        onSuccess: (ventaRegistrada) => {
          setDetallesAgregados([]);
          setDetalle({
            producto: 0,
            cantidad: 0,
            unidades_de_medida: 0,
            total: 0,
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
                  value={detalle.producto || ""}
                  onChange={handleChange("producto")}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={precioProductoLoading}
                >
                  <option value="0">Seleccione un producto</option>
                  {precio_producto?.map((producto) => (
                    <option key={producto.id} value={producto.id}>
                      {producto.nombre_cultivo || 'Producto'} - ${producto.precio?.toString() || '0'}
                    </option>
                  ))}
                </select>
              </div>

              <ReuInput
                label="Cantidad"
                placeholder="Ingrese la cantidad"
                type="number"
                value={String(detalle.cantidad)}
                onChange={(e) => setDetalle({...detalle, cantidad: parseInt(e.target.value) || 0})}
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
                  value={detalle.unidades_de_medida}
                  onChange={handleChange("unidades_de_medida")}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                  disabled={loadingUnidadesMedida}
                >
                  <option value="0">Seleccione una unidad</option>
                  {unidadesMedida?.map((unidad) => (
                    <option key={unidad.id} value={unidad.id}>
                      {unidad.nombre?.toString() || 'Unidad'}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <button
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
                  onClick={(e) => {
                    e.preventDefault();
                    agregarDetalle();
                  }}
                  disabled={detalle.producto === 0 || detalle.cantidad <= 0}
                >
                  {editIndex !== null ? "Actualizar Producto" : "Agregar Producto"}
                </button>
              </div>
            </div>
          </div>

          {detallesAgregados.length > 0 && (
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
                  disabled={isRegistrando || detallesAgregados.length === 0}
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