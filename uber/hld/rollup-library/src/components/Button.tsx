import React from "react";

export type ButtonVariant = "primary" | "secondary";
export type SizeVariant = "sm" | "md";
export interface ButtonProps {
  label: string;
  variant: ButtonVariant;
  onClick?: () => void;
  size: SizeVariant;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = "primary",
  size = "sm",
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px",
        fontSize: "16px",
        backgroundColor: variant === "primary" ? "red" : "green",
        width: size === "sm" ? "200px" : "400px",
      }}
    >
      {label}
    </button>
  );
};

export default Button;
