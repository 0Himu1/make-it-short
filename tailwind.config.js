/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {},
		fontFamily: {
			poppins: ['Poppins', 'sans-serif'],
		},
		colors: {
			transparent: 'transparent',
			primary: '#021746',
			secondery: '#F37C62',
			white: '#ffffff',
			offWhite: '#D9D9D9',
			button: '#132B63',
			green: '#16a34a',
		},
	},
	plugins: [],
};
