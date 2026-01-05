export type Status = "PENDING" | "IN_TRANSIT" | "DELIVERED" | "CANCELLED";

export interface Shipment {
  id: string;
  trackingId: string;
  customerName: string;
  origin: string;
  destination: string;
  status: Status;
  flagged: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ViewMode = "grid" | "tile";
