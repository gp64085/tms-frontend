import { type FunctionComponent } from "react";
import type { Shipment, Status } from "../../types";
import { Edit, Flag, Trash2 } from "lucide-react";
import { InlineStatusEdit } from "../../components/common/InlineStatusEdit";

interface ShipmentGridProps {
  data: Shipment[];
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Status) => void;
}

const ShipmentGrid: FunctionComponent<ShipmentGridProps> = ({
  data,
  onDelete,
  onStatusChange,
}) => {
  return (
    <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
      <table className="w-full text-sm text-left text-gray-600">
        <thead className="text-sm font-semibold text-gray-500 uppercase bg-gray-5-">
          <tr>
            <th className="px-6 py-4">Tracking ID</th>
            <th className="px-6 py-4">Customer</th>
            <th className="px-6 py-4">Origin</th>
            <th className="px-6 py-4">Destination</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Created At</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {data.map((shipment) => (
            <tr
              key={shipment.id}
              className="transition-colors hover:bg-gray-50 even:bg-gray-100"
            >
              <td className="px-6 py-4">{shipment.trackingId}</td>
              <td className="px-6 py-4">{shipment.customerName}</td>
              <td className="px-6 py-4">{shipment.origin}</td>
              <td className="px-6 py-4">{shipment.destination}</td>
              <td className="px-6 py-4">
                <InlineStatusEdit
                  status={shipment.status}
                  onStatusChange={(status) =>
                    onStatusChange(shipment.id, status)
                  }
                />
              </td>
              <td className="px-6 py-4">
                {new Date(parseInt(shipment.createdAt)).toLocaleString(
                  "en-IN",
                  { dateStyle: "medium", timeStyle: "medium" }
                )}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-3 [&_button]:cursor-pointer">
                  <button
                    className={`text-gray-400 transition-colors ${
                      shipment.flagged ? "text-red-600" : ""
                    }`}
                    title={shipment.flagged ? "Unflag" : "Flag"}
                  >
                    <Flag fill={shipment.flagged ? "red" : "none"} size={18} />
                  </button>

                  <button
                    className="text-gray-400 transition-colors hover:text-green-600"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(shipment.id)}
                    className="text-gray-400 transition-colors hover:text-red-600"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShipmentGrid;
