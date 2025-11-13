import React from "react";

export default function InputField({ label, name, value, onChange, placeholder = "", type = "text", multiline = false }) {
  return (
    <div className="mb-4">
      <label className="block font-semibold text-gray-700 mb-1">{label}</label>
      {multiline ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#048998] focus:outline-none"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#048998] focus:outline-none"
        />
      )}
    </div>
  );
}
