"use client";

import { useId, useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

type Props = {
  id?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  required?: boolean;
  minLength?: number;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
};

export default function PasswordField({
  id: idProp,
  label,
  value,
  onChange,
  autoComplete,
  required,
  minLength,
  placeholder,
  className,
  inputClassName,
}: Props) {
  const [visible, setVisible] = useState(false);
  const genId = useId();
  const inputId = idProp ?? genId;

  return (
    <div className={className}>
      <label htmlFor={inputId} className="block text-xs font-medium text-gray-400 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          minLength={minLength}
          placeholder={placeholder}
          className={
            inputClassName ??
            "w-full rounded-lg border border-gray-600 bg-black/40 py-2 ps-3 pe-11 text-white placeholder:text-gray-600 focus:border-cyan-500/60 focus:outline-none focus:ring-1 focus:ring-cyan-500/40"
          }
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setVisible((v) => !v)}
          className="absolute end-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-gray-400 hover:bg-white/10 hover:text-gray-200"
          aria-label={visible ? "הסתר סיסמה" : "הצג סיסמה"}
        >
          {visible ? <IconEyeOff size={18} stroke={1.5} /> : <IconEye size={18} stroke={1.5} />}
        </button>
      </div>
    </div>
  );
}
