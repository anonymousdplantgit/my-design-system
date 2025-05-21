/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./projects/design-lib/src/**/*.{html,ts}",
    "./projects/showcase/src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f1fe',
          100: '#cce3fd',
          200: '#99c7fb',
          300: '#66aaf9',
          400: '#338ef7',
          500: '#0072f5', // Primary color
          600: '#005bc4',
          700: '#004493',
          800: '#002e62',
          900: '#001731',
        },
        success: {
          50: '#eafaf0',
          100: '#d5f5e1',
          200: '#abebb3',
          300: '#81e185',
          400: '#57d758',
          500: '#2dcd2a', // Success color
          600: '#24a422',
          700: '#1b7b19',
          800: '#125211',
          900: '#092908',
        },
        warning: {
          50: '#fef9e6',
          100: '#fdf3cd',
          200: '#fae79b',
          300: '#f8db69',
          400: '#f5cf37',
          500: '#f3c305', // Warning color
          600: '#c29c04',
          700: '#927503',
          800: '#614e02',
          900: '#312701',
        },
        danger: {
          50: '#fee7e6',
          100: '#fdcfcd',
          200: '#fb9f9b',
          300: '#f96f69',
          400: '#f73f37',
          500: '#f50f05', // Danger color
          600: '#c40c04',
          700: '#930903',
          800: '#620602',
          900: '#310301',
        },
        neutral: {
          50: '#f8f9fa',
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#6c757d',
          700: '#495057',
          800: '#343a40',
          900: '#212529',
        }
      },
      borderRadius: {
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        focus: '0 0 0 3px rgba(0, 114, 245, 0.3)',
        none: 'none',
      },
    },
  },
  plugins: [],
}
