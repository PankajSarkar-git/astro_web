



import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export function PaginationComponent({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: PaginationComponentProps) {
  const [goToPage, setGoToPage] = useState("");
  const [isChangingPage, setIsChangingPage] = useState(false);
  const lastClickedPage = useRef<number>(currentPage);
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);

  const handlePageChange = (page: number) => {
    if (
      page >= 1 &&
      page <= totalPages &&
      page !== currentPage &&
      !isChangingPage &&
      !isLoading
    ) {
      if (clickTimeout.current) clearTimeout(clickTimeout.current);
      setIsChangingPage(true);
      lastClickedPage.current = page;

      clickTimeout.current = setTimeout(() => {
        if (lastClickedPage.current === page) {
          onPageChange(page);
        }
        setIsChangingPage(false);
      }, 10);
    }
  };

  const handleGoToPage = () => {
    const pageNumber = Number(goToPage);
    if (
      !isNaN(pageNumber) &&
      pageNumber >= 1 &&
      pageNumber <= totalPages &&
      !isChangingPage &&
      !isLoading
    ) {
      handlePageChange(pageNumber);
      setGoToPage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleGoToPage();
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const showLeftEllipsis = currentPage > 4;
    const showRightEllipsis = currentPage < totalPages - 3;

    pages.push(
      <PaginationItem key={1}>
        <PaginationLink
          href="#"
          isActive={currentPage === 1}
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(1);
          }}
          className={`${
            currentPage === 1 ? "text-white bg-primary" : ""
          } ${(isChangingPage || isLoading) ? "pointer-events-none opacity-60" : ""}`}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    if (showLeftEllipsis) {
      pages.push(
        <PaginationItem key="start-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 3) endPage = Math.min(totalPages - 1, 4);
    if (currentPage >= totalPages - 2) startPage = Math.max(2, totalPages - 3);

    for (let page = startPage; page <= endPage; page++) {
      pages.push(
        <PaginationItem key={page}>
          <PaginationLink
            href="#"
            isActive={currentPage === page}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(page);
            }}
            className={`${
              currentPage === page ? "text-white bg-primary" : ""
            } ${(isChangingPage || isLoading) ? "pointer-events-none opacity-60" : ""}`}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (showRightEllipsis) {
      pages.push(
        <PaginationItem key="end-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    if (totalPages > 1) {
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            href="#"
            isActive={currentPage === totalPages}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(totalPages);
            }}
            className={`${
              currentPage === totalPages ? "text-white bg-primary" : ""
            } ${(isChangingPage || isLoading) ? "pointer-events-none opacity-60" : ""}`}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="w-full mt-4 flex flex-col gap-3 items-center sm:items-end pr-4 sm:pr-10">
      <Pagination className="w-full justify-center sm:justify-end">
        <PaginationContent className="flex flex-wrap gap-1">
          {/* Prev */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage - 1);
              }}
              className={`${
                currentPage === 1 || isChangingPage || isLoading
                  ? "pointer-events-none opacity-50"
                  : ""
              }`}
            />
          </PaginationItem>

          {/* Page Numbers: Only show on sm and up */}
          <div className="hidden sm:flex">{renderPageNumbers()}</div>

          {/* Current Page Info on Mobile */}
          <div className="sm:hidden text-sm px-2 flex items-center">
            Page {currentPage} of {totalPages}
          </div>

          {/* Next */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage + 1);
              }}
              className={`${
                currentPage === totalPages || isChangingPage || isLoading
                  ? "pointer-events-none opacity-50"
                  : ""
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* Go to Page: Only on large screens */}
      {totalPages > 25 && (
        <div className="hidden sm:flex items-center gap-2">
          <Input
            type="number"
            min={1}
            max={totalPages}
            value={goToPage}
            onChange={(e) => setGoToPage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Go to (1-${totalPages})`}
            className="w-40"
            disabled={isChangingPage || isLoading}
          />
          <Button
            onClick={handleGoToPage}
            disabled={
              !goToPage ||
              isNaN(Number(goToPage)) ||
              Number(goToPage) < 1 ||
              Number(goToPage) > totalPages ||
              isChangingPage ||
              isLoading
            }
          >
            {isChangingPage || isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                <span>Go</span>
              </div>
            ) : (
              "Go"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
