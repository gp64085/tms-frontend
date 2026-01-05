import { useState, type FunctionComponent } from "react";
import type { Shipment, Status } from "../../types";
import { MapPin, MoreVertical, Package } from "lucide-react";
import { ShipmentMenu } from "../../components/ShipmentMenu";
import { ShipmentDetails } from "./ShipmentDetails";
import { InlineStatusEdit } from "../../components/common/InlineStatusEdit";

interface ShipmentTileProps {
  data: Shipment;
  onStatusChange: (id: string, status: Status) => void;
}

const ShipmentTile: FunctionComponent<ShipmentTileProps> = ({
  data,
  onStatusChange,
}) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isExpanded, setExpanded] = useState(false);

  return (
    <>
      <div className="relative p-4 transition-shadow bg-white border border-gray-100 shadow-sm cursor-pointer rounded-xl hover:shadow-md">
        <div className="flex items-start justify-between mb-3">
          <div>
            <InlineStatusEdit
              status={data.status}
              onStatusChange={(status) => onStatusChange(data.id, status)}
              size="sm"
            />
            <h3
              className="mt-2 font-bold text-gray-800 hover:text-blue-500"
              onClick={() => setExpanded(true)}
            >
              {data.trackingId}
            </h3>
          </div>
          <div className="relative">
            <button
              className="p-2 text-gray-500 rounded-full cursor-pointer hover:bg-gray-100"
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(!isMenuOpen);
              }}
            >
              <MoreVertical size={12} />
            </button>

            {isMenuOpen && (
              <ShipmentMenu onDelete={() => {}} onEdit={() => {}} />
            )}
          </div>
        </div>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Package size={16} className="text-gray-400" />
            <span>{data.customerName}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-gray-400" />
            <span className="truncate">
              {data.origin} ➡️ {data.destination}
            </span>
          </div>
        </div>
      </div>

      {/* Shipment details modal */}
      {isExpanded && (
        <ShipmentDetails data={data} onClose={() => setExpanded(false)} />
      )}
    </>
  );
};

export default ShipmentTile;
