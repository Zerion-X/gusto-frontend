import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "../pages/RootLayout";
import ErrorPage from "../pages/ErrorPage";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Welcome from "../pages/Welcome";
import Home from "../pages/Home";
import UserManagement from "../pages/UserManagement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="/welcome" /> },
      { path: "welcome", element: <Welcome /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "home", element: <Home /> },
      //{ path: "refrigerator", element: <Refrigerator />},
      //{ path: "foodList", element: <FoodList />},
      { path: "profile/:username", element: <UserManagement />},
    ],
  },
]);

export default router;
