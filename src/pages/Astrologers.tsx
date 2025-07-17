import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { deleteAstrologer, getAstrologers } from "@/store/astrologers";
import AstrologerTable from "@/components/Astrologers/AstrologerTable";
import ViewAstrologerModal from "@/components/Astrologers/ViewAstrologerModal";
import DeleteAstrologerModal from "@/components/Astrologers/DeleteAstrologerModal";
import { PaginationComponent } from "@/components/PaginationComponent";
import { showToast } from "@/components/toast";

export default function AstrologersPage() {
  const dispatch = useAppDispatch();

  const [astrologers, setAstrologers] = useState<any[]>([]);
  const [viewAstro, setViewAstro] = useState<any>(null);
  const [deleteAstro, setDeleteAstro] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAstros = async (page = 1) => {
    try {
      setIsLoading(true);
      const result = await dispatch(getAstrologers(page)).unwrap();
      setAstrologers(result.astrologers);
      setTotalPages(result.totalPages);
      setCurrentPage(result.currentPage);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAstros(currentPage);
  }, [dispatch, currentPage]);

  const handleDelete = async () => {
    try {
      await dispatch(deleteAstrologer(deleteAstro.id)).unwrap();
      showToast.success("Deleted successfully");
      setDeleteAstro(null);
      fetchAstros(currentPage);
    } catch (error) {
      showToast.error("Failed to delete");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Astrologers</h2>

      <AstrologerTable
        astrologers={astrologers}
        onView={setViewAstro}
        onDelete={setDeleteAstro}
      />

      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        isLoading={isLoading}
      />

      <ViewAstrologerModal
        astro={viewAstro}
        onClose={() => setViewAstro(null)}
      />

      <DeleteAstrologerModal
        astro={deleteAstro}
        onCancel={() => setDeleteAstro(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
