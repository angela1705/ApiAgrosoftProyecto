import React, { useState } from 'react';

const RegistroMasivoPage = () => {
  const [usuarios, setUsuarios] = useState([
    { nombre: '', aepllido:'', documento: '', email: '', password: '' }
  ]);

  const agregarFila = () => {
    setUsuarios([...usuarios, { nombre: '', aepllido:'', documento: '', email: '', password: '' }]);
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
    // Aquí iría el fetch/axios POST al backend
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Registro Masivo de Usuarios</h2>

      <table className="w-full border border-gray-300 mb-4">
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
              {['nombre', 'apellido','documento', 'email',  'password'].map((campo) => (
                <td key={campo} className="border p-2">
                  <input
                    type={campo === 'password' ? 'password' : 'text'}
                    value={usuario[campo as keyof typeof usuario]}
                    onChange={(e) => actualizarCampo(index, campo, e.target.value)}
                    className="w-full p-1 border rounded"
                  />
                </td>
              ))}
              <td className="border p-2 ">
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

      <div className="flex gap-4">
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
      </div>
    </div>
  );
};

export default RegistroMasivoPage;
