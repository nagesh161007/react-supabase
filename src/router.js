import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/Login/Login";
import SignupPage from "./pages/Signup/Signup";
import HomePage from "./pages/Home/Home";
import ProfilePage from "./pages/Profile/Profile";
import ListingItem from "./pages/ListingItem/ListingItem";
import Listing from "./pages/Listing/Listing";
import AppLayout from "./layout/Layout";
import ProtectedRoute from "./hoc/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "profile", element: <ProfilePage /> },
          { path: "listing/:listingId", element: <ListingItem /> },
          { path: "listing", element: <Listing /> }
        ]
      },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> }
    ]
  }
]);

export default router;
