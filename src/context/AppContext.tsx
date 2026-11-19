import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import Loading from "../components/Loading";

export type Lang = "EN" | "ID";

interface AppContextType {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  loadingPercent: number;
  setLoadingPercent: (value: number) => void;
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingPercent, setLoadingPercent] = useState<number>(0);
  const [lang, setLang] = useState<Lang>("EN");

  useEffect(() => {
    const interval = window.setInterval(() => {
      setLoadingPercent((prev) => {
        if (prev >= 100) {
          window.clearInterval(interval);
          return 100;
        }
        const step = prev < 75 ? Math.floor(Math.random() * 14) + 6 : 5;
        return Math.min(100, prev + step);
      });
    }, 85);

    return () => window.clearInterval(interval);
  }, []);

  const toggleLang = () => {
    setLang((prev) => (prev === "EN" ? "ID" : "EN"));
  };

  return (
    <AppContext.Provider
      value={{
        isLoading,
        setIsLoading,
        loadingPercent,
        setLoadingPercent,
        lang,
        setLang,
        toggleLang,
      }}
    >
      {isLoading && <Loading percent={loadingPercent} />}
      <main className="main-body">{children}</main>
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
