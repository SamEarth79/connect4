/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                "redyellow-pattern": "url('/public/redyellow.jpeg')",
                "github-icon": "url('/public/github-mark/github-mark-white.png'"
            },
        },
    },
    plugins: [],
};
