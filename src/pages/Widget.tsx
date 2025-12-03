"use client";

import { useEffect, useState } from "react";
import GuestLayout from "@/layouts/GuestLayout";
import { useAuth } from "@/contexts/AuthContext";

export default function Widget() {
    const [isValid, setIsValid] = useState<null | boolean>(null);
    const { apiBaseUrl } = useAuth()

    useEffect(() => {
        // Read query params from iframe URL
        const params = new URLSearchParams(window.location.search);
        const company = params.get("company");
        const token = params.get("token");
        const domain = params.get("domain");

        // If missing params → block immediately
        if (!company || !token) {
            setIsValid(false);
            return;
        }

        // Call backend to validate widget access
        const validate = async () => {
            try {
                const res = await fetch(
                    `${apiBaseUrl}/validate-widget?company=${company}&token=${token}&domain=${domain}`,
                    { method: "GET" }
                );

                if (res.ok) setIsValid(true);
                else setIsValid(false);
            } catch (error) {
                console.error("Validation error:", error);
                setIsValid(false);
            }
        };

        validate();
    }, []);

    // ⭐ Show loading
    if (isValid === null) {
        return (
            <div className="flex items-center justify-center h-screen text-white">
                Validating...
            </div>
        );
    }

    // ❌ If validation failed
    if (isValid === false) {
        return (
            <div className="flex items-center justify-center h-screen bg-white text-red-600 font-semibold">
                Access Denied: Invalid or unauthorized widget.
            </div>
        );
    }

    // ✅ If valid → show chatbox
    return (
        <div className="bg-transparent">
            <div className="rounded-2xl shadow-2xl bg-white h-full overflow-visible">
                <GuestLayout />
            </div>
        </div>
    );
}
