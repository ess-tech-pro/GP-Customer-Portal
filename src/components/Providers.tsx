import ThemeProvider from "@/components/theme";
import ReduxProvider from "@/store/ReduxProvider";
import LayoutContextProvider from "@/contexts/LayoutContext";
import { ToastContainer } from 'react-toastify';

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <LayoutContextProvider>
      <ThemeProvider>
        <ReduxProvider>{children}</ReduxProvider>
        <ToastContainer />
      </ThemeProvider>
    </LayoutContextProvider>
  );
}

export default Providers;
