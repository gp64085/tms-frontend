import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-xl animate-in fade-in zoom-in">
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            <button
              className="p-2 transition-colors rounded-full hover:bg-gray-100"
              onClick={onClose}
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};
