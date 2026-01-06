import { Truck } from "lucide-react";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50 bg-linear-to-b from-blue-100 to-white">
      <div className="w-full max-w-sm p-8 bg-white shadow-lg rounded-xl">
        <div className="flex justify-center mb-2 text-blue-600">
          <Truck size={48} />
        </div>
        <h1 className="mb-2 text-2xl font-bold text-center text-gray-700">
          {title}
        </h1>
        {subtitle && (
          <p className="mb-6 text-sm text-center text-gray-500">{subtitle}</p>
        )}
        {children}
      </div>
    </div>
  );
};
