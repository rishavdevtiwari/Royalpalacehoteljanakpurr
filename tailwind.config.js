export default {
    content: [
      "./index.html",
      "./frontend/src/**/*.{js,ts,jsx,tsx}",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'hotel-primary': '#3B82F6',
          'hotel-secondary': '#F3F4F6',
          'hotel-dark': '#1F2937',
          'hotel-accent': '#F59E0B',
        },
        boxShadow: {
          'hotel-card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          'hotel-soft': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
        },
        backgroundImage: {
          'hotel-gradient': 'linear-gradient(to right, #3B82F6, #2563EB)',
        },
      },
    },
    plugins: [
      require('tailwindcss-animate')
    ],
  }