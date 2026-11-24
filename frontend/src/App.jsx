
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/StudentDashboard";
import PropertyDetails from "./pages/PropertyDetails.jsx";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN PAGE */}
        <Route path="/" element={<LoginPage />} />
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
