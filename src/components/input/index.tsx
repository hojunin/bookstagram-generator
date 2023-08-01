import React, { forwardRef, ForwardedRef, InputHTMLAttributes } from 'react';
import './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...inputElementProps }, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <div className="input-group w-full">
        <input
          ref={ref}
          required
          type="text"
          name="text"
          autoComplete="off"
          className="input"
          {...inputElementProps}
        />
        <label className="user-label">{label}</label>
      </div>
    );
  },
);

export default Input;

Input.displayName = 'Input';
