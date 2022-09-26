import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return typeof window === 'undefined' ? <></> : <Component {...pageProps} />
}

export default MyApp
