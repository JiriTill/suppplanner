/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
'./app/**/*.{js,ts,jsx,tsx,mdx}',
'./components/**/*.{js,ts,jsx,tsx,mdx}',
'./pages/**/*.{js,ts,jsx,tsx,mdx}',
],
theme: {
extend: {
colors: {
primary: '#0f7a4e', // logo green
accent: '#ffc247', // pill yellow
ink: '#0f3d2f',
soft: '#f6faf7'
},
borderRadius: {
'2xl': '1.25rem'
},
boxShadow: {
soft: '0 8px 24px rgba(0,0,0,0.06)'
}
},
},
plugins: [require('@tailwindcss/typography')],
};
