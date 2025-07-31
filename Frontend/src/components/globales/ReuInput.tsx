import React from "react";
import { Input } from "@heroui/react";

interface ReusableInputProps {
  label?: string;
  placeholder?: string;
  type: string;
  variant?: "flat" | "bordered" | "underlined" | "faded";
  radius?: "full" | "lg" | "md" | "sm" | "none";
  value: string | number | null | undefined;
  step?: string;
  min?: string | number;
  max?: string | number;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export const ReuInput: React.FC<ReusableInputProps> = ({
  label,
  placeholder,
  type,
  variant = "bordered",
  radius = "lg",
  value,
  step,
  min,
  max,
  name,
  required,
  disabled,
  className,
  onChange,
}) => {
  return (
    <div className="w-full px-1 sm:px-0 mb-4">
      <Input
        label={label}
        placeholder={placeholder}
        type={type}
        variant={variant}
        radius={radius}
        value={value != null ? value.toString() : ""}
        onChange={onChange}
        step={step}
        min={min?.toString()}
        max={max?.toString()}
        name={name}
        required={required}
        disabled={disabled}
        labelPlacement="outside-top"
        classNames={{
          base: "w-full",
          inputWrapper: "focus-within:border-2 focus-within:border-black",
          input: `${className} text-sm sm:text-base outline-none`,
        }}
      />
    </div>
  );
};