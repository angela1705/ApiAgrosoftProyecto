import React, { useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import ReuModal from '@/components/globales/ReuModal';
import axios from 'axios';
interface RegistroMasivoModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const RegistroMasivoModal: React.FC<RegistroMasivoModalProps> = ({ isOpen, onOpenChange }) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [usuarios, setUsuarios] = useState([
    { nombre: '', apellido: '', username: '', email: '', password: '' }
  ]);

  const handleSeleccionarArchivo = () => {
    inputFileRef.current?.click();
  };

  const handleArchivoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0];
    if (!archivo) return;

    const formData = new FormData();
    formData.append('archivo', archivo);

    try {
      const response = await axios.post('http://localhost:8000/registro_usuarios_masivo/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Respuesta del servidor:', response.data);
      // Aquí puedes cerrar el modal, mostrar un toast, etc.
    } catch (error) {
      console.error('Error al enviar el archivo:', error);
    }
  };

  const exportarAExcel = () => {
    const hoja = usuarios.map(({ nombre, apellido, username, email, password }) => ({
      nombre: nombre,
      apellido: apellido,
      username: username,
      email: email,
      password: password,
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
      confirmText="Cerrar"
      cancelText=""
    >
      <div className="grid grid-cols-2 gap-4">

        {/* Botón para abrir el input de archivo */}
        <button
          onClick={handleSeleccionarArchivo}
          className="px-3 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
        >
          Enviar Excel
        </button>

        {/* Input oculto para seleccionar archivo */}
        <input
          type="file"
          accept=".xlsx, .xls"
          ref={inputFileRef}
          onChange={handleArchivoChange}
          style={{ display: 'none' }}
        />

        {/* Botón para generar Excel */}
        <button
          onClick={exportarAExcel}
          className="px-3 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
        >
          Generar Excel
        </button>
      </div>
    </ReuModal>
  );
};

export default RegistroMasivoModal;
