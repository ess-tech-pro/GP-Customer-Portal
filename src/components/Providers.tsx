import ReduxProvider from "@/store/ReduxProvider";

const Providers = ({ children }: { children: ReactNode }) => {
  return <ReduxProvider>{children}</ReduxProvider>;
}

export default Providers;
