import React, { FormEvent } from "react";

interface FormContainerProps {
  title: string;
  children: React.ReactNode;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  className?: string;
  buttonText?: string;
  isSubmitting?: boolean;
}

const Formulario: React.FC<FormContainerProps> = ({
  title,
  children,
  onSubmit,
  className = "",
  buttonText = "Guardar",
  isSubmitting = false,
}) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) onSubmit(e);
  };

  return (
    <div
      className={`flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 ${className}`}
    >
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-500 hover:shadow-2xl border border-gray-200">
        <h1
          id="form-title"
          className="text-center text-2xl md:text-3xl font-semibold text-gray-900 mb-8 tracking-tight"
        >
          {title}
        </h1>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
          aria-labelledby="form-title"
        >
          {children}
          <div className="col-span-1 md:col-span-2 flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full max-w-md px-4 py-3 rounded-lg text-white font-medium text-sm uppercase tracking-wide transition-all duration-200 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 shadow-md hover:shadow-lg"
              }`}
            >
              {isSubmitting ? "Procesando..." : buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Formulario;