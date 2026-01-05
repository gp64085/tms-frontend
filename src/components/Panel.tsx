import type { FunctionComponent, ReactNode } from "react";

interface PanelProps {
  children: ReactNode;
  className?: string;
}

export const Panel: FunctionComponent<PanelProps> = ({ children, className }) => {
  return (
    <div className={`absolute right-0 z-10 w-32 py-1 mt-2 bg-white border rounded shadow-lg ${className}`}>
      {children}
    </div>
  );
};
