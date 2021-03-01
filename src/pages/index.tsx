import { ChallengesProvider } from '../context/ChallengeContext'
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/CountDown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import styles from '../styles/pages/Home.module.css';
import Head from 'next/head';
import { ChallengeBox } from "../components/ChallengeBox";
import { CountdownProvider } from "../context/CountdownContext";
import { GetServerSideProps } from 'next';
import Login from '../components/Login';
import { UserProvider, useUser } from '../context/user';
import { useContextLogged } from '../context/Logged';
import { useEffect, useState } from 'react';

interface HomeProps {
  level: number,
  currentExperience: number,
  challengesCompleted: number,
  user: string;
}

export default function Home(props: HomeProps) {

  const { isLogged } = useContextLogged();
  const [showLoggin, setShowLoggin] = useState(true);

  let parsed = { name: '', avatar_url: '' }
  if (props.user) {
    parsed = JSON.parse(props.user)
  }

  useEffect(() => {
    if (parsed.name) {
      setShowLoggin(false)
      return;
    }
    if (isLogged) {
      setShowLoggin(false)
      return;
    }

    setShowLoggin(true);
  }, [isLogged])

  if (showLoggin) {
    return (
      <ChallengesProvider level={props.level} currentExperience={props.currentExperience} challengesCompleted={props.challengesCompleted}>
        <UserProvider parsedUser={parsed} >
          <Login />
        </UserProvider>
      </ChallengesProvider>
    )
  }


  return (<ChallengesProvider level={props.level} currentExperience={props.currentExperience} challengesCompleted={props.challengesCompleted}>
    <UserProvider parsedUser={parsed} >
      <div className={styles.container}>
        <Head>
          <title>Início | Moveit</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />

            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </UserProvider>
  </ChallengesProvider>
  )
}




export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { level, currentExperience, challengesCompleted, user } = ctx.req.cookies;

  return {
    props: {
      level: Number(level ?? 1),
      currentExperience: Number(currentExperience ?? 0),
      challengesCompleted: Number(challengesCompleted ?? 0),
      user: user ? user : null
    }
  }
}