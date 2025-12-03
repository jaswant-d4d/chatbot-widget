import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useChat } from "@/contexts/ChatContext";

type FormValues = {
    name: string;
    email: string;
    phone: string;
    userType: string;
};

type Errors = {
    [K in keyof FormValues]: string;
};


const Register = () => {
    const { apiBaseUrl, setUser, setIsAuthenticated } = useAuth();
    const { isRegisterOpen, setRegisterOpen } = useChat();
    const [submitting, setSubmitting] = useState(false)

    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        userType: "user",
        phone: "",
    })
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        phone: "",
    })

    // Input Handler
    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })
    }

    // validation conditions
    const validateField = (name: string, value: string): string => {
        switch (name) {
            case "name":
                return !value.trim() ? "Name is required" : "";
            case "email":
                if (!value.trim()) return "Email is required";
                if (!/^\S+@\S+\.\S+$/.test(value)) return "Invalid email address";
                return "";
            case "phone":
                if (!value.trim()) return "Phone is required";
                if (!/^\d{10}$/.test(value)) return "Phone must be 10 digits";
                return "";
            default:
                return "";
        }
    };

    // Handle Form Validation
    const validateForm = () => {
        const newErrors: Errors = {
            name: validateField("name", formValues.name),
            email: validateField("email", formValues.email),
            phone: validateField("phone", formValues.phone),
            userType: validateField("userType", "user"),
        };

        setErrors(newErrors);
        return !Object.values(newErrors).some(Boolean);
    };

    // Handle Input Blur
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setErrors((prev) => ({
            ...prev,
            [name]: validateField(name, value),
        }));
    };

    // Handle Form Submit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateForm()) {
            setSubmitting(true);
            try {
                console.log("Form submitting:", formValues);
                const response = await fetch(`${apiBaseUrl}/auth/signup`, {
                    method: "POST",
                    body: JSON.stringify(formValues),
                    headers: {
                        "Accept": 'application/json',
                        "Content-Type": 'application/json'
                    },
                    credentials: "include"
                })

                const result = await response?.json();
                setUser(result?.user)
                setTimeout(() => {
                    setIsAuthenticated(true);
                    setRegisterOpen(false)
                    setSubmitting(false);
                }, 1000);

            } catch (err) {
                console.log("Error:", err);
                alert("Something went wrong. Please try again.");
                setSubmitting(false);
            }
        }
    }

    if (!isRegisterOpen) return null;

    return (
        <>
            <div id="drawer-swipe" className={`absolute z-40 w-full overflow-y-auto bg-white border-t border-gray-200 shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.15)] rounded-t-2xl transition-transform bottom-0 left-0 right-0 ${isRegisterOpen ? "translate-y-0" : "translate-y-full"}`}
                role={isRegisterOpen ? "dialog" : ""}>
                <div className=" p-4 sm:p-8 ">

                    <div className="mb-5">
                        <h3 className="text-center text-2xl font-semibold mb-6 text-blue-500">Register</h3>
                    </div>
                    <form onSubmit={handleSubmit} noValidate className="text-sm">
                        <div className="mb-5">
                            <label htmlFor="name" className="block font-medium text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                className={`w-full border rounded px-4 py-2 ${errors.name ? "border-red-500" : "border-gray-300"}`}
                                placeholder="Name"
                                name="name"
                                id="name"
                                onChange={inputHandler}
                                onBlur={handleBlur}
                                value={formValues?.name} />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}

                        </div>
                        <div className="mb-5 ">
                            <label htmlFor="email" className="block font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                className={`w-full border rounded px-4 py-2 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                                placeholder="Email"
                                name="email"
                                id="email"
                                onChange={inputHandler}
                                onBlur={handleBlur}
                                value={formValues?.email} />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                        <div className="mb-5">
                            <label htmlFor="phone" className="block font-medium text-gray-700 mb-1">
                                Phone Number
                                {/* <span className="text-xs ">(Optional)</span> */}
                            </label>
                            <input
                                type="text"
                                className={`w-full border rounded px-4 py-2 ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                                placeholder="Phone"
                                name="phone"
                                id="phone"
                                onChange={inputHandler}
                                onBlur={handleBlur}
                                value={formValues?.phone} />
                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all duration-300 cursor-pointer"
                            >
                                {submitting ?
                                    "Submitting..." : "Submit"
                                }
                            </button>

                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Register