import "@styles/globals.css";
import { useMode } from "../theme/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
export default function App({ Component, pageProps }: AppProps) {
  const theme = useMode();
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
      <ReactQueryDevtools/>
    </QueryClientProvider>
  );
}
