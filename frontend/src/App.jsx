
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

// Member 3: Accommodation
import AddAccommodation from "./pages/AddAccommodation";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LANDING PAGE */}
        <Route path="/" element={<LandingPage />} />

        {/* AUTHENTICATION */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* STUDENT DASHBOARD */}
        <Route
          path="/student/dashboard"
          element={<StudentDashboard />}
        />

        {/* PROPERTY DETAILS */}
        <Route
          path="/properties/:id"
          element={<PropertyDetails />}
        />

        {/* ADMIN: ADD ACCOMMODATION */}
        <Route
          path="/admin/properties/new"
          element={<AddAccommodation />}
        />

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
