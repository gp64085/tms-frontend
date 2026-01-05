// src/components/common/InlineStatusEditor.tsx
import { useState } from "react";
import type { Status } from "../../types";
import { StatusBadge } from "./StatusBadge";

interface InlineStatusEditorProps {
  status: Status;
  onStatusChange: (status: Status) => void;
  size?: "sm" | "md";
}

export const InlineStatusEdit = ({ 
  status, 
  onStatusChange, 
  size = "md" 
}: InlineStatusEditorProps) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const statusOptions: Status[] = ["PENDING", "IN_TRANSIT", "DELIVERED", "CANCELLED"];
  
  const handleStatusChange = (newStatus: Status) => {
    onStatusChange(newStatus);
    setIsEditing(false);
  };

  const selectClasses = size === "sm" 
    ? "px-2 py-1 text-xs border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    : "px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500";

  if (isEditing) {
    return (
      <select
        value={status}
        onChange={(e) => handleStatusChange(e.target.value as Status)}
        onBlur={() => setIsEditing(false)}
        className={selectClasses}
        autoFocus
      >
        {statusOptions.map((option) => (
          <option key={option} value={option}>
            {option.replace("_", " ")}
          </option>
        ))}
      </select>
    );
  }

  return (
    <StatusBadge
      status={status}
      className="cursor-pointer hover:opacity-80"
      onClick={() => setIsEditing(true)}
      title="Click to change status"
    />
  );
};
