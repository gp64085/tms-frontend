import type { FunctionComponent } from "react";
import type { Shipment } from "../../types";
import { getStatusColor } from "../../constants";
import { X } from "lucide-react";

interface ShipmentDetailsProps {
  data: Shipment;
  onClose: () => void;
}

export const ShipmentDetails: FunctionComponent<ShipmentDetailsProps> = ({
  data,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="w-full max-w-lg overflow-hidden duration-200 bg-white shadow-2xl rounded-2xl animate-in fade-in zoom-in">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300 bg-gray-50">
          <div>
            <h2 className="text-xl font-bold">Shipment Details</h2>
            <p className="text-sm text-gray-500">{data.trackingId}</p>
          </div>
          <button
            className="p-2 rounded-full cursor-pointer hover:bg-gray-200"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mr-2 text-xs font-bold text-gray-400 uppercase">
                Customer
              </label>
              <p className="inline-block font-medium">{data.customerName}</p>
            </div>
            <div>
              <label className="mr-2 text-xs font-bold text-gray-400 uppercase">
                Status
              </label>
              <p
                className={`inline-block px-2 py-0.5 rounded text-sm font-semibold ${getStatusColor(
                  data.status
                )}`}
              >
                {data.status?.replace("_", " ")}
              </p>
            </div>
            <div className="col-span-2">
              <label className="text-sm font-bold text-gray-400 uppercase">
                Route
              </label>
              <div className="flex items-center gap-4 mt-1">
                <div className="px-3 py-2 border rounded bg-gray-50">
                  {data.origin}
                </div>
                <span className="text-gray-400">➡️</span>
                <div className="px-3 py-2 border rounded bg-gray-50">
                  {data.destination}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 p-4 border-t border-gray-300 bg-gray-50 [&_button]:cursor-pointer">
          <button
            className="px-4 py-2 text-sm font-medium text-gray-500 transition-colors rounded-md hover:bg-gray-100"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
