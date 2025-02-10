import CssBaseline from '@mui/material/CssBaseline'
import type { } from '@mui/material/themeCssVarsAugmentation'
// import type { } from '@mui/lab/themeAugmentation'
import { ThemeProvider, lighten, darken, createTheme } from '@mui/material/styles'
import type { ChildrenType } from '@/types/base';

const CustomThemeProvider = ({ children }: ChildrenType) => {
  return (
    <ThemeProvider
      theme={createTheme({
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
      })}
    >
      <>
        <CssBaseline />
        {children}
      </>
    </ThemeProvider>
  );
}


export default CustomThemeProvider
