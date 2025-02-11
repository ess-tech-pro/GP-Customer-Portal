// MUI Imports
import type { Theme } from '@mui/material/styles'

// Theme Options Imports
import shadows from './shadows'
import customShadows from './customShadows'

const theme = (): Theme => {
  return {
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
    shadows: shadows('light'),
    customShadows: customShadows('light'),
    mainColorChannels: {
      light: '47 43 61',
      dark: '225 222 245',
      lightShadow: '47 43 61',
      darkShadow: '19 17 32'
    }
  } as Theme
}

export default theme
