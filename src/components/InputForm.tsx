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
                className="block mb-2 text-sm font-medium text-primary-85 dark:text-primary-70"
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
                className="bg-[rgba(53,66,139,0.13)] text-primary-85 text-sm rounded-lg focus:ring-primary-60 focus:border-primary-60 block w-full p-2.5 placeholder:text-primary-70 dark:bg-[rgba(43,54,114,0.59)] dark:border-primary-65 dark:placeholder-primary-70 dark:text-white dark:focus:ring-primary-60 dark:focus:border-primary-60 transition-all duration-300 ease-in-out"
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

