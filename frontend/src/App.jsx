import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/admin/adminDashboard";
import ManageAccommodation from "./pages/admin/manageAccommodation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route
          path="/admin/properties"
          element={<ManageAccommodation />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;