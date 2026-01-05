import { useMutation, useQuery } from "@apollo/client/react";
import { useState } from "react";
import type { Shipment, Status, ViewMode } from "../types";
import {
  ADD_SHIPMENT,
  DELETE_SHIPMENT,
  UPDATE_SHIPMENT_STATUS,
} from "../graphql/mutation";
import { DashboardHeader } from "../components/DashboardHeader";
import { Pagination } from "../components/Pagination";
import { DashboardContent } from "../components/DashboardContent";
import { GET_SHIPMENTS } from "../graphql/query";
import AddShipmentModal, {
  type AddShipmentFormData,
} from "../features/AddShipmentModal";

interface ShipmentsResponse {
  listShipments: {
    items: Shipment[];
    totalCount: number;
    hasMore: boolean;
  };
}

interface DeleteShipmentResponse {
  deleteShipmentById: boolean;
}

export default function Dashboard() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [page, setPage] = useState(1);
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const pageSize = 10;

  const { loading, error, data } = useQuery<ShipmentsResponse>(GET_SHIPMENTS, {
    variables: {
      page,
      limit: pageSize,
    },
    fetchPolicy: "cache-and-network",
  });

  const [
    addShipment,
    { error: addShipmentError, loading: addShipmentLoading },
  ] = useMutation(ADD_SHIPMENT, {
    refetchQueries: [
      { query: GET_SHIPMENTS, variables: { page: 1, limit: pageSize } },
    ],
    onCompleted: () => {
      setAddModalOpen(false);
    },
  });

  const [deleteShipment] = useMutation<DeleteShipmentResponse, { id: string }>(
    DELETE_SHIPMENT,
    {
      update: (cache, { data }, { variables }) => {
        if (!data?.deleteShipmentById || !variables?.id) {
          return;
        }

        const existingShipments = cache.readQuery<ShipmentsResponse>({
          query: GET_SHIPMENTS,
          variables: { page, limit: pageSize },
        });

        if (existingShipments) {
          cache.writeQuery<ShipmentsResponse>({
            query: GET_SHIPMENTS,
            variables: { page, limit: pageSize },
            data: {
              listShipments: {
                ...existingShipments.listShipments,
                items: existingShipments.listShipments.items.filter(
                  (shipment) => shipment.id !== variables.id
                ),
                totalCount: existingShipments.listShipments.totalCount - 1,
              },
            },
          });
        }
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );

  const [updateShipmentStatus] = useMutation(UPDATE_SHIPMENT_STATUS, {
    refetchQueries: [
      { query: GET_SHIPMENTS, variables: { page, limit: pageSize } },
    ],
  });

  const { items = [], totalCount = 0 } = data?.listShipments ?? {};
  const totalPages = Math.ceil(totalCount / pageSize);

  if (loading) {
    return (
      <div className="flex justify-center p-10 text-gray-500">
        Loading Shipments...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center p-10 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this shipment?")) {
      await deleteShipment({ variables: { id } });
    }
  };

  const handleStatusChange = async (id: string, status: Status) => {
    await updateShipmentStatus({ variables: { id, status } });
  };

  const handleAddShipment = async (shipment: AddShipmentFormData) => {
    await addShipment({ variables: shipment });
    setAddModalOpen(false);
  };

  return (
    <div className="flex flex-col h-full">
      <DashboardHeader
        totalCount={totalCount}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onAddClick={() => setAddModalOpen(true)}
      />

      <DashboardContent
        items={items}
        viewMode={viewMode}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPrevious={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => (p < totalPages ? p + 1 : p))}
      />

      <AddShipmentModal
        error={addShipmentError?.message}
        isOpen={isAddModalOpen}
        onSubmit={handleAddShipment}
        onClose={() => setAddModalOpen(false)}
        isLoading={addShipmentLoading}
      />
    </div>
  );
}
