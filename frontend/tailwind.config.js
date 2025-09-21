module.exports = {
    purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                yellow: {
                    50: '#fefce8',
                    500: '#eab308',
                    600: '#ca8a04',
                    700: '#a16207'
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif']
            }
        },
    },
    variants: {
        extend: {
            transform: ['hover'],
            scale: ['hover'],
            boxShadow: ['hover']
        },
    },
    plugins: [],
}