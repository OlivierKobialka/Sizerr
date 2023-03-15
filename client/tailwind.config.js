/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#475be8",
			},
			screens: {
				xs: "550px",
				fws: "900px",
			},
		},
	},
	plugins: [],
};
