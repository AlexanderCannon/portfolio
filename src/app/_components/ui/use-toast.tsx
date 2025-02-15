
import { useState } from "react";

interface ToastProps {
  title: string;
  description?: string;
  variant?: "success" | "destructive";
}

export const Toast: React.FC<ToastProps> = ({ title, description, variant }) => {
  return (
    <div
      className={`${variant === "success" ? "bg-green-500" : "bg-red-500"
        } text-white p-4 rounded-lg shadow-lg`}
    >
      <strong>{title}</strong>
      {description && <p>{description}</p>}
    </div>
  );
};


export function useToast() {
  const [toast, setToast] = useState<React.ReactNode | null>(null);

  const showToast = (props: ToastProps) => {
    setToast(<Toast {...props} />);
    setTimeout(() => setToast(null), 5000);
  };

  return { toast, showToast };
}


export default useToast;