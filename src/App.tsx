import { FC } from "react";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import { Dashboard } from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecentTransactions from "./pages/Transactions/Transactions";
import { Layout } from "./components/Layout/Layout";
import TrendCharts from "./pages/TrendCharts";

const incomeData = [{ name: 'Ene', value: 4000 }, /* ... */];
const expenseData = [{ name: 'Ene', value: 3000 }, /* ... */];
const categoryData = [{ name: 'Comida', value: 1500 }, /* ... */];


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout title="Dashboard">
        <Dashboard />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/transactions",
    element: (
      <ProtectedRoute>
        <Layout title="Transacciones">
          <RecentTransactions />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/reports",
    element: (
      <ProtectedRoute>
        <Layout title="Reports">
        <TrendCharts incomeData={incomeData} expenseData={expenseData} categoryData={categoryData} />
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
