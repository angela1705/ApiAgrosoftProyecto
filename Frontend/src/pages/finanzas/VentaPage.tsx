import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "@/layouts/default";
import { useVenta } from "@/hooks/finanzas/useVenta";
import { ReuInput } from "@/components/globales/ReuInput";
import { Venta } from "@/types/finanzas/Venta";
import { usePreciosProductos } from "@/hooks/inventario/usePrecio_Producto";
import Tabla from "@/components/globales/Tabla";
import { Trash2 } from 'lucide-react';

const VentaPage: React.FC = () => {
  const [venta, setVenta] = useState<Venta>({
    producto: 0,
    cantidad: 0,
    precio: 0,
    total: 0,
    fecha: new Date().toISOString().split("T")[0],
  });

  const [productosAgregados, setProductosAgregados] = useState<Venta[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const { registrarVenta, registrarMultiplesVentas, isRegistrando, isRegistrandoMultiples } = useVenta();
  const { data: precio_producto, isLoading: precioProductoLoading, error: precioProductoError } = usePreciosProductos();
  const navigate = useNavigate();

  // Depuración
  console.log("precio_producto:", precio_producto);
  console.log("productosAgregados:", productosAgregados);

  const handleChange = (field: keyof Venta) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value } = e.target;
    setVenta((prev) => ({
      ...prev,
      [field]: field === "cantidad" || field === "producto" ? Number(value) : value,
    }));
  };

  const agregarProducto = () => {
    if (venta.producto === 0 || venta.cantidad <= 0) {
      alert("Seleccione una cosecha y una cantidad válida.");
      return;
    }

    const productoSeleccionado = precio_producto?.find(p => p.id === venta.producto);
    if (!productoSeleccionado) {
      alert("Cosecha no encontrada.");
      return;
    }

    if (venta.cantidad > productoSeleccionado.stock) {
      alert(`La cantidad (${venta.cantidad}) excede el stock disponible (${productoSeleccionado.stock}).`);
      return;
    }

    const nuevoProducto: Venta = {
      producto: venta.producto,
      cantidad: venta.cantidad,
      precio: productoSeleccionado.precio,
      total: venta.cantidad * productoSeleccionado.precio,
      fecha: venta.fecha,
    };

    console.log("Agregando producto:", nuevoProducto); // Depuración

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
    });
  };

  const handleDelete = (index: number) => {
    const nuevosProductos = productosAgregados.filter((_, i) => i !== index);
    setProductosAgregados(nuevosProductos);
    console.log("Productos después de eliminar:", nuevosProductos); // Depuración
  };

  const handleRegistrarUnaVenta = () => {
    if (venta.producto === 0 || venta.cantidad <= 0) {
      alert("Seleccione una cosecha y una cantidad válida.");
      return;
    }

    const productoSeleccionado = precio_producto?.find(p => p.id === venta.producto);
    if (!productoSeleccionado) {
      alert("Cosecha no encontrada.");
      return;
    }

    if (venta.cantidad > productoSeleccionado.stock) {
      alert(`La cantidad (${venta.cantidad}) excede el stock disponible (${productoSeleccionado.stock}).`);
      return;
    }

    const nuevaVenta: Venta = {
      producto: venta.producto,
      cantidad: venta.cantidad,
      precio: productoSeleccionado.precio,
      total: venta.cantidad * productoSeleccionado.precio,
      fecha: venta.fecha,
    };

    console.log("Registrando una venta:", nuevaVenta); // Depuración
    registrarVenta(nuevaVenta, {
      onSuccess: () => {
        setVenta({
          producto: 0,
          cantidad: 0,
          precio: 0,
          total: 0,
          fecha: new Date().toISOString().split("T")[0],
        });
        console.log("Venta registrada, formulario reseteado"); // Depuración
      },
      onError: (error: any) => {
        console.error("Error al registrar una venta:", error.message); // Depuración
      },
    });
  };

  const handleFinalizarVenta = () => {
    if (productosAgregados.length === 0) {
      alert("No hay cosechas para registrar.");
      return;
    }

    console.log("Finalizando venta con productos:", productosAgregados); // Depuración
    registrarMultiplesVentas(productosAgregados, {
      onSuccess: () => {
        setProductosAgregados([]);
        setVenta({
          producto: 0,
          cantidad: 0,
          precio: 0,
          total: 0,
          fecha: new Date().toISOString().split("T")[0],
        });
        console.log("Venta finalizada, productosAgregados reseteado"); // Depuración
      },
      onError: (error: any) => {
        console.error("Error al finalizar venta:", error.message); // Depuración
      },
    });
  };

  const columns = [
    { name: "Cosecha", uid: "producto", sortable: true },
    { name: "Cantidad", uid: "cantidad", sortable: true },
    { name: "Precio Unitario", uid: "precio", sortable: true },
    { name: "Total", uid: "total", sortable: true },
    { name: "Acciones", uid: "acciones" },
  ];

  const transformedData = productosAgregados.map((venta, index) => {
    const producto = precio_producto?.find(p => p.id === venta.producto);
    const cosechaNombre = producto?.cosecha || "Desconocido";
    const precio = Number(venta.precio) || 0;
    const unidadMedida = producto?.unidad_medida || "";
    const total = Number(venta.total) || 0;

    return {
      id: index.toString(),
      producto: cosechaNombre,
      cantidad: venta.cantidad,
      precio: unidadMedida ? `$${precio.toFixed(2)}/${unidadMedida}` : `$${precio.toFixed(2)}`,
      total: `$${total.toFixed(2)}`,
      acciones: (
        <button
          className="text-red-500 hover:underline"
          onClick={() => handleDelete(index)}
        >
          <Trash2 size={22} color="red" />
        </button>
      ),
    };
  });

  // Depuración
  console.log("transformedData:", transformedData);

  const calcularTotalVenta = () => {
    return productosAgregados.reduce((sum, item) => sum + item.total, 0);
  };

  return (
    <DefaultLayout>
      <div className="w-full flex flex-col items-center min-h-screen p-6">
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Registro de Venta</h2>

          {precioProductoLoading && <p>Cargando cosechas...</p>}
          {precioProductoError && <p>Error al cargar cosechas: {precioProductoError.message}</p>}
          {!precioProductoLoading && !precioProductoError && precio_producto?.length === 0 && (
            <p>No hay cosechas disponibles.</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Cosecha</label>
              <select
                name="producto"
                value={venta.producto || ""}
                onChange={handleChange("producto")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={precioProductoLoading}
              >
                <option value="0">Seleccione una cosecha</option>
                {precio_producto?.map((precioProducto) => (
                  <option key={precioProducto.id} value={precioProducto.id}>
                    {precioProducto.cosecha} (Stock: {precioProducto.stock})
                  </option>
                ))}
              </select>

              <ReuInput
                label="Cantidad"
                placeholder="Ingrese la cantidad"
                type="number"
                value={String(venta.cantidad)}
                onChange={handleChange("cantidad")}
              />
            </div>

            <div>
              <ReuInput
                label="Fecha"
                placeholder="Seleccione la fecha"
                type="date"
                value={venta.fecha}
                onChange={handleChange("fecha")}
              />

              <div className="flex gap-2 mt-6">
                <button
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
                  onClick={agregarProducto}
                  disabled={venta.producto === 0 || venta.cantidad <= 0}
                >
                  {editIndex !== null ? "Actualizar Cosecha" : "Agregar Cosecha"}
                </button>
                <button
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
                  onClick={handleRegistrarUnaVenta}
                  disabled={isRegistrando || venta.producto === 0 || venta.cantidad <= 0}
                >
                  {isRegistrando ? "Registrando..." : "Registrar Una Venta"}
                </button>
              </div>
            </div>
          </div>

          {productosAgregados.length > 0 ? (
            <>
              <div className="mb-4">
                <Tabla columns={columns} data={transformedData} />
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="text-lg font-semibold">
                  Total Venta: ${calcularTotalVenta().toFixed(2)}
                </div>

                <button
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
                  disabled={isRegistrandoMultiples || productosAgregados.length === 0}
                  onClick={handleFinalizarVenta}
                >
                  {isRegistrandoMultiples ? "Registrando..." : "Finalizar Venta"}
                </button>
              </div>
            </>
          ) : (
            <p>No hay cosechas agregadas.</p>
          )}

          <button
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg mt-4 hover:bg-blue-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
            onClick={() => navigate("/finanzas/listarventas/")}
          >
            Listar Ventas
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default VentaPage;