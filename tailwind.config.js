module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require( 'tailwindcss' ),
		require( 'precss' ),
		require( 'autoprefixer' ),
    require('@tailwindcss/forms')
  ],
}
