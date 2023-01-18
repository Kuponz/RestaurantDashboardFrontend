import '@/styles/globals.css'
import { useMode } from '@/theme/theme'
import { CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  const theme = useMode();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}