import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import type React from "react";


interface PrivateRouteProps {
    children: React.ReactNode;
    allowedRoles: string[];
}
export default function PrivateRoute({ children, allowedRoles }: PrivateRouteProps) {
    const { user, loading } = useAuth();

    // ⏳ Wait while checking
    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    // 🔒 If no user
    // if (!user) {
    //     return <Navigate to="/login" replace />;
    // }

    // if (!allowedRoles.includes(user.role)) {
    //     return <Navigate to="/" replace />;
    // }

    // Otherwise render children
    return <>{children}</>;
}
