import React from "react";
export type ButtonVariant = "primary" | "secondary";
export type SizeVariant = "sm" | "md";
export interface ButtonProps {
    label: string;
    variant: ButtonVariant;
    onClick?: () => void;
    size: SizeVariant;
}
declare const Button: React.FC<ButtonProps>;
export default Button;
//# sourceMappingURL=Button.d.ts.map