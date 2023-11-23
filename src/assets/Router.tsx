import { createBrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import LoginPage from "../components/LoginPage";
import AdminPanel from "../components/AdminPanel";
import ProtectedRoute from "../features/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/loginpage",
    element: <LoginPage />,
  },

  {
    path: "/dashboard",
    element: (
      <AdminPanel />

      //   <CookiesProvider>
      //     <ProtectedRoute>
      //       <AdminPanel />
      //     </ProtectedRoute>
      //   </CookiesProvider>
    ),
  },
]);
export default router;
