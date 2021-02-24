import { ChallengesProvider } from '../context/ChallengeContext'
import '../styles/GlobalStyles.css'

function MyApp({ Component, pageProps }) {
  return (
    <ChallengesProvider>
      <Component {...pageProps} />
    </ChallengesProvider>


  )
}

export default MyApp
