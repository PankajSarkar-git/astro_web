import { useAppSelector } from "@/store/hooks";
import { Navigate, Outlet } from "react-router-dom";


export default function PublicLayout() {
  const isAuth = useAppSelector((state) => !!state.auth.token);
  if (isAuth) return <Navigate to="/dashboard" replace />;

  return (
    <main>
      <Outlet />
    </main>
  );
}
