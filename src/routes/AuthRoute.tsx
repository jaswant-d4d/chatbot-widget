import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

interface AuthRouteProps {
    children: React.ReactNode;
}

const AuthRoute = ({ children }: AuthRouteProps) => {
    const { user, loading } = useAuth();

    // ⏳ Wait while checking
    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    if (user) {
        const redirectPath =
            user.role === "admin" ? "/admin/dashboard" : "/user/dashboard";
        return <Navigate to={redirectPath} replace />;
    }

    return children;
};

export default AuthRoute;
