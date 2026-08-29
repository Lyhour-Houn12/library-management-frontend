import { Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import AdminTest from "./pages/AdminTest";
import { Toaster } from "react-hot-toast";
import Register from "./pages/Register";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCurrentUser } from "./store/features/auth/authThunk";
import UserTest from "./pages/UserTest";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./admin/layout/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminGenrePage from "./admin/pages/genres/AdminGenrePage";
import AdminBookPage from "./admin/pages/books/AdminBookPage";

function App() {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  useEffect(() => {
    if (localStorage.getItem("jwt")) dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route index element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route element={<ProtectedRoute allowedRoles={["ROLE_ADMIN"]} />}>
          <Route element={<AdminLayout />}>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/genres" element={<AdminGenrePage />} />
            <Route path="/admin/books" element={<AdminBookPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["ROLE_USER"]} />}>
          <Route path="/user" element={<UserTest />} />
        </Route>
      </Routes>
      <Toaster
        position="top-center"
        gutter={12}
        toastOptions={{
          duration: 3500,

          style: {
            background: "var(--color-card)",
            color: "var(--color-textPrimary)",
            border: "1px solid var(--color-border)",
            borderRadius: "16px",
            padding: "14px 18px",
            fontSize: "14px",
            fontWeight: "500",
            lineHeight: "1.5",
            boxShadow:
              "0 12px 30px rgba(0, 0, 0, 0.10), 0 4px 10px rgba(0, 0, 0, 0.05)",
            maxWidth: "420px",
            minWidth: "320px",
          },

          success: {
            duration: 3000,
            style: {
              background: "var(--color-card)",
              color: "var(--color-textPrimary)",
              border:
                "1px solid color-mix(in srgb, var(--color-success) 30%, var(--color-border))",
              boxShadow: "0 12px 30px rgba(46, 213, 115, 0.12)",
            },
            iconTheme: {
              primary: "var(--color-success)",
              secondary: "var(--color-card)",
            },
          },

          error: {
            duration: 5000,
            style: {
              background: "var(--color-card)",
              color: "var(--color-textPrimary)",
              border:
                "1px solid color-mix(in srgb, var(--color-danger) 30%, var(--color-border))",
              boxShadow: "0 12px 30px rgba(255, 71, 87, 0.12)",
            },
            iconTheme: {
              primary: "var(--color-danger)",
              secondary: "var(--color-card)",
            },
          },

          loading: {
            style: {
              background: "var(--color-card)",
              color: "var(--color-textPrimary)",
              border: "1px solid var(--color-border)",
            },
          },
        }}
      />
    </>
  );
}

export default App;
