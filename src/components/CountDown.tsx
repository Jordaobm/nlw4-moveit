
import { useContext, useEffect, useState } from 'react'
import { ChallengesContext } from '../context/ChallengeContext';
import styles from '../styles/components/CountDown.module.css';
export function Countdown() {

    const { startNewChallenge } = useContext(ChallengesContext);

    let countdownTimeout: NodeJS.Timeout;

    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);


    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const [minuteLeft, minuteRigth] = String(minutes).padStart(2, "0").split('');
    const [secondLeft, secondRigth] = String(seconds).padStart(2, "0").split('');

    function startCountDown() {
        setIsActive(true);
    }

    function resetCountDown() {
        clearTimeout(countdownTimeout)
        setIsActive(false)
        setTime(0.1 * 60)
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else if (isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge()
        }
    }, [isActive, time])

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRigth}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRigth}</span>
                </div>
            </div>

            {hasFinished ?
                <button
                    disabled
                    className={styles.countDownButton}>
                    Ciclo encerrado <img src="icons/check_circle.png" alt="" />

                </button>
                : isActive ?
                    (<button
                        onClick={resetCountDown}
                        type="button"
                        className={`${styles.countDownButton} ${styles.countDownButtonActive}`}>
                        Abandonar Ciclo
                    </button>)
                    :
                    (<button
                        onClick={startCountDown}
                        type="button"
                        className={styles.countDownButton}>
                        Iniciar um ciclo
                    </button>)

            }

        </div>
    )
}