/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			animation: {
				"ping-slow": "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
			},
			fontSize: {
				sm: "clamp(0.8rem, 0.17vw + 0.76rem, 0.89rem)",
				base: "clamp(1rem, 0.34vw + 0.91rem, 1.19rem)",
				lg: "clamp(1.25rem, 0.61vw + 1.1rem, 1.58rem)",
				xl: "clamp(1.56rem, 1vw + 1.31rem, 2.11rem)",
				"2xl": "clamp(1.95rem, 1.56vw + 1.56rem, 2.81rem)",
				"3xl": "clamp(2.44rem, 2.38vw + 1.85rem, 3.75rem)",
				"4xl": "clamp(3.05rem, 3.54vw + 2.17rem, 5rem)",
				"5xl": "clamp(3.81rem, 5.18vw + 2.52rem, 6.66rem)",
				"6xl": "clamp(4.77rem, 7.48vw + 2.9rem, 8.88rem)",
			},
			transitionTimingFunction: {
				spring:
					"linear(0, 0.01, 0.04 1.6%, 0.161 3.3%, 0.816 9.4%, 1.046, 1.189 14.4%, 1.231, 1.254 17%, 1.259, 1.257 18.6%, 1.236, 1.194 22.3%, 1.057 27%, 0.999 29.4%, 0.955 32.1%, 0.942, 0.935 34.9%, 0.933, 0.939 38.4%, 1 47.3%, 1.011, 1.017 52.6%, 1.016 56.4%, 1 65.2%, 0.996 70.2%, 1.001 87.2%, 1)",
			},
		},
	},
	plugins: [],
};
