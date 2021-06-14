function withOpacity(variableName) {
  return ({opacityValue}) => {
    if(opacityValue !== undefined){
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName})`
  }
}

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      textColor: {
        skin: {
          base: withOpacity('--color-text-base'),
          primary: withOpacity('--color-primary'),
          'primary-light': withOpacity('--color-primary-light'),
          'primary-extra-light': withOpacity('--color-primary-extra-light'),
          secondary: withOpacity('--color-text-secondary')
        }
      },
      backgroundColor: {
        skin: {
          base: withOpacity('--color-fill'),
          light: withOpacity('--color-bg-light'),
          dark: withOpacity('--color-bg-dark'),
          'button-primary': withOpacity('--color-button-primary'),
          'button-primary-hover': withOpacity('--color-button-primary-hover'),
          'button-secondary': withOpacity('--color-button-secondary'),
          'button-secondary-hover': withOpacity('--color-button-secondary-hover')
        }
      },
      borderColor: {
        skin: {
          base: withOpacity('--color-primary-light')
        }
      },
      ringColor: {
        skin: {
          base: withOpacity('--color-primary-light')
        }
      }
    },
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
