import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    //  not logged in
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    //  role missing (extra safety)
    if (!role) {
        return <Navigate to="/login" replace />;
    }

    //  role not allowed
    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default ProtectedRoute;