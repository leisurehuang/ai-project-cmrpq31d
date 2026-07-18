/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // 充满童趣的主题色
        primary: {
          DEFAULT: '#FFC107', // 明亮黄（星星颜色）
          dark: '#FFA000',
        },
        secondary: {
          DEFAULT: '#3F51B5', 
          dark: '#303F9F',
        },
      },
      fontFamily: {
        // 可以在这里加入圆润可爱的自定义字体
        sans: ['Comic Sans MS', 'Chalkboard SE', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
