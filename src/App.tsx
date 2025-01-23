import { AppRouter } from './routes/AppRouter';
import LayoutContextProvider from "@/contexts/LayoutContext";

function App() {
  return (
    <LayoutContextProvider>
      <AppRouter />
    </LayoutContextProvider>
  );
}

export default App;
