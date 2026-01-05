import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
  type FunctionComponent,
} from "react";
import type { Shipment } from "../types";
import { Modal } from "../components/common/Modal";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";

export type AddShipmentFormData = Pick<
  Shipment,
  "trackingId" | "customerName" | "origin" | "destination"
>;

interface AddShipmentModalProps {
  isOpen: boolean;
  onSubmit: (data: AddShipmentFormData) => void;
  onClose: () => void;
  error?: string;
  isLoading: boolean;
}

const AddShipmentModal: FunctionComponent<AddShipmentModalProps> = ({
  isOpen,
  onSubmit,
  onClose,
  error,
  isLoading,
}) => {
  const [formData, setFormData] = useState<AddShipmentFormData>({
    trackingId: "",
    customerName: "",
    origin: "",
    destination: "",
  });

  const resetForm = () =>
    setFormData({
      trackingId: "",
      customerName: "",
      origin: "",
      destination: "",
    });

  useEffect(() => {
    return () => resetForm();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        resetForm();
        onClose();
      }}
      title="New Shipment"
    >
      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {error && (
          <div className="p-3 text-sm text-red-600 rounded bg-red-50">
            Error: {error}
          </div>
        )}

        <Input
          type="text"
          label="Tracking ID"
          required
          name="trackingId"
          placeholder="e.g. TRK-998877"
          value={formData.trackingId}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          label="Customer"
          required
          name="customerName"
          placeholder="e.g. Global Tech Industries"
          value={formData.customerName}
          onChange={handleInputChange}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="text"
            label="Origin"
            required
            placeholder="City"
            name="origin"
            value={formData.origin}
            onChange={handleInputChange}
          />

          <Input
            type="text"
            label="Destination"
            required
            placeholder="City"
            name="destination"
            value={formData.destination}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex justify-center gap-3 pt-4 [&_button]:cursor-pointer">
          <Button type="submit" loading={isLoading}>
            Create Shipment
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddShipmentModal;
