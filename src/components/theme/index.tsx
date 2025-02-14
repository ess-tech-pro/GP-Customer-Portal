import CssBaseline from '@mui/material/CssBaseline'
import type { } from '@mui/material/themeCssVarsAugmentation'
// eslint-disable-next-line import/no-extraneous-dependencies
import { deepmerge } from '@mui/utils'
import { ThemeProvider, lighten, darken, createTheme } from '@mui/material/styles'
import type { ChildrenType } from '@/types/base';
import defaultCoreTheme from '@/theme'

const CustomThemeProvider = ({ children }: ChildrenType) => {
  const newTheme = {
    colorSchemes: {
      light: {
        palette: {
          primary: {
            main: '#0073e6',
            light: lighten('#0073e6', 0.2),
            dark: darken('#0073e6', 0.1)
          }
        }
      },
      dark: {
        palette: {
          primary: {
            main: '#0073e6',
            light: lighten('#0073e6', 0.2),
            dark: darken('#0073e6', 0.1)
          }
        }
      }
    },
    cssVariables: {
      colorSchemeSelector: 'data'
    }
  }
  const coreTheme = deepmerge(defaultCoreTheme(), newTheme)


  const theme = createTheme(coreTheme)
  return (
    <ThemeProvider
      theme={theme}
    >
      <>
        <CssBaseline />
        {children}
      </>
    </ThemeProvider>
  );
}


export default CustomThemeProvider
