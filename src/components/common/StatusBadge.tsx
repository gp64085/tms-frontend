// src/components/common/StatusBadge.tsx
import { getStatusColor } from "../../constants";
import type { Status } from "../../types";

interface StatusBadgeProps {
  status: Status;
  className?: string;
  onClick?: () => void;
  title?: string;
}

export const StatusBadge = ({
  status,
  className = "",
  onClick,
  title,
}: StatusBadgeProps) => (
  <span
    className={`px-2 py-1 rounded-full text-sm font-bold ${getStatusColor(
      status
    )} ${className}`}
    onClick={onClick}
    title={title}
  >
    {status.replace("_", " ")}
  </span>
);
