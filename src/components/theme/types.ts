/*
 ! This file is for adding custom types to the MUI theme, components and props.
 ! Please do not remove anything from this file as it may break the application.
 ! You can add your own custom types to the MUI theme, components and props in this file
 ! but you must be aware about the MUI theme structure along with MUI CSS Variables.
 ! MUI Theme: https://mui.com/material-ui/customization/default-theme/
 ! MUI CSS Variables: https://mui.com/material-ui/experimental-api/css-theme-variables/overview/
 */

// MUI Imports
import type { } from '@mui/material/styles';

declare module '@mui/material/styles' {

  // Extend the MUI Theme interface to include custom properties
  interface Theme {
    shape: {
      borderRadius: number
      customBorderRadius: {
        xs: number
        sm: number
        md: number
        lg: number
        xl: number
      }
    }
    customShadows: {
      xs: string
      sm: string
      md: string
      lg: string
      xl: string
      primary: {
        sm: string
        md: string
        lg: string
      }
      secondary: {
        sm: string
        md: string
        lg: string
      }
      error: {
        sm: string
        md: string
        lg: string
      }
      warning: {
        sm: string
        md: string
        lg: string
      }
      info: {
        sm: string
        md: string
        lg: string
      }
      success: {
        sm: string
        md: string
        lg: string
      }
    }
    mainColorChannels: {
      light: string
      dark: string
      lightShadow: string
      darkShadow: string
    }
  }

  // Extend the ThemeOptions interface to include custom properties
  interface ThemeOptions {
    shape?: {
      borderRadius?: number
      customBorderRadius?: {
        xs?: number
        sm?: number
        md?: number
        lg?: number
        xl?: number
      }
    }
    customShadows?: {
      xs?: string
      sm?: string
      md?: string
      lg?: string
      xl?: string
      primary?: {
        sm?: string
        md?: string
        lg?: string
      }
      secondary?: {
        sm?: string
        md?: string
        lg?: string
      }
      error?: {
        sm?: string
        md?: string
        lg?: string
      }
      warning?: {
        sm?: string
        md?: string
        lg?: string
      }
      info?: {
        sm?: string
        md?: string
        lg?: string
      }
      success?: {
        sm?: string
        md?: string
        lg?: string
      }
    }
    mainColorChannels?: {
      light?: string
      dark?: string
      lightShadow?: string
      darkShadow?: string
    }
  }

  // Palette Color
  interface PaletteColor {
    lighterOpacity?: string
    lightOpacity?: string
    mainOpacity?: string
    darkOpacity?: string
    darkerOpacity?: string
  }
  interface SimplePaletteColorOptions {
    lighterOpacity?: string
    lightOpacity?: string
    mainOpacity?: string
    darkOpacity?: string
    darkerOpacity?: string
  }

  // Palette
  interface Palette {
    customColors: {
      bodyBg: string
      chatBg: string
      greyLightBg: string
      inputBorder: string
      tableHeaderBg: string
      tooltipText: string
      trackBg: string
    }
  }
  interface PaletteOptions {
    customColors?: {
      bodyBg?: string
      chatBg?: string
      greyLightBg?: string
      inputBorder?: string
      tableHeaderBg?: string
      tooltipText?: string
      trackBg?: string
    }
  }

}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    tonal: true
  }
}
