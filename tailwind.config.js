/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('tailwind-typewriter')({
    wordsets: {
      iword:{
        words: ['IBK CCME', 'i like','ibk', 'CCME','I love', 'i?','invoice', 'IBK', 'Let\'s invoice','industrial bank of korea', 'InU', 'InVoice', 'ibk and invoice', 'i&voice ' ],
        delay: 0.8,
        pauseBetween : 0.5,
        writeSpeed : 0.1,
        eraseSpeed : 0.05
      }
    }
  })],
}