import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  User,
  Clock,
  IndianRupee,
  Phone,
  Calendar,
  Star,
  Users,
} from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import {
  getPaymentWithdrawal,
  getPaymentWithdrawalsRequest,
} from "@/store/wallet";
import { PaginationComponent } from "@/components/PaginationComponent";

interface User {
  id: string;
  name: string;
  mobile: string;
  gender: string | null;
  birthDate: string | null;
  birthTime: string | null;
  birthPlace: string | null;
  latitude: number | null;
  longitude: number | null;
  imgUri: string;
  role: "USER" | "ASTROLOGER";
  walletBalance: number;
  createdAt: string;
  updatedAt: string;
  freeChatUsed: boolean;
}

interface WalletTransaction {
  id: string;
  amount: number;
  type: string;
  description: string;
  timestamp: string;
}

interface WithdrawRequest {
  id: string;
  user: User;
  walletTransaction: WalletTransaction;
  amount: number;
  isApproved: boolean;
  createdAt: string;
  approvedAt: string | null;
}

const Withdraw: React.FC = () => {
  const [withdrawals, setWithdrawals] = useState<WithdrawRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const dispatch = useAppDispatch();
  const fetchWithdrawalsRequest = async (page: number) => {
    setLoading(true);
    try {
      const payload = await dispatch(
        getPaymentWithdrawalsRequest({ page: page })
      ).unwrap();
      if (payload?.success) {
        setWithdrawals(payload?.withdraw);
        setTotalPages(payload?.totalPages);
        setCurrentPage(payload?.currentPage);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchWithdrawalsRequest(currentPage);
  }, [currentPage, dispatch]);

  const handleApprove = async (requestId: string) => {
    setProcessingId(requestId);
    try {
      const payload = await dispatch(
        getPaymentWithdrawal({ id: requestId })
      ).unwrap();
      if (payload?.success) {
        setWithdrawals((prev) =>
          prev.map((withdrawal) =>
            withdrawal.id === requestId
              ? {
                  ...withdrawal,
                  isApproved: true,
                  approvedAt: new Date().toISOString(),
                }
              : withdrawal
          )
        );
      }
    } catch (err) {
      console.log("Error approving withdrawal:", err);
    } finally {
      setProcessingId(null);
    }
  };

//   const handleReject = async (requestId: string) => {
//     setProcessingId(requestId);
//     // Simulate API call
//     setTimeout(() => {
//       setWithdrawals((prev) =>
//         prev.filter((withdrawal) => withdrawal.id !== requestId)
//       );
//       setProcessingId(null);
//     }, 1500);
//   };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getRoleIcon = (role: string) => {
    return role === "ASTROLOGER" ? (
      <Star className="w-4 h-4" />
    ) : (
      <Users className="w-4 h-4" />
    );
  };

  const getRoleBadge = (role: string) => {
    return role === "ASTROLOGER"
      ? "bg-purple-100 text-purple-800 border-purple-200"
      : "bg-blue-100 text-blue-800 border-blue-200";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-slate-200 rounded w-1/4"></div>
              {[1, 2, 3].map((i) => (
                <div key={i} className="border rounded-lg p-6 space-y-4">
                  <div className="flex space-x-4">
                    <div className="w-16 h-16 bg-slate-200 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                      <div className="h-3 bg-slate-200 rounded w-1/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-800 mb-2">
                  Withdrawal Requests
                </h1>
                <p className="text-slate-600">
                  Manage pending withdrawal requests from users and astrologers
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-slate-800">
                  {withdrawals.length}
                </div>
                <div className="text-sm text-slate-500">Pending Requests</div>
              </div>
            </div>
          </div>
        </div>

        {/* Withdrawal Requests */}
        <div className="space-y-4">
          {withdrawals.map((withdrawal) => (
            <div
              key={withdrawal.id}
              className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-200"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  {/* User Info */}
                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <img
                        src={withdrawal.user.imgUri}
                        alt={withdrawal.user.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-slate-200"
                        onError={(e) => {
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            withdrawal.user.name
                          )}&background=6366f1&color=fff`;
                        }}
                      />
                      <div
                        className={`absolute -bottom-1 -right-1 p-1 rounded-full border-2 border-white ${
                          withdrawal.user.role === "ASTROLOGER"
                            ? "bg-purple-500"
                            : "bg-blue-500"
                        }`}
                      >
                        {getRoleIcon(withdrawal.user.role)}
                        <span className="sr-only">{withdrawal.user.role}</span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-slate-800">
                          {withdrawal.user.name}
                        </h3>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full border ${getRoleBadge(
                            withdrawal.user.role
                          )}`}
                        >
                          {withdrawal.user.role}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-600">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>{withdrawal.user.mobile}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <IndianRupee className="w-4 h-4" />
                          <span>Balance: ₹{withdrawal.user.walletBalance}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(withdrawal.createdAt)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                            {withdrawal.walletTransaction.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Amount and Actions */}
                  <div className="text-right">
                    <div className="text-2xl font-bold text-slate-800 mb-2">
                      ₹{withdrawal.amount}
                    </div>
                    <div className="text-sm text-slate-500 mb-4">
                      {withdrawal.walletTransaction.description}
                    </div>

                    {withdrawal.isApproved ? (
                      <div className="flex items-center justify-end space-x-2 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">Pay</span>
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleApprove(withdrawal.id)}
                          disabled={processingId === withdrawal.id}
                          className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg font-medium transition-colors duration-200"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>
                            {processingId === withdrawal.id
                              ? "Processing..."
                              : "paid"}
                          </span>
                        </button>
                        {/* <button
                          onClick={() => handleReject(withdrawal.id)}
                          disabled={processingId === withdrawal.id}
                          className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg font-medium transition-colors duration-200"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>
                            {processingId === withdrawal.id
                              ? "Processing..."
                              : "Reject"}
                          </span>
                        </button> */}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {withdrawals.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
              <IndianRupee className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-600 mb-2">
              No withdrawal requests
            </h3>
            <p className="text-slate-500">
              All withdrawal requests have been processed.
            </p>
          </div>
        )}
      </div>
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        isLoading={loading}
      />
    </div>
  );
};

export default Withdraw;
