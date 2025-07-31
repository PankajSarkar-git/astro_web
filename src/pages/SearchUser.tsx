import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/store/hooks";
import { getUserByMobile, resetUserPassword } from "@/store/user";
import { getUserWalletTransactions, addBalanceToUser } from "@/store/wallet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PaginationComponent } from "@/components/PaginationComponent";
import { showToast } from "@/components/toast";
import type { User, WalletTransaction } from "@/lib/types";
import TransactionCard from "@/components/TransactionCard";

// Enhanced TypeScript interfaces
interface SearchState {
  mobile: string;
  error: string | null;
  user: User | null;
  isSearching: boolean;
}

interface TransactionState {
  transactions: WalletTransaction[];
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
}

interface BalanceState {
  amount: string;
  isAdding: boolean;
}

const SearchUser: React.FC = () => {
  const dispatch = useAppDispatch();

  // Search state
  const [searchState, setSearchState] = useState<SearchState>({
    mobile: "",
    error: null,
    user: null,
    isSearching: false,
  });

  // Transaction state
  const [transactionState, setTransactionState] = useState<TransactionState>({
    transactions: [],
    currentPage: 1,
    totalPages: 1,
    isLoading: false,
  });

  // Balance state
  const [balanceState, setBalanceState] = useState<BalanceState>({
    amount: "",
    isAdding: false,
  });

  const validateMobile = (mobile: string): boolean => {
    return /^\d{10}$/.test(mobile);
  };

  const handleSearch = async (): Promise<void> => {
    setSearchState((prev) => ({
      ...prev,
      error: null,
      user: null,
      isSearching: true,
    }));
    setTransactionState((prev) => ({
      ...prev,
      transactions: [],
      currentPage: 1,
    }));

    if (!validateMobile(searchState.mobile)) {
      setSearchState((prev) => ({
        ...prev,
        error: "Please enter a valid 10-digit mobile number.",
        isSearching: false,
      }));
      showToast.error("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      const res = await dispatch(getUserByMobile(searchState.mobile)).unwrap();
      setSearchState((prev) => ({
        ...prev,
        user: res.user,
        isSearching: false,
      }));
    } catch (err: any) {
      console.error(err);
      setSearchState((prev) => ({
        ...prev,
        error: "User not found",
        isSearching: false,
      }));
      showToast.error("User not found");
    }
  };

  const fetchWalletTransactions = async (page: number = 1): Promise<void> => {
    if (!searchState.user?.id) return;

    setTransactionState((prev) => ({ ...prev, isLoading: true }));

    try {
      const res = await dispatch(
        getUserWalletTransactions({ userId: searchState.user.id, page })
      ).unwrap();

      if (res.wallet.transactions.length === 0) {
        showToast.error("No transactions found");
      } else {
        showToast.success(res.msg);
      }

      setTransactionState({
        transactions: res.wallet.transactions || [],
        currentPage: res.currentPage || 1,
        totalPages: res.totalPages || 1,
        isLoading: false,
      });
    } catch (err: any) {
      console.error(err);
      showToast.error("Failed to fetch transactions");
      setTransactionState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleAddBalance = async (): Promise<void> => {
    if (!searchState.mobile || !balanceState.amount) {
      showToast.error("Please enter an amount");
      return;
    }

    const amount = Number(balanceState.amount);
    if (amount <= 0) {
      showToast.error("Amount must be greater than 0");
      return;
    }

    setBalanceState((prev) => ({ ...prev, isAdding: true }));

    try {
      await dispatch(
        addBalanceToUser({ mobile: searchState.mobile, amount })
      ).unwrap();

      showToast.success("Balance added successfully.");
      setBalanceState({ amount: "", isAdding: false });
      handleSearch(); // Refresh user data
    } catch (err: any) {
      console.error(err);
      showToast.error("Failed to add balance");
      setBalanceState((prev) => ({ ...prev, isAdding: false }));
    }
  };

  const handlePageChange = (newPage: number): void => {
    fetchWalletTransactions(newPage);
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const formatDateTime = (dateString: string): string => {
    return new Date(dateString).toLocaleString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleResetPassword = async (): Promise<void> => {
    if (!searchState.user?.id) return;

    try {
      const payload = await dispatch(
        resetUserPassword(searchState.user.id)
      ).unwrap();
      if (payload.success) {
        showToast.success(payload.msg);
      }
    } catch (err: any) {
      console.error(err);
      showToast.error("Failed to reset password.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            User Management
          </h1>
          <p className="text-gray-600 text-lg">
            Search and manage user accounts
          </p>
        </div>

        {/* Search Section */}
        <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
              <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
              Search User
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Enter 10-digit mobile number"
                  value={searchState.mobile}
                  onChange={(e) =>
                    setSearchState((prev) => ({
                      ...prev,
                      mobile: e.target.value,
                    }))
                  }
                  className="h-12 text-lg border-2 border-gray-200 focus:border-blue-400 rounded-xl transition-all duration-200"
                  maxLength={10}
                />
              </div>
              <Button
                onClick={handleSearch}
                disabled={searchState.isSearching}
                className="h-12 px-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl font-semibold text-white shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
              >
                {searchState.isSearching ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Searching...
                  </div>
                ) : (
                  "Search User"
                )}
              </Button>
            </div>

            {searchState.error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm font-medium">
                  {searchState.error}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* User Information */}
        {searchState.user && (
          <>
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <CardTitle className="text-2xl font-bold">
                  User Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {/* User Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {[
                    { label: "ID", value: searchState.user.id },
                    { label: "Mobile", value: searchState.user.mobile },
                    { label: "Role", value: searchState.user.role },
                    { label: "Name", value: searchState.user.name || "N/A" },
                    {
                      label: "Gender",
                      value: searchState.user.gender || "N/A",
                    },
                    {
                      label: "Birth Date",
                      value: searchState.user.birthDate || "N/A",
                    },
                    {
                      label: "Birth Time",
                      value: searchState.user.birthTime || "N/A",
                    },
                    {
                      label: "Birth Place",
                      value: searchState.user.birthPlace || "N/A",
                    },
                    {
                      label: "Latitude",
                      value: searchState.user.latitude || "N/A",
                    },
                    {
                      label: "Longitude",
                      value: searchState.user.longitude || "N/A",
                    },
                  ].map((field, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg p-4 border border-gray-100"
                    >
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        {field.label}
                      </p>
                      <p className="text-gray-900 font-semibold truncate">
                        {field.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Wallet Balance */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200 mb-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xl font-bold">₹</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Current Wallet Balance
                        </p>
                        <p className="text-3xl font-bold text-green-600">
                          {formatCurrency(searchState.user.wallet.balance ?? 0)}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => fetchWalletTransactions(1)}
                      disabled={transactionState.isLoading}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-all duration-200"
                    >
                      {transactionState.isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Loading...
                        </div>
                      ) : (
                        "View Transactions"
                      )}
                    </Button>
                  </div>
                </div>

                {/* Add Balance Section */}
                <div className="bg-purple-50 rounded-xl p-6 border border-purple-200 mb-6">
                  <h3 className="text-lg font-semibold text-purple-800 mb-4">
                    Add Balance
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <Input
                        type="number"
                        placeholder="Enter amount to add"
                        value={balanceState.amount}
                        onChange={(e) =>
                          setBalanceState((prev) => ({
                            ...prev,
                            amount: e.target.value,
                          }))
                        }
                        className="h-12 text-lg border-2 border-purple-200 focus:border-purple-400 rounded-lg"
                        min="1"
                      />
                    </div>
                    <Button
                      onClick={handleAddBalance}
                      disabled={balanceState.isAdding || !balanceState.amount}
                      className="h-12 px-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-200"
                    >
                      {balanceState.isAdding ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Adding...
                        </div>
                      ) : (
                        "Add Balance"
                      )}
                    </Button>
                  </div>
                </div>

                {/* Account Timestamps */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs font-medium text-gray-500 mb-1">
                      Created At
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      {formatDateTime(searchState.user.createdAt)}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs font-medium text-gray-500 mb-1">
                      Updated At
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      {formatDateTime(searchState.user.updatedAt)}
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button
                    onClick={handleResetPassword}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all duration-200"
                  >
                    Reset Password
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Transactions List */}
            {transactionState.transactions.length > 0 && (
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                  <CardTitle className="text-2xl font-bold">
                    Transaction History
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {transactionState.transactions.map((txn) => (
                      <div
                        key={txn.id}
                        className="transform transition-all duration-200 hover:scale-[1.01]"
                      >
                        <TransactionCard txn={txn} />
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex justify-center">
                    <PaginationComponent
                      currentPage={transactionState.currentPage}
                      totalPages={transactionState.totalPages}
                      onPageChange={handlePageChange}
                      isLoading={transactionState.isLoading}
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchUser;
