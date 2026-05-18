import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import NotFound from "./pages/NotFound.tsx";

import AdminDashboard from "./pages/AdminDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import Jobs from "./pages/Jobs";
import ApplyJob from "./pages/CreateJob.tsx";
import AppliedJobs from "./pages/AppliedJobs";



import ProtectedRoute from './routes/ProtectedRoute'

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />


          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />


          <Route
            path="/employer"
            element={
              <ProtectedRoute allowedRoles={["employer", "admin"]}>
                <EmployerDashboard />
              </ProtectedRoute>
            }
          />


          <Route
            path="/jobs"
            element={
              <ProtectedRoute allowedRoles={["jobseeker", "admin", "employer"]}>
                <Jobs />
              </ProtectedRoute>
            }
          />


          {/* <Route

            element={
              <ProtectedRoute allowedRoles={["jobseeker", "admin", "employer"]}>
                <ApplyJob />
              </ProtectedRoute>
            }
          /> */}


          <Route
            path="/applied-jobs"
            element={
              <ProtectedRoute allowedRoles={["jobseeker"]}>
                <AppliedJobs />
              </ProtectedRoute>
            }
          />


          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
