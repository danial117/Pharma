/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{html,js,jsx,tsx,ts}"];
export const theme = {
  extend: {
    fontFamily: {
      Abel: ['Abel', 'sans-serif'],
      Anton: ['Anton', 'sans-serif'],
      Lexend: ['Lexend', 'sans-serif'],
      Poppins: ['Poppins', 'sans-serif'],
      Livvic: ['Livvic', 'sans-serif'],
    },
    screens: {
      'xs': '320px',
      'sm': '576px', // Small devices (e.g., phones)
      'md': '768px', // Medium devices (e.g., tablets)
      'ml': '1024px',
      'lg': '1200px' // Large devices (e.g., laptops/desktops)
    },
  },
};
export const plugins = [];
export const mode = 'jit';

 