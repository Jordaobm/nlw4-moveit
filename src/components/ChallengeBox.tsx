import { useContext } from 'react';
import { ChallengesContext } from '../context/ChallengeContext';
import { CountdownContext } from '../context/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {
    const { activeChallenge, resetChallenge, completeChallenge, } = useContext(ChallengesContext);
    const {resetCountDown} = useContext(CountdownContext);

    function handleChallengeSucceeded(){
        completeChallenge()
        resetCountDown()
    }   

    function handleChallengeFail(){
        resetChallenge()
        resetCountDown()
    }

    return (

        <div className={styles.challengeBoxContainer}>
            {activeChallenge ?

                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount}xp</header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} />
                        <strong>Novo Desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>
                    <footer>
                        <button
                            onClick={handleChallengeFail}
                            type="button"
                            className={styles.challengeFailButton}
                        >
                            Falhei
                        </button>

                        <button
                            onClick={handleChallengeSucceeded}
                            type="button"
                            className={styles.challengeSucceededButton}
                        >
                            Completei
                        </button>

                    </footer>

                </div>

                :

                <div className={styles.challengeNotActive}>
                    <strong>Finalize um ciclo para receber um desafio</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level up" />
                    Avance de level completando desafios
                </p>
                </div>}

        </div>
    )
}