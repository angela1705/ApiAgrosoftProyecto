import React from "react";
import { Input } from "@heroui/react";

interface ReusableInputProps {
  label?: string;
  placeholder?: string;
  type: string;
  variant?: "flat" | "bordered" | "underlined" | "faded";
  radius?: "full" | "lg" | "md" | "sm" | "none";
  value: string | number;
  step?: string;
  min?: string | number;
  max?: string | number;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  classname?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export const ReuInput: React.FC<ReusableInputProps> = ({
  label,
  placeholder,
  type,
  variant = "bordered",
  radius = "md",
  value,
  step,
  min,
  max,
  name,
  required,
  onChange,
}) => {
  return (
    <div className="w-full px-1 sm:px-0 mb-4">
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <Input
        type={type}
        placeholder={placeholder}
        variant={variant}
        radius={radius}
        value={value != null ? value.toString() : ""}
        onChange={onChange}
        step={step}
        min={min?.toString()}
        max={max?.toString()}
        name={name}
        required={required}
        className="text-sm sm:text-base"
      />
    </div>
  );
};
