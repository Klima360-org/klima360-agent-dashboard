// src/App.tsx
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { DataProvider } from "./contexts/DataContext";
import { Analytics } from "./pages/Analytics";
import { ClimateScoring } from "./pages/ClimateScoring";
import { Dashboard } from "./pages/Dashboard";
import { FarmerRegister } from "./pages/FarmerRegister";
import { FarmersList } from "./pages/FarmersList";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import NotFound from "./pages/NotFound";

// Protect routes helper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

export default function App() {
  return (
    <DataProvider>
      <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login/>}  />

        {/* Protected route */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
        </Route>

        <Route
          path="/farmer/register"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<FarmerRegister />} />
        </Route>

        <Route
          path="/farmer/:farmerId/score"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ClimateScoring />} />
        </Route>

        <Route
          path="/farmers"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<FarmersList />} />
        </Route>

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Analytics />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
        <Route
          path="*"
          element={
            <>
              <SignedIn>
                <Navigate to="/dashboard" replace />
              </SignedIn>
              <SignedOut>
                <Navigate to="/" replace />
              </SignedOut>
            </>
          }
        />
      </Routes>

     
    </BrowserRouter>
    </DataProvider>
  );
}
