import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
}) => {

  const baseStyle =
    "px-4 py-2 rounded-lg text-sm font-medium transition duration-200";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    danger: "bg-red-500 text-white hover:bg-red-600",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;