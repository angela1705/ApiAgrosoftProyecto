import { addToast } from "@heroui/react";

interface ToastOptions {
  title: string;
  description?: string;
  timeout?: number;
  hideIcon?: boolean;
}

export const Toast = ({ title, description, timeout = 3000, hideIcon = false }: ToastOptions) => {
  addToast({
    title,
    description,
    timeout,
    hideIcon,
  });
};
