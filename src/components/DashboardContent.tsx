import type { FunctionComponent } from "react";
import type { Shipment, ViewMode, Status } from "../types";
import ShipmentTile from "../features/shipments/ShipmentTile";
import ShipmentGrid from "../features/shipments/ShipmentGrid";

interface DashboardContentProps {
  items: Shipment[];
  viewMode: ViewMode;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Status) => void;
}

export const DashboardContent: FunctionComponent<DashboardContentProps> = ({
  items,
  viewMode,
  onDelete,
  onStatusChange,
}) => (
  <div className="flex-1 overflow-auto">
    {items.length === 0 ? (
      <div className="py-20 text-center text-gray-400">No shipments found.</div>
    ) : viewMode === "tile" ? (
      <div className="grid grid-cols-1 gap-4 pb-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((shipment) => (
          <ShipmentTile
            key={shipment.id}
            data={shipment}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>
    ) : (
      <ShipmentGrid
        data={items}
        onDelete={onDelete}
        onStatusChange={onStatusChange}
      />
    )}
  </div>
);
