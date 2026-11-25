
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Member 1: Landing and Sign Up
import LandingPage from "./LandingPage";
import SignUpPage from "./SignUpPage";

// Member 2: Login and Student pages
import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/StudentDashboard";
import PropertyDetails from "./pages/PropertyDetails.jsx";
import ProtectedRoute from "./components/ProtectedRoute";

// Member 3: Accommodation
import AddAccommodation from "./pages/AddAccommodation";

// Member 4: Admin pages
import AdminDashboard from "./pages/admin/adminDashboard";
import ManageAccommodation from "./pages/admin/manageAccommodation";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC PAGES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* PROTECTED STUDENT ROUTES */}
        <Route element={<ProtectedRoute allowedRoles={["student"]} />}>

          {/* Student Dashboard */}
          <Route
            path="/student/dashboard"
            element={<StudentDashboard />}
          />

          {/* Browse Accommodation */}
          <Route
            path="/properties"
            element={<StudentDashboard />}
          />

          {/* Individual Property Details */}
          <Route
            path="/properties/:id"
            element={<PropertyDetails />}
          />

        </Route>

        {/* PROTECTED ADMIN ROUTES */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>

          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/properties"
            element={<ManageAccommodation />}
          />

          <Route
            path="/admin/properties/new"
            element={<AddAccommodation />}
          />

        </Route>

        {/* UNKNOWN ROUTES */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
