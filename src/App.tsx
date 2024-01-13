import { FC } from "react";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import { Dashboard } from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecentTransactions from "./pages/RecentTransactions";
import { Layout } from "./components/Layout/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout>
        <Dashboard />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/transactions",
    element: (
      <ProtectedRoute>
        <Layout>
          <RecentTransactions />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

const App: FC = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
