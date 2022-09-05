/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: "Open Sans",
			},
			gridTemplateColumns: {
				"1/5": "1fr 5fr",
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
