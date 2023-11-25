import { createBrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import LoginPage from "../components/LoginPage";
import AdminPanel from "../components/AdminPanel";
import ProtectedRoute from "../features/ProtectedRoute";
import ClientPanel from "../components/Client";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },

  {
    path: "/dashboard",
    element: (
      <CookiesProvider>
        <ProtectedRoute>
          <AdminPanel />
        </ProtectedRoute>
      </CookiesProvider>
    ),
  },
  {
    path: "/client",
    element: <ClientPanel />,
  },
]);
export default router;
