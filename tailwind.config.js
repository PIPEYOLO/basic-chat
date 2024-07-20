/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{html,jsx}",
        "./src/index.css"
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-1": `linear-gradient(159deg, rgba(33,37,209,0.896796218487395) 0%, rgba(165,0,240,1) 100%)`,
                "gradient-2": `linear-gradient(90deg, rgba(232,37,146,0.8099614845938375) 35%, rgba(231,28,63,1) 100%);`,
                "gradient-3": `linear-gradient(90deg, rgba(209,108,13,1) 35%, rgba(209,41,30,1) 100%);`
            },
            maxHeight: {
                "full": "100%",
            },
            

            keyframes: {
                slideIn: {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(0)' },
                },
                appear: {
                    "0%": { transform: "scale(0)" },
                    "1000%": { transform: "scale(1)" }
                }
            },
            animation: {
                slideIn: `slideIn 1s ease`,
                appear: `appear .5s ease`
            }
        },
    },
    plugins: [],
}

