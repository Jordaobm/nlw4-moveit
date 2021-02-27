import { useContext } from 'react';
import { ChallengesContext } from '../context/ChallengeContext';
import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
    const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext);
    const percetenToNextLevel = 100 * currentExperience / experienceToNextLevel
    
    return (
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{ width: `${percetenToNextLevel}%` }} />
                <span className={styles.currentExperience} style={{ left: `${percetenToNextLevel}%` }}>
                    {percetenToNextLevel !== 0 ? `${currentExperience}xp` : ``}
                </span>
            </div>
            <span>{experienceToNextLevel}xp</span>
        </header>
    )
}