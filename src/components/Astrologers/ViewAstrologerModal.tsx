import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { getUserWalletTransactions } from "@/store/wallet";
import type { Astrologer, WalletTransaction } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import TransactionCard from "../TransactionCard";
import { PaginationComponent } from "../PaginationComponent";
import { showToast } from "../toast";

export default function ViewAstrologerModal({
  astro,
  onClose,
}: {
  astro: Astrologer | null;
  onClose: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchWalletTransactions = async (page = 1) => {
    if (!astro?.user?.id) return;
    setIsLoading(true);
    try {
      const res = await dispatch(
        getUserWalletTransactions({ userId: astro.user.id, page })
      ).unwrap();
      console.log("res", res);

      if (res.wallet.transactions.length === 0) {
        showToast.error("No transactions found");
      } else {
        showToast.success(res.msg);
      }

      setTransactions(res.wallet.transactions || []);
      setCurrentPage(res.currentPage || 1);
      setTotalPages(res.totalPages || 1);
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    fetchWalletTransactions(newPage);
  };

  const closeFun = () => {
    onClose();
    setTransactions([]);
    setCurrentPage(1);
    setTotalPages(1);
  };
  
  return (
    <Dialog open={!!astro} onOpenChange={closeFun}>
      <DialogContent className="max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            Astrologer Details
          </DialogTitle>
        </DialogHeader>

        {astro && (
          <div className="space-y-4 text-sm text-gray-700">
            <div className="flex flex-col items-center">
              <img
                src={astro?.user?.imgUri || ""}
                alt="Astrologer"
                className="h-24 w-24 rounded-full object-cover border shadow mb-2"
              />
              <p className="text-lg font-medium">{astro.user?.name}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <p>
                <strong>📱 Mobile:</strong> {astro.user?.mobile}
              </p>
              <p>
                <strong>🎯 Expertise:</strong> {astro.expertise}
              </p>
              <p>
                <strong>🧭 Experience:</strong> {astro.experienceYears} years
              </p>
              <p>
                <strong>💬 Chat Price:</strong> ₹{astro.pricePerMinuteChat}/min
              </p>
              <p>
                <strong>📞 Voice Call Price:</strong> ₹
                {astro.pricePerMinuteVoice}/min
              </p>
              <p>
                <strong>🎥 Video Call Price:</strong> ₹
                {astro.pricePerMinuteVideo}/min
              </p>
            </div>
            <div className="flex justify-between items-center border-t pt-4 mt-4">
              <p>
                <strong>💰 Wallet Balance:</strong>{" "}
                <span className="text-green-600 font-semibold">
                  ₹{astro?.user?.walletBalance ?? 0}
                </span>
              </p>
              <Button
                onClick={() => fetchWalletTransactions(1)}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "View Transactions"}
              </Button>
            </div>
          </div>
        )}

        {transactions.length > 0 && (
          <Card className="mt-6 shadow">
            <CardHeader className="bg-muted px-4 py-3 rounded-t-md">
              <CardTitle className="text-base">Wallet Transactions</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-96 overflow-y-auto px-4 py-2 space-y-3">
                {transactions.map((txn) => (
                  <TransactionCard key={txn.id} txn={txn} />
                ))}
              </div>
              <div className="border-t py-2 bg-muted rounded-b-md">
                <PaginationComponent
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  isLoading={isLoading}
                />
              </div>
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
}
