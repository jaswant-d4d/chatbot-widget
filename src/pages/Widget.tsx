"use client";

import { useEffect, useState } from "react";
import Chatbox from "@/components/chatbox";

export default function Widget() {
    const [hasParams, setHasParams] = useState(true);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        const company = params.get("company");
        const token = params.get("token");
        const domain = params.get("domain");

        // Minimum check — the REAL validation is done in backend
        if (!company || !token || !domain) {
            setHasParams(false);
        }
    }, []);

    if (!hasParams) {
        return (
            <div className="flex items-center justify-center h-screen bg-white text-red-500 font-semibold">
                Missing widget credentials.
            </div>
        );
    }

    return (
        <div className="w-full h-full">
            <Chatbox defaultVisible={true} />
        </div>
    );
}
