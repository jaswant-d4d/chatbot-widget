import { createContext, useContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";

interface UserType {
    role: "admin" | "user" | "guest"; // ✅ fixed type
    userId: string;
    email: string;
    name?: string;
}

interface AuthContextType {
    user: UserType | null;
    setUser: Dispatch<SetStateAction<UserType | null>>;
    isAuthenticated: boolean;
    setIsAuthenticated: (auth: boolean) => void;
    apiBaseUrl: string,
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

const fallbackCredentials: UserType = {
    role: "admin",
    userId: "1234567890",
    email: "jaswant.d4d@gmail.com",
    name: "Jaswant Singh"
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<UserType | null>(fallbackCredentials);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const apiBaseUrl = import.meta.env.VITE_BACKEND_LIVE_URL;

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("jwtToken");

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        } else {
            // setUser(null);
            setUser(fallbackCredentials);
            setIsAuthenticated(false);
        }

        // ✅ mark as finished
        setLoading(false);
    }, [apiBaseUrl]);

    const logout = () => {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("user");
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ apiBaseUrl, user, setUser, isAuthenticated, setIsAuthenticated, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};