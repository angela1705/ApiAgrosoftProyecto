import ReuModal from "../globales/ReuModal";
import { ReuInput } from "../globales/ReuInput";
import { useRegistrarPlaga } from "@/hooks/cultivo/useplaga";
import { useTipoPlagas } from "@/hooks/cultivo/usetipoplaga";
import { Plaga } from "@/types/cultivo/Plaga";
import { useState, ChangeEvent } from "react";

interface ModalPlagaProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
  }


  export const ModalPlaga = ({ isOpen, onOpenChange, onSuccess }: ModalPlagaProps) => {
    const [nuevaPlaga, setNuevaPlaga] = useState<Plaga>({
        fk_tipo_plaga: 0,
        nombre: "",
        descripcion: "",
        img: null,
    });
  
    const { data: tiposPlaga } = useTipoPlagas();
    const registrarPlaga = useRegistrarPlaga();

   
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        setNuevaPlaga((prev) => ({ ...prev, img: e.target.files![0] }));
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setNuevaPlaga(prev => ({
        ...prev,
        [name]: name === "nombre" ? value : Number(value)
      }));
    };
  
 
    const handleSubmit = () => {
      registrarPlaga.mutate(nuevaPlaga, {
        onSuccess: () => {
          onOpenChange(false);
          setNuevaPlaga({
            fk_tipo_plaga: 0,
            nombre: "",
            descripcion: "",
            img: null,
          });
          onSuccess?.();
        }
      });
    };


    return (
          <ReuModal
            title="Registrar Plaga"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onConfirm={handleSubmit}
            confirmText="Guardar"
            cancelText="Cancelar"
            >

          <ReuInput
            label="Nombre"
            placeholder="Ingrese el nombre"
            type="text"
            value={nuevaPlaga.nombre}
            onChange={(e) => setNuevaPlaga({ ...nuevaPlaga, nombre: e.target.value })}
          />

          <ReuInput
            label="Descripción"
            placeholder="Ingrese la descripción"
            type="text"
            value={nuevaPlaga.descripcion}
            onChange={(e) => setNuevaPlaga({ ...nuevaPlaga, descripcion: e.target.value })}
          />

          <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Imagen</label>
            <input
              type="file"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="imagen"
              onChange={handleFileChange}
              accept="image/*"
            />
            
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Tipo de Plaga</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={nuevaPlaga.fk_tipo_plaga}
              onChange={handleChange}
            >
              <option value="">Seleccione un tipo de plaga</option>
            
              {tiposPlaga?.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
              ))} 
            </select>
          </div>

              
          </ReuModal>    

    )} 