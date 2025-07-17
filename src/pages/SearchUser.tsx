import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/store/hooks";
import { getUserByMobile } from "@/store/user";
import { getUserWalletTransactions, addBalanceToUser } from "@/store/wallet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PaginationComponent } from "@/components/PaginationComponent";
import { showToast } from "@/components/toast";
import type { User, WalletTransaction } from "@/lib/types";
import TransactionCard from "@/components/TransactionCard";

const SearchUser = () => {
  const dispatch = useAppDispatch();

  const [mobile, setMobile] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [balanceAmount, setBalanceAmount] = useState("");
  const [addLoading, setAddLoading] = useState(false);

  const handleSearch = async () => {
    setError(null);
    setUser(null);
    setTransactions([]);
    setCurrentPage(1);

    if (!mobile.match(/^\d{10}$/)) {
      showToast.error("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      const res = await dispatch(getUserByMobile(mobile)).unwrap();
      setUser(res.user);
    } catch (err: any) {
      console.error(err);
    }
  };

  const fetchWalletTransactions = async (page = 1) => {
    if (!user?.id) return;

    setIsLoading(true);
    try {
      const res = await dispatch(
        getUserWalletTransactions({ userId: user.id, page })
      ).unwrap();

      setTransactions(res.wallet.transactions || []);
      setCurrentPage(res.currentPage || 1);
      setTotalPages(res.totalPages || 1);
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddBalance = async () => {
    if (!mobile || !balanceAmount) return;

    setAddLoading(true);
    try {
      await dispatch(
        addBalanceToUser({ mobile, amount: Number(balanceAmount) })
      ).unwrap();
      showToast.success("Balance added successfully.");
      handleSearch();
    } catch (err: any) {
      console.error(err);
    } finally {
      setAddLoading(false);
      setBalanceAmount("");
    }
  };

  const handlePageChange = (newPage: number) => {
    fetchWalletTransactions(newPage);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Mobile Search */}
      <div className="flex items-center gap-4">
        <Input
          placeholder="Enter 10-digit mobile number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {user && (
        <>
          {/* User Card */}
          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <p>
                  <strong>ID:</strong> {user.id}
                </p>
                <p>
                  <strong>Mobile:</strong> {user.mobile}
                </p>
                <p>
                  <strong>Role:</strong> {user.role}
                </p>
                <p>
                  <strong>Name:</strong> {user.name || "N/A"}
                </p>
                <p>
                  <strong>Gender:</strong> {user.gender || "N/A"}
                </p>
                <p>
                  <strong>Birth Date:</strong> {user.birthDate || "N/A"}
                </p>
                <p>
                  <strong>Birth Time:</strong> {user.birthTime || "N/A"}
                </p>
                <p>
                  <strong>Birth Place:</strong> {user.birthPlace || "N/A"}
                </p>
                <p>
                  <strong>Latitude:</strong> {user.latitude || "N/A"}
                </p>
                <p>
                  <strong>Longitude:</strong> {user.longitude || "N/A"}
                </p>
              </div>

              {/* Wallet & Add Balance Section */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between border-t pt-4">
                <p>
                  <strong>Wallet Balance:</strong>{" "}
                  <span className="text-green-600 font-semibold">
                    ₹{user.wallet.balance ?? 0}
                  </span>
                </p>
                <Button
                  onClick={() => fetchWalletTransactions(1)}
                  disabled={isLoading}
                  variant="default"
                >
                  {isLoading ? "Loading..." : "Get Wallet Transactions"}
                </Button>
              </div>

              {/* Add Balance */}
              <div className="flex flex-wrap gap-2 sm:gap-4 items-center">
                <Input
                  type="number"
                  placeholder="Enter amount"
                  className="w-36"
                  value={balanceAmount}
                  onChange={(e) => setBalanceAmount(e.target.value)}
                />
                <Button
                  onClick={handleAddBalance}
                  disabled={addLoading}
                  variant="default"
                >
                  {addLoading ? "Adding..." : "Add Balance"}
                </Button>
              </div>

              <div className="pt-2 text-xs text-muted-foreground">
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(user.createdAt).toLocaleString()}
                </p>
                <p>
                  <strong>Updated At:</strong>{" "}
                  {new Date(user.updatedAt).toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Transactions List */}
          {transactions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Wallet Transactions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                {transactions.map((txn) => (
                  <TransactionCard key={txn.id} txn={txn} />
                ))}

                <PaginationComponent
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  isLoading={isLoading}
                />
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default SearchUser;
