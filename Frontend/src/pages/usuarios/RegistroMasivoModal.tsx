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
      confirmText="Cerrar"
      cancelText=""
    >

<div className="grid grid-cols-2 gap-4">

        <button
          onClick={enviarUsuarios}
          className="px-3 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
          >
          Enviar Excel
        </button>

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
