import React from "react";
import { InputHTMLAttributes } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface ReuInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  showPasswordToggle?: boolean;
  isPasswordVisible?: boolean;
  onTogglePassword?: () => void;
}

export const ReuInput: React.FC<ReuInputProps> = ({
  label,
  showPasswordToggle = false,
  isPasswordVisible = false,
  onTogglePassword,
  ...props
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white transition-all duration-300"
          {...props}
        />
        {showPasswordToggle && (
          <InputAdornment  className="absolute right-2 top-1/2 transform -translate-y-1/2" position="end">
            <IconButton
              aria-label="toggle password visibility"
              className="p-1"
              edge="end"
              onClick={onTogglePassword}
            >
              {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )}
      </div>
    </div>
  );
};