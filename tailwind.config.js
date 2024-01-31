/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            animation: {
                'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
            },
            fontSize: {
                sm: 'clamp(0.8rem, 0.17vw + 0.76rem, 0.89rem)',
                base: 'clamp(1rem, 0.34vw + 0.91rem, 1.19rem)',
                lg: 'clamp(1.25rem, 0.61vw + 1.1rem, 1.58rem)',
                xl: 'clamp(1.56rem, 1vw + 1.31rem, 2.11rem)',
                '2xl': 'clamp(1.95rem, 1.56vw + 1.56rem, 2.81rem)',
                '3xl': 'clamp(2.44rem, 2.38vw + 1.85rem, 3.75rem)',
                '4xl': 'clamp(3.05rem, 3.54vw + 2.17rem, 5rem)',
                '5xl': 'clamp(3.81rem, 5.18vw + 2.52rem, 6.66rem)',
                '6xl': 'clamp(4.77rem, 7.48vw + 2.9rem, 8.88rem)',
            },
        },
    },
    plugins: [],
}
