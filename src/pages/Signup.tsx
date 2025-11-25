import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { LockKeyhole, Mail, UserIcon } from "lucide-react";
import Button from "@/components/ui/Button";

// Validation Schema
const SignupSchema = Yup.object().shape({
    name: Yup.string().min(3, "Too short").required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
});

export default function Signup() {
    const { apiBaseUrl } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSignup = async (values: { name: string; email: string; password: string }) => {
        setLoading(true);
        setServerError("");
        setSuccessMessage("");

        try {
            const res = await fetch(`${apiBaseUrl}/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            const data = await res.json();
            if (res.ok && data.success) {
                // ✅ Success — show message & navigate after short delay
                setSuccessMessage(data.message || "Signup successful! Redirecting...");

                setTimeout(() => navigate("/login"), 1500);
            } else {
                // ❌ API returned an error
                setServerError(data.message || "Signup failed. Please try again.");
            }
        } catch (err) {
            console.error("Signup error:", err);
            setServerError("Server error. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
                <h1 className="mb-6 text-center text-2xl font-semibold text-gray-800">Create an Account</h1>

                <Formik
                    initialValues={{ name: "", email: "", password: "" }}
                    validationSchema={SignupSchema}
                    onSubmit={handleSignup}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-5">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5">
                                        <UserIcon className="text-gray-400" />
                                    </span>
                                    <Field
                                        name="name"
                                        type="text"
                                        placeholder="Enter your name"
                                        className="w-full rounded-lg border border-gray-300 px-10 py-2 text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                                <ErrorMessage name="name" component="div" className="text-sm text-red-500 mt-1" />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5">
                                        <Mail className="text-gray-400" />
                                    </span>
                                    <Field
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full rounded-lg border border-gray-300 px-10 py-2 text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                                <ErrorMessage name="email" component="div" className="text-sm text-red-500 mt-1" />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5">
                                        <LockKeyhole className="text-gray-400" />
                                    </span>
                                    <Field
                                        name="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        className="w-full rounded-lg border border-gray-300 px-10 py-2 text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                                <ErrorMessage name="password" component="div" className="text-sm text-red-500 mt-1" />
                            </div>

                            {serverError && (
                                <div className="text-sm text-red-600 text-center">
                                    {serverError}
                                </div>
                            )}
                            {successMessage && (
                                <p className="text-green-600 text-sm mt-2">
                                    {successMessage}
                                </p>
                            )}

                            <Button
                                type="submit"
                                label={loading ? "Creating account..." : "Sign Up"}
                                disabled={isSubmitting || loading}
                                className="w-full disabled:opacity-50"
                            />
                        </Form>
                    )}
                </Formik>

                <p className="mt-4 text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        className="text-gray-900 cursor-pointer hover:underline"
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
}
