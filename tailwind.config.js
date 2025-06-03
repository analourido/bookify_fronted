/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                'primary-50': '#2B3673',
                'primary-60': '#004C61',
                'primary-65': '#94808A',
                'primary-70': '#FFE2D6',
                'primary-80': '#FBE0CF',
                'primary-85': '#F2CBB4',
                'primary-90': '#FAC991',
            },
        },
    },
    plugins: [
        require('daisyui'),
        require("tailwindcss-animate"),  // importante para shadcn
    ],
    daisyui: {
        themes: [
            {
                bookify: {
                    primary: '#2B3673',
                    secondary: '#F2CBB4',
                    accent: '#FAC991',
                    neutral: '#FFE2D6',
                    'base-100': '#FFF9F0',
                    info: '#004C61',
                    success: '#FBE0CF',
                    warning: '#FAC991',
                    error: '#94808A',
                },
            },
        ],
    },
};
