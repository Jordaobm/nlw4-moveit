import { LoggedProvider } from '../context/Logged'
import '../styles/GlobalStyles.css'

function MyApp({ Component, pageProps }) {
  return (
    <LoggedProvider>
      <Component {...pageProps} />
    </LoggedProvider>

  )
}

export default MyApp
