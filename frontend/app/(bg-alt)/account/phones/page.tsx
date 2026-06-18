"use client";

import { useState } from "react";
import { CountryCode, getCountries, getCountryCallingCode, parsePhoneNumberFromString } from "libphonenumber-js";

export default function AccountPhones() {
  const countries = getCountries();

const [country, setCountry] = useState<CountryCode>("UA");
  const [number, setNumber] = useState("");

  const callingCode = `+${getCountryCallingCode(country)}`;
  const phone = parsePhoneNumberFromString(number, country);
  const isValid = phone?.isValid?.() ?? false;

  return (
    <div>
      <p>Phones</p>
      <div className="flex gap-2 items-center">
        <span>{callingCode}</span>

        <input
          value={number}
          onChange={(e) =>
            setNumber(e.target.value.replace(/[^\d+]/g, ""))
          }
          placeholder="phone number"
          className="border px-2 py-1"
        />
      </div>
      <p style={{ color: isValid ? "green" : "red" }}>
        {isValid ? "Valid number" : "Invalid number"}
      </p>
      <div className="max-h-40 overflow-auto border mt-3">
        {countries.map((c) => (
          <div
            key={c}
            onClick={() => {
              setCountry(c);
              setNumber("");
            }}
            className={`p-2 cursor-pointer hover:bg-gray-100 ${
              country === c ? "bg-gray-200" : ""
            }`}
          >
            {c} (+{getCountryCallingCode(c)})
          </div>
        ))}
      </div>
    </div>
  );
}