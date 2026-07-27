import { ButtonHTMLAttributes } from "react";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className="rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800"
    >
      {children}
    </button>
  );
}