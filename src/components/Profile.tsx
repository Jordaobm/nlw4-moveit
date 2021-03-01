import { useContext } from 'react';
import { ChallengesContext } from '../context/ChallengeContext';
import { useUser } from '../context/user';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
    const { level } = useContext(ChallengesContext);
    const { user } = useUser();

    return (
        <div className={styles.profileContainer}>
            <img src={user.avatar_url} alt={user.name} />
            <div>
                <strong>{user.name}</strong>
                <p>
                    <img src="icons/level.svg" alt="" />
                    Level {level}
                </p>
            </div>
        </div>
    )
}