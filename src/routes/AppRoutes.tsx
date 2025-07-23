import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout";
import ProtectedLayout from "@/layouts/ProtectedLayout";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";
import Astrologers from "@/pages/Astrologers";
import AstrologerFormPage from "@/components/AstrologerFormPage";
import AstrologerEdit from "@/pages/AstrologerEdit";
import SearchUser from "@/pages/SearchUser";
import Banner from "@/pages/Banner";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <PublicLayout />,
    children: [{ index: true, element: <Login /> }],
  },
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/astrologers", element: <Astrologers /> },
      { path: "/astrologers-create", element: <AstrologerFormPage /> },
      { path: "/astrologers-edit/:id", element: <AstrologerEdit /> },
      { path: "/search-user", element: <SearchUser /> },
      { path: "/banner", element: <Banner /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);
