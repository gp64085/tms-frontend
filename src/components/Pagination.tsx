import { ChevronLeft, ChevronRight } from "lucide-react";
import type { FunctionComponent } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

export const Pagination: FunctionComponent<PaginationProps> = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}) => (
  <div className="sticky bottom-0 flex items-center justify-between p-4 pt-4 mt-4 bg-white border-t">
    <span className="text-sm text-gray-500">
      Page <span className="font-bold text-gray-900">{currentPage}</span> of{" "}
      {totalPages}
    </span>
    <div className="flex gap-2">
      <button
        className="flex items-center px-3 py-1 text-sm rounded hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
        onClick={onPrevious}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={18} className="mr-1" /> Previous
      </button>
      <button
        className="flex items-center px-3 py-1 text-sm rounded hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
        onClick={onNext}
        disabled={currentPage >= totalPages}
      >
        Next <ChevronRight size={18} className="ml-1" />
      </button>
    </div>
  </div>
);
