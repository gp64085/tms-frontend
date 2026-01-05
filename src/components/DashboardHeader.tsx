import type { FunctionComponent } from "react";
import type { ViewMode } from "../types";
import { List, LayoutGrid, Plus } from "lucide-react";

interface DashboardHeaderProps {
  totalCount: number;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onAddClick: () => void;
}

export const DashboardHeader: FunctionComponent<DashboardHeaderProps> = ({
  totalCount,
  viewMode,
  onViewModeChange,
  onAddClick,
}) => (
  <div className="flex flex-row items-center justify-between gap-4 mb-6 md:flex-row">
    <div>
      <h4 className="text-xl font-bold text-gray-600">
        Manage your ongoing logistics ({totalCount})
      </h4>
    </div>
    <div className="flex gap-3">
      <div className="flex p-1 bg-white border rounded-lg shadow-sm [&_button]:cursor-pointer">
        <button
          className={`flex items-center gap-2 p-2 text-sm rounded ${
            viewMode === "grid"
              ? "bg-blue-50 text-blue-600 font-medium"
              : "text-gray-500 hover:bg-gray-50"
          }`}
          onClick={() => onViewModeChange("grid")}
        >
          <List size={18} /> List
        </button>
        <button
          className={`flex items-center gap-2 p-2 text-sm rounded ${
            viewMode === "tile"
              ? "bg-blue-50 text-blue-600 font-medium"
              : "text-gray-500 hover:bg-gray-50"
          }`}
          onClick={() => onViewModeChange("tile")}
        >
          <LayoutGrid size={18} /> Tile
        </button>
      </div>
      <button
        className="flex items-center justify-center gap-2 px-4 py-2 text-gray-500 bg-white border rounded cursor-pointer hover:bg-gray-50"
        onClick={onAddClick}
      >
        <Plus size={20} /> Add
      </button>
    </div>
  </div>
);
