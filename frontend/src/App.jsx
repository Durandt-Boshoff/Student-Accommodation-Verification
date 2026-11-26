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

// Public Information Pages
import HowItWorksPage from "./pages/HowItWorksPage";
import ContactUsPage from "./pages/ContactUsPage";
import AboutUsPage from "./pages/AboutUsPage";

// Member 3: Accommodation
import AddAccommodation from "./pages/AddAccommodation";

// Member 4: Admin pages
import AdminDashboard from "./pages/admin/adminDashboard";
import ManageAccommodation from "./pages/admin/manageAccommodation";

import TermsAndConditions from "./pages/TermsAndConditions.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC PAGES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* PUBLIC INFORMATION PAGES */}
        <Route
          path="/how-it-works"
          element={<HowItWorksPage />}
        />

        <Route
          path="/contact"
          element={<ContactUsPage />}
        />

        <Route
          path="/about"
          element={<AboutUsPage />}
        />

        {/* PROTECTED STUDENT ROUTES */}
        <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
          <Route
            path="/student/dashboard"
            element={<StudentDashboard />}
          />

          <Route
            path="/properties"
            element={<StudentDashboard />}
          />

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

        <Route
          path="/terms-of-service"
          element={<TermsAndConditions />}
        />

        <Route
          path="/privacy-policy"
          element={<PrivacyPolicy />}
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
