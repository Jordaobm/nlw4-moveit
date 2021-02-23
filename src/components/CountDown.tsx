
import { useEffect, useState } from 'react'
import { start } from 'repl';
import styles from '../styles/components/CountDown.module.css'
export function Countdown() {

    const [time, setTime] = useState(23 * 60);
    const [active, setActive] = useState(false);


    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const [minuteLeft, minuteRigth] = String(minutes).padStart(2, "0").split('');
    const [secondLeft, secondRigth] = String(seconds).padStart(2, "0").split('');

    function startCountDown() {
        setActive(true);
    }

    useEffect(() => { 
        if(active && time > 0){
            setTimeout(()=>{
                setTime(time -1);
            },1000)
        }
    }, [active, time])

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

            <button onClick={startCountDown} type="button" className={styles.countDownButton}>Iniciar um ciclo</button>
        </div>
    )
}