"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { ChainProvider } from "./context/chain-context";
import { ReactNode } from "react";
import FullPageLoader from "@/components/ui/full-page-loader";
import { LoadingProvider, useLoading } from "./context/loading-context";

interface ProvidersProps {
  children: ReactNode;
  themeProps?: ThemeProviderProps;
}

function LoadingWrapper({ children }: { children: ReactNode }) {
  const { isLoading } = useLoading();

  return (
    <>
      <FullPageLoader isLoading={isLoading} />
      {children}
    </>
  );
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <LoadingProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        {...themeProps}
      >
        <ChainProvider>
          <LoadingWrapper>{children}</LoadingWrapper>
        </ChainProvider>
      </NextThemesProvider>
    </LoadingProvider>
  );
}

// Keep the original ThemeProvider for backward compatibility
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
