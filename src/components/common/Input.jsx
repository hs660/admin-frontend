import React from "react";

const Input = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  className = "",
}) => {
  return (
    <div className="flex flex-col gap-1">

      {label && (
        <label className="text-sm text-gray-600 font-medium">
          {label}
        </label>
      )}

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none ${className}`}
      />

    </div>
  );
};

export default Input;