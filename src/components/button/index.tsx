import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Button = ({ label, ...buttonProps }: ButtonProps) => {
  return (
    <button
      className="relative group overflow-hidden px-6 h-12 rounded-full flex space-x-2 items-center bg-gradient-to-r from-pink-500 to-purple-500 hover:to-purple-600"
      {...buttonProps}
    >
      <span className="relative text-sm text-white">{label}</span>
      <div className="flex items-center -space-x-3 translate-x-3">
        <div className="w-2.5 h-[1.6px] rounded bg-white origin-left scale-x-0 transition duration-300 group-hover:scale-x-100"></div>
        <svg
          stroke-width="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5 stroke-white -translate-x-2 transition duration-300 group-hover:translate-x-0"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 5l7 7-7 7"
            stroke-linejoin="round"
            stroke-linecap="round"
          ></path>
        </svg>
      </div>
    </button>
  );
};

export default Button;
