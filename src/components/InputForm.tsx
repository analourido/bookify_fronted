import React from 'react'
interface InputFormProps {
    text: string
    name: string
    value?: string
    checked?: boolean
    placeholder?: string
    type?: string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    error: string | undefined
}
function InputForm({
    text,
    name,
    value,
    checked,
    handleChange,
    error,
    placeholder = '',
    type = 'text',
}: InputFormProps) {
    return (
        <div className="mb-5">
            {/* Etiqueta */}
            <label
                htmlFor={name}
                className="label"
            >
                {text}
            </label>

            {/* Campo de entrada */}
            <input
                value={value}
                checked={checked}
                onChange={handleChange}
                type={type}
                name={name}
                id={name}
                className="input input-bordered w-full"
                placeholder={placeholder}
            />

            {/* Mensaje de error */}
            {error && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}

export default InputForm;

