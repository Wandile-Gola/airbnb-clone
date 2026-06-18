import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WishlistProvider, useWishlist } from "./context/WishlistContext";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import HostReservationsPage from "./pages/HostReservationsPage";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ListingsPage from "./pages/ListingsPage";
import ListingDetailsPage from "./pages/ListingDetailsPage";
import AdminDashboard from "./pages/AdminDashboard";
import CreateListingPage from "./pages/CreateListingPage";
import EditListingPage from "./pages/EditListingPage";
import ReservationsPage from "./pages/ReservationsPage";
import WishlistPage from "./pages/WishlistPage";

function App() {
  return (
    <WishlistProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </WishlistProvider>
  );
}

function AppContent() {
  const { message } = useWishlist();

  return (
    <div className="app-wrapper">
      <Header />

      {message && (
        <div className="global-message">
          {message}
        </div>
      )}

      <main className="app-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/listings/:id" element={<ListingDetailsPage />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/create"
            element={
              <ProtectedRoute>
                <CreateListingPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/edit/:id"
            element={
              <ProtectedRoute>
                <EditListingPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reservations"
            element={
              <ProtectedRoute>
                <ReservationsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/host/reservations"
            element={
              <ProtectedRoute>
                <HostReservationsPage />
              </ProtectedRoute>
            }
          />
        </Routes>

      </main>

      <Footer />
    </div>
  );
}

export default App;