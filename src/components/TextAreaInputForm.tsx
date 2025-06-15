import React from 'react';

interface InputFormProps {
  text: string;
  name: string;
  value?: string;
  placeholder?: string;
  rows?: number;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  bubbleColor?: string; // Por defecto: 'primary'
}

function TextAreaInputForm({
  text,
  name,
  value,
  handleChange,
  error,
  placeholder = '',
  rows = 5,
  bubbleColor = 'primary',
}: InputFormProps) {
  return (
    <div className="w-full">
      {/* Etiqueta superior */}
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-semibold text-primary-85"
      >
        {text}
      </label>

      {/* Contenedor de chat con textarea */}
      <div className={`chat chat-start w-full`}>
        <div className={`chat-bubble chat-bubble-${bubbleColor} w-full`}>
          <textarea
            value={value}
            onChange={handleChange}
            name={name}
            id={name}
            rows={rows}
            placeholder={placeholder}
            className="w-full bg-transparent border-none text-base-content focus:outline-none resize-none"
          />
        </div>
      </div>

      {/* Mensaje de error (si aplica) */}
      {error && (
        <p className="mt-1 text-sm text-error font-semibold">
          {error}
        </p>
      )}
    </div>
  );
}

export default TextAreaInputForm;
