import { BrowserRouter, Route, Routes } from "react-router-dom";

// Layouts
import AppLayout from "./layout/AppLayout";
import AuthLayout from "./layout/AuthLayout";

// Pages
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import MedalTable from "./pages/MedalsTable";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <AuthLayout>
              <Home />
            </AuthLayout>
          }
        />

        <Route
          path="/country-dashboard"
          element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          }
        />
        <Route
          path="/medals"
          element={
            <AppLayout>
              <MedalTable />
            </AppLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
