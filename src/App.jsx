import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/auth/login-page";
import DashboardPage from "./pages/dashboard/dashboard-page";
import TripsPage from "./pages/trips/trips-page";
import AddTripPage from "./pages/trips/add-trip-page";
import EditTripPage from "./pages/trips/edit-trip-page";

import ProtectedRoute from "./components/protected-route/protected-route";
import DashboardLayout from "./layouts/dashboard-layout";
import CompaniesPage from "./pages/companies/companies-page";
import CitiesPage from "./pages/cities/cities-page";
import BookingsPage from "./pages/bookings/bookings-page";
import BookingDetailsPage from "./pages/bookings/booking-details-page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />

            <Route path="/trips" element={<TripsPage />} />

            <Route path="/trips/new" element={<AddTripPage />} />

            <Route path="/trips/:id/edit" element={<EditTripPage />} />

            <Route path="/companies" element={<CompaniesPage />} />

            <Route path="/cities" element={<CitiesPage />} />

            <Route path="/bookings" element={<BookingsPage />} />

            <Route path="/bookings/:id" element={<BookingDetailsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
