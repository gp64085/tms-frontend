import { createBrowserRouter } from "react-router-dom";
import { AuthGuard } from "../guards/AuthGuard";
import { GuestGuard } from "../guards/GuestGuard";
import MainLayout from "../components/layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Placeholder from "../pages/Placeholder";
import SignUp from "../pages/Signup";

export const router = createBrowserRouter([
  // --- GUEST ROUTES (Public) ---
  {
    element: <GuestGuard />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },

  // --- AUTH ROUTES ---
  {
    element: <AuthGuard />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
            index: true,
          },
          {
            path: "shipments",
            element: <Dashboard />,
          },
          {
            path: "drivers",
            element: <Placeholder title="Drivers" />,
          },
          {
            path: "shipments/history",
            element: <Placeholder title="History" />,
          },
          {
            path: "shipments/active",
            element: <Placeholder title="Active Loads" />,
          },
          {
            path: "settings",
            element: <Placeholder title="Settings" />,
          },
        ],
      },
    ],
  },
]);
