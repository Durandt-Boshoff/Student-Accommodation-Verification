
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

        {/* LANDING PAGE */}
        <Route path="/" element={<LandingPage />} />

        {/* AUTHENTICATION */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* PROTECTED STUDENT ROUTES */}
        <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
          <Route
            path="/student/dashboard"
            element={<StudentDashboard />}
          />

          <Route
            path="/properties/:id"
            element={<PropertyDetails />}
          />
        </Route>

        {/* ADMIN: DASHBOARD */}
        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        {/* ADMIN: MANAGE ACCOMMODATION */}
        <Route
          path="/admin/properties"
          element={<ManageAccommodation />}
        />

        {/* ADMIN: ADD ACCOMMODATION */}
        <Route
          path="/admin/properties/new"
          element={<AddAccommodation />}
        />

        {/* UNKNOWN ROUTES */}
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
