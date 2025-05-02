import { Spinner } from "@heroui/react";

interface CustomSpinnerProps {
  label: string;
  variant: "default" | "simple" | "gradient" | "spinner" | "wave" | "dots";
  size?: 'lg' | 'sm' | 'md'
  className?: string; // opcional para personalización adicional
}

export default function CustomSpinner({ label, variant, className }: CustomSpinnerProps) {
  return (
    <Spinner
      label={label}
      variant={variant}
      className={className}
      classNames={{ label: "text-foreground mt-4" }}
    />
  );
}
