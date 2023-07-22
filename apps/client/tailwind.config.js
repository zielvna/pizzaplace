/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/modals/**/*.{js,ts,jsx,tsx,mdx}',
        './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#feca57',
                black: '#2f2f2f',
                red: '#ff6b6b',
                textGray: '#afafaf',
                backgroundGray: '#fafafa',
            },
        },
    },
    plugins: [],
};
