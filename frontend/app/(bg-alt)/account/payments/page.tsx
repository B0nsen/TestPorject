"use client";

import { useState } from "react";
import PaymentForm from "@/components/PaymentForm";
import PaymentBenefits from "@/components/PaymentBenefits";
import { PaymentData } from "@/lib/types/payment";

const API = "http://localhost:5012/api/creditcard/add";

const parseExpiryDate = (value: string) => {
    const [monthRaw, yearRaw] = value.split("/");

    const month = Number(monthRaw);
    const shortYear = Number(yearRaw);
    const year = shortYear < 100 ? 2000 + shortYear : shortYear;

    const lastDay = new Date(year, month, 0).getDate();

    return `${year}-${String(month).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;
};

export default function PaymentStep() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (data: PaymentData) => {
        setError("");
        setSuccess("");

        const res = await fetch(API, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cardNumber: data.cardNumber,
                holderName: data.nameOnCard,
                expiry: parseExpiryDate(data.expiryDate),
                cvv: Number(data.cvv),
            }),
        });

        if (!res.ok) {
            console.error("Failed to save card:", res.status);

            if (res.status === 401) {
                setError("You need to be logged in.");
                return;
            }

            setError("Failed to save card.");
            return;
        }

        setSuccess("Card saved.");
    };

    return (
        <div className="flex flex-col sm:flex-row w-full justify-between items-start sm:items-center gap-[30px]">
            <div className="flex sm:w-[510px] flex-col gap-[10px]">
                <PaymentForm
                    onSubmit={handleSubmit}
                    submitLabel="Use this card"
                />

                {error && <p className="text-sm text-red-500">{error}</p>}
                {success && <p className="text-sm text-green-600">{success}</p>}
            </div>

            <PaymentBenefits />
        </div>
    );
}