import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const [auth, setAuth] = useState({
    token: null,
    role: null,
  });

  // ================= LOAD AUTH =================
  useEffect(() => {
    const loadAuth = () => {
      setAuth({
        token: localStorage.getItem("token"),
        role: localStorage.getItem("role"),
      });
    };

    loadAuth();

    // update when localStorage changes
    window.addEventListener("storage", loadAuth);

    return () => window.removeEventListener("storage", loadAuth);
  }, []);

  const { token, role } = auth;

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    setAuth({ token: null, role: null });

    navigate("/");
  };

  return (
    <nav className="absolute top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-5 px-4">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 text-primary-foreground">
          <div className="rounded-lg bg-cta p-2">
            <Briefcase className="h-5 w-5 text-cta-foreground" />
          </div>
          <span className="text-xl font-bold">JobFlow</span>
        </Link>

        {/* ================= DESKTOP MENU ================= */}
        <div className="hidden md:flex items-center gap-6">

          <a href="#jobs" className="text-white/80 hover:text-white text-sm">
            Find Jobs
          </a>

          <a href="#categories" className="text-white/80 hover:text-white text-sm">
            Categories
          </a>

          <a href="#how" className="text-white/80 hover:text-white text-sm">
            How It Works
          </a>

          {/* ================= NOT LOGGED IN ================= */}
          {!token ? (
            <>
              <Button variant="heroOutline" size="sm" asChild>
                <Link to="/login">Sign In</Link>
              </Button>

              <Button variant="hero" size="sm" asChild>
                <Link to="/register">Register</Link>
              </Button>
            </>
          ) : (
            <>
              {/* ================= ADMIN ================= */}
              {role === "admin" && (
                <Link to="/admin" className="text-white text-sm">
                  Dashboard
                </Link>
              )}

              {/* ================= EMPLOYER ================= */}
              {role === "employer" && (
                <Link to="/employer" className="text-white text-sm">
                  Post Job
                </Link>
              )}

              {/* ================= JOBSEEKER ================= */}
              {role === "jobseeker" && (
                <>
                  <Link to="/jobs" className="text-white text-sm">
                    Find Jobs
                  </Link>

                  <Link
                    to="/applied-jobs"
                    className="text-yellow-300 font-semibold text-sm hover:text-yellow-400"
                  >
                    My Applications
                  </Link>
                </>
              )}

              {/* LOGOUT */}
              <Button onClick={handleLogout} size="sm">
                Logout
              </Button>
            </>
          )}
        </div>

        {/* ================= MOBILE BUTTON ================= */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>

      </div>

      {/* ================= MOBILE MENU ================= */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-6 pt-3 flex flex-col gap-3 bg-black/80">

          <a href="#jobs" className="text-white/80 text-sm">Find Jobs</a>
          <a href="#categories" className="text-white/80 text-sm">Categories</a>
          <a href="#how" className="text-white/80 text-sm">How It Works</a>

          {!token ? (
            <>
              <Button asChild className="w-full">
                <Link to="/login">Sign In</Link>
              </Button>

              <Button asChild className="w-full">
                <Link to="/register">Register</Link>
              </Button>
            </>
          ) : (
            <>
              {role === "jobseeker" && (
                <>
                  <Link to="/jobs" className="text-white">
                    Find Jobs
                  </Link>

                  <Link to="/applied-jobs" className="text-white font-semibold">
                    Applied Jobs
                  </Link>
                </>
              )}

              {role === "employer" && (
                <Link to="/employer" className="text-white">
                  Post Job
                </Link>
              )}

              {role === "admin" && (
                <Link to="/admin" className="text-white">
                  Dashboard
                </Link>
              )}

              <Button onClick={handleLogout} className="w-full">
                Logout
              </Button>
            </>
          )}

        </div>
      )}
    </nav>
  );
};

export default Navbar;