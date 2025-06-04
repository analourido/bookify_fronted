import React from 'react'

interface InputFormProps {
  text: string
  name: string
  value?: string
  placeholder?: string
  rows?: number
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  error: string | undefined
  bubbleColor?: string // Añadido para permitir cambiar el color de la burbuja (opcional)
}

function TextAreaInputForm({
  text,
  name,
  value,
  handleChange,
  error,
  placeholder = '',
  rows = 5,
  bubbleColor = 'primary', // por defecto 'primary'
}: InputFormProps) {
  return (
    <div className="chat chat-start w-full bg-primary">
      {/* Etiqueta (como título arriba) */}
      <label
        htmlFor={name}
        className="block mb-1 text-sm font-semibold text-primary-content"
      >
        {text}
      </label>
      {/* Burbuja de chat con textarea */}
      <div className={`chat-bubble chat-bubble-${bubbleColor} w-full`}>
        <textarea
          value={value}
          onChange={handleChange}
          name={name}
          rows={rows}
          id={name}
          className="w-full bg-transparent border-none text-base-100 focus:outline-none resize-none"
          placeholder={placeholder}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-error-content">
          {error}
        </p>
      )}
    </div>
  )
}

export default TextAreaInputForm
