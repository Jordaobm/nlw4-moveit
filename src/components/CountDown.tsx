
import { useContext } from 'react';
import { CountdownContext } from '../context/CountdownContext';
import styles from '../styles/components/CountDown.module.css';
export function Countdown() {

    const { hasFinished, startCountDown, resetCountDown, isActive, seconds, minutes } = useContext(CountdownContext)

    const [minuteLeft, minuteRigth] = String(minutes).padStart(2, "0").split('');
    const [secondLeft, secondRigth] = String(seconds).padStart(2, "0").split('');

    
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