import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { LockKeyholeIcon, Mail } from "lucide-react";
import Button from "@/components/ui/Button";

// Validation Schema
const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
});

export default function Login() {
    const { setUser, setIsAuthenticated, apiBaseUrl } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleLogin = async (values: { email: string; password: string }) => {
        setLoading(true);
        setServerError("");
        setSuccessMessage("");

        try {
            const res = await fetch(`${apiBaseUrl}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            const data = await res.json();
            if (res.ok && data.success) {
                // store token & user info
                localStorage.setItem("jwtToken", data.jwtToken);
                localStorage.setItem(
                    "user",
                    JSON.stringify({
                        userId: data.id,
                        email: data.email,
                        role: data.userType,
                        status: data.status,
                    })
                );

                // update context
                setUser({
                    userId: data.id,
                    email: data.email,
                    role: data.userType
                });
                setIsAuthenticated(true);
                setSuccessMessage(data.message || "Login successful! Redirecting...");
                // navigate based on userType
                setTimeout(() => {
                    if (data.userType === "admin") navigate("/admin/dashboard", { replace: true });
                    else if (data.userType === "user") navigate("/user/dashboard", { replace: true });
                    else navigate("/", { replace: true });
                }, 1500);

            } else {
                setServerError(data.message || "Login failed. Please try again.");
            }
        } catch (err) {
            console.error("Login error:", err);
            setServerError("Server error. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
                <h1 className="mb-6 text-center text-2xl font-semibold text-gray-800">
                    Login
                </h1>

                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={LoginSchema}
                    onSubmit={handleLogin}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-5">
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Email
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5">
                                        <Mail className="text-gray-400" />
                                    </span>
                                    <Field
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full rounded-lg border border-gray-300 px-10 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-sm text-red-500 mt-1"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5">
                                        <LockKeyholeIcon className="text-gray-400" />
                                    </span>
                                    <Field
                                        name="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        className="w-full rounded-lg border border-gray-300 px-10 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="text-sm text-red-500 mt-1"
                                />
                            </div>

                            {serverError && (
                                <div className="text-sm text-red-600 text-center">
                                    {serverError}
                                </div>
                            )}
                            {successMessage && (
                                <div className="text-sm text-green-600 text-center">
                                    {successMessage}
                                </div>
                            )}

                            <Button
                                type="submit"
                                label={loading ? "Signing in..." : "Login"}
                                disabled={isSubmitting || loading}
                                className="w-full disabled:opacity-50"
                            />
                        </Form>
                    )}
                </Formik>

                <p className="mt-4 text-center text-sm text-gray-500">
                    Don't have an account?{" "}
                    <span
                        onClick={() => navigate("/signup")}
                        className="text-gray-900 cursor-pointer hover:underline"
                    >
                        Sign Up
                    </span>
                </p>

            </div>
        </div>
    );
}
