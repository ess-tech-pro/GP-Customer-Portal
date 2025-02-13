// MUI Imports
import type { Theme } from '@mui/material/styles'

// Theme Options Imports
import shadows from './shadows'
import colorSchemes from './colorSchemes'
import customShadows from './customShadows'
import spacing from './spacing'
import typography from './typography'
import overrides from './overrides'

const theme = (): Theme => {
  return {
    components: overrides(),
    colorSchemes: colorSchemes(),
    ...spacing,
    shape: {
      borderRadius: 6,
      customBorderRadius: {
        xs: 2,
        sm: 4,
        md: 6,
        lg: 8,
        xl: 10
      }
    },
    shadows: shadows(),
    customShadows: customShadows(),
    typography: typography(),
    mainColorChannels: {
      light: '47 43 61',
      dark: '225 222 245',
      lightShadow: '47 43 61',
      darkShadow: '19 17 32'
    }
  } as Theme
}

export default theme
