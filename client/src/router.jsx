import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CreateListing from "./pages/CreateListing";
import ListingDetails from "./pages/ListingDetails";
import TripList from "./pages/TripList";
import WishList from "./pages/WishList";
import PropertyList from "./pages/PropertyList";
import ReservationList from "./pages/ReservationList";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/create-listing", element: <CreateListing /> },
      { path: "/listings/:listingId", element: <ListingDetails /> },
      { path: "/listings/categories/:category", element: <CategoryPage /> },
      { path: "/listings/search/:searchTerm", element: <SearchPage /> },
      { path: "/trip-list/:userId", element: <TripList /> },
      { path: "/my-wishlist/:userId", element: <WishList /> },
      { path: "/my-properties/:userId", element: <PropertyList /> },
      { path: "/reservations/:userId", element: <ReservationList /> },
    ],
  },
]);

export default router;
