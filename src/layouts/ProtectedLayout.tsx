import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getUsers } from "@/store/user";
import { logout } from "@/store/auth";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Button } from "@/components/ui/button";

export default function ProtectedLayout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth.token);

  const fetchUsers = async () => {
    try {
      await dispatch(getUsers()).unwrap();
    } catch (error) {
      console.error("User fetch failed, logging out:", error);
      dispatch(logout());
    }
  };

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token, dispatch]);

  if (!token) return <Navigate to="/login" replace />;

  return (
    <main className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <div className="bg-white border-r border-gray-200 shadow-md">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="w-full bg-white border-b border-gray-200 p-4 shadow-sm flex items-center justify-end">
          <Button onClick={() => navigate("/astrologers-create")} variant="default">
            Add astrologer
          </Button>
        </div>
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
