// src/components/usuarios/RegistroMasivoModal.tsx

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import ReuModal from '@/components/globales/ReuModal';

interface RegistroMasivoModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const RegistroMasivoModal: React.FC<RegistroMasivoModalProps> = ({ isOpen, onOpenChange }) => {
  const [usuarios, setUsuarios] = useState([
    { nombre: '', apellido: '', documento: '', email: '', password: '' }
  ]);

  const agregarFila = () => {
    setUsuarios([...usuarios, { nombre: '', apellido: '', documento: '', email: '', password: '' }]);
  };

  const eliminarFila = (index: number) => {
    const nuevosUsuarios = [...usuarios];
    nuevosUsuarios.splice(index, 1);
    setUsuarios(nuevosUsuarios);
  };

  const actualizarCampo = (index: number, campo: string, valor: string) => {
    const nuevosUsuarios = [...usuarios];
    nuevosUsuarios[index][campo as keyof typeof nuevosUsuarios[0]] = valor;
    setUsuarios(nuevosUsuarios);
  };

  const enviarUsuarios = () => {
    console.log('Usuarios para registrar:', usuarios);
    // Aquí iría la petición al backend con fetch o axios
  };

  const exportarAExcel = () => {
    const hoja = usuarios.map(({ nombre, apellido, documento, email, password }) => ({
      Nombre: nombre,
      Apellido: apellido,
      Documento: documento,
      Email: email,
      Contraseña: password,
    }));

    const libro = XLSX.utils.book_new();
    const hojaExcel = XLSX.utils.json_to_sheet(hoja);
    XLSX.utils.book_append_sheet(libro, hojaExcel, 'Usuarios');
    XLSX.writeFile(libro, 'registro_usuarios.xlsx');
  };

  return (
    <ReuModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Registro Masivo de Usuarios"
      size="4xl"
      confirmText="Cerrar"
      cancelText=""
    >
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 mb-4 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Nombre</th>
              <th className="border p-2">Apellido</th>
              <th className="border p-2">Documento</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Contraseña</th>
              <th className="border p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario, index) => (
              <tr key={index}>
                {['nombre', 'apellido', 'documento', 'email', 'password'].map((campo) => (
                  <td key={campo} className="border p-2">
                    <input
                      type={campo === 'password' ? 'password' : 'text'}
                      value={usuario[campo as keyof typeof usuario]}
                      onChange={(e) => actualizarCampo(index, campo, e.target.value)}
                      className="w-full p-1 border rounded"
                    />
                  </td>
                ))}
                <td className="border p-2">
                  <button
                    onClick={() => eliminarFila(index)}
                    className="text-red-600 hover:underline"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap gap-3 justify-end">
        <button
          onClick={agregarFila}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Agregar fila
        </button>

        <button
          onClick={enviarUsuarios}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Registrar usuarios
        </button>

        <button
          onClick={exportarAExcel}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Exportar a Excel
        </button>
      </div>
    </ReuModal>
  );
};

export default RegistroMasivoModal;
