import ThemeProvider from "@/components/theme";
import ReduxProvider from "@/store/ReduxProvider";
import LayoutContextProvider from "@/contexts/LayoutContext";

// Styled Component Imports
import AppReactToastify from '@/libs/AppReactToastify';

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <LayoutContextProvider>
      <ThemeProvider>
        <ReduxProvider>{children}</ReduxProvider>
        <AppReactToastify />
      </ThemeProvider>
    </LayoutContextProvider>
  );
}

export default Providers;
