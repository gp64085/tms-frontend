import { Edit2, Trash } from "lucide-react";
import { Panel } from "./Panel";
import type { FunctionComponent } from "react";

interface ShipmentMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const ShipmentMenu: FunctionComponent<ShipmentMenuProps> = ({
  onDelete,
  onEdit,
}) => {
  return (
    <Panel className="[&_button]:cursor-pointer">
      <button
        type="button"
        className="flex items-center w-full px-4 py-2 text-sm text-left text-blue-700 hover:bg-gray-50"
      >
        <Edit2 size={16} className="mr-2 text-blue-400" onClick={onEdit} />
        Edit
      </button>
      <button
        type="button"
        className="flex items-center w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50"
      >
        <Trash size={16} className="mr-2 text-red-400" onClick={onDelete} />{" "}
        Delete
      </button>
    </Panel>
  );
};
