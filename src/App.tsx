import { AppRouter } from './routes/AppRouter';
import LayoutContextProvider from "@/contexts/LayoutContext";
import CssBaseline from '@mui/material/CssBaseline'
import type { } from '@mui/material/themeCssVarsAugmentation'
// import type { } from '@mui/lab/themeAugmentation'
import { ThemeProvider, lighten, darken, createTheme } from '@mui/material/styles'

function App() {
  return (
    <ThemeProvider
      theme={createTheme({
        colorSchemes: {
          light: {
            palette: {
              primary: {
                main: '#000000',
                light: lighten('#000000', 0.2),
                dark: darken('#000000', 0.1)
              }
            }
          },
          dark: {
            palette: {
              primary: {
                main: '#000000',
                light: lighten('#000000', 0.2),
                dark: darken('#000000', 0.1)
              }
            }
          }
        },
        cssVariables: {
          colorSchemeSelector: 'data'
        }
      })}
    >
      <LayoutContextProvider>
        <AppRouter />
        <CssBaseline />
      </LayoutContextProvider>
    </ThemeProvider>
  );
}

export default App;
