import type { Status } from "../types";

// Status badge color
export const getStatusColor = (status: Status) => {
  switch (status) {
    case "DELIVERED":
      return "bg-green-100 text-green-700";
    case "IN_TRANSIT":
      return "bg-blue-100 text-blue-700";
    case "CANCELLED":
      return "bg-red-100 text-red-700";
    case "PENDING":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export const AUTH_TOKEN_STORAGE_KEY = "auth_token";
