import React, { useState } from "react";

const VerifyEmail = () => {
    const [code, setCode] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // API Call → verify email using OTP
        console.log("Verifying code:", code);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl">

                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                    Verify Your Email
                </h2>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Enter the verification code sent to your email.
                </p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        maxLength={6}
                        className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white tracking-widest text-center text-xl mb-4"
                        placeholder="______"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="w-full py-2 rounded-lg bg-gray-900 text-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-800 transition"
                    >
                        Verify Email
                    </button>
                </form>

                <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center cursor-pointer hover:underline">
                    Resend Code
                </p>

            </div>
        </div>
    );
};

export default VerifyEmail;
