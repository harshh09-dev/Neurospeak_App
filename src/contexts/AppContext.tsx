import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "user" | "caregiver" | null;

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
  userName: string;
  onboardingComplete: boolean;
  setOnboardingComplete: (v: boolean) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  textSize: "normal" | "large" | "extra-large";
  setTextSize: (s: "normal" | "large" | "extra-large") => void;
  highContrast: boolean;
  setHighContrast: (v: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<UserRole>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [textSize, setTextSize] = useState<"normal" | "large" | "extra-large">("normal");
  const [highContrast, setHighContrast] = useState(false);
  const userName = "Alex";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    document.documentElement.classList.toggle("high-contrast", highContrast);
  }, [highContrast]);

  useEffect(() => {
    document.documentElement.style.fontSize =
      textSize === "extra-large" ? "20px" : textSize === "large" ? "18px" : "16px";
  }, [textSize]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <AppContext.Provider
      value={{
        role, setRole, isLoggedIn, setIsLoggedIn, userName,
        onboardingComplete, setOnboardingComplete,
        isDarkMode, toggleDarkMode, textSize, setTextSize,
        highContrast, setHighContrast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
