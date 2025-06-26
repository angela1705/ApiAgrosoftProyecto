import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToast } from "@heroui/toast";

import DefaultLayout from "@/layouts/default";
import { useRegistrarUsuario } from "@/hooks/usuarios/useRegistrarUsuario";
import Formulario from "@/components/globales/Formulario";
import { ReuInput } from "@/components/globales/ReuInput";

const UsuariosSecondPage: React.FC = () => {
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    numero_documento: 0,
  });

  const { registrarUsuario, isLoading } = useRegistrarUsuario();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const numeroStr = usuario.numero_documento.toString();

    if (
      !usuario.nombre.trim() ||
      !usuario.apellido.trim() ||
      usuario.numero_documento === 0
    ) {
      addToast({
        title: "Error",
        description: "Hay campos vacíos. Por favor, complétalos todos.",
        timeout: 3000,
        color: "danger",
      });

      return;
    }

    const contieneNumeros = /\d/;

    if (contieneNumeros.test(usuario.nombre) || contieneNumeros.test(usuario.apellido)) {
      addToast({
        title: "Error",
        description: "El nombre y el apellido no deben contener números.",
        timeout: 3000,
        color: "danger",
      });

      return;
    }

    if (
      usuario.numero_documento <= 0 ||
      numeroStr.length < 7 ||
      numeroStr.length > 19
    ) {
      addToast({
        title: "Error",
        description: "El número de documento debe tener entre 6 y 19 dígitos.",
        timeout: 3000,
        color: "danger",
      });
      
      return;
    }

    try {
      await registrarUsuario(usuario);
      setUsuario({ nombre: "", apellido: "", numero_documento: 0 });

      addToast({
        title: "Éxito",
        description: "Usuario registrado con éxito.",
        timeout: 3000,
        color: "success",
      });
    } catch{

      addToast({
        title: "Error",
        description: "Hubo un problema al registrar el usuario.",
        timeout: 3000,
        color: "danger",
      });
    }
  };

  return (
    <DefaultLayout>
      <Formulario
          buttonText="Registrar Usuario"
          isSubmitting={isLoading}
          title="Registro de Usuario"
          onSubmit={handleSubmit}
      >
        <ReuInput
          label="Nombre"
          placeholder="Ingrese el nombre"
          type="text"
          value={usuario.nombre}
          onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })}
        />
        <ReuInput
          label="Apellido"
          placeholder="Ingrese el apellido"
          type="text"
          value={usuario.apellido}
          onChange={(e) => setUsuario({ ...usuario, apellido: e.target.value })}
        />
        <ReuInput
          label="Número de documento"
          placeholder="Ingrese el número de documento"
          type="number"
          value={usuario.numero_documento}
          onChange={(e) =>
            setUsuario({ ...usuario, numero_documento: Number(e.target.value) })
          }
        />

        <div className="col-span-1 md:col-span-2 flex justify-center">
          <button
            className="w-full max-w-md px-4 py-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-all duration-200 shadow-md hover:shadow-lg font-medium text-sm uppercase tracking-wide"
            type="button"
            onClick={() => navigate("/usuarios")}
          >
            Listar Usuarios
          </button>
        </div>
      </Formulario>
    </DefaultLayout>
  );
};

export default UsuariosSecondPage;
