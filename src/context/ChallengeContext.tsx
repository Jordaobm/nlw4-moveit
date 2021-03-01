import { createContext, ReactNode, useEffect, useState } from "react";
import Cookie from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from "../components/LevelUpModal";

interface Challenge {
    type: string;
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    levelUp(): void;
    currentExperience: number
    challengesCompleted: number;
    startNewChallenge(): void;
    activeChallenge: Challenge;
    resetChallenge(): void;
    experienceToNextLevel: number;
    completeChallenge(): void;
    closeLevelUpModal():void
}

export const ChallengesContext = createContext<ChallengesContextData>({} as ChallengesContextData)

interface ChallengesProviderProps {
    children: ReactNode;
    level: number,
    currentExperience: number,
    challengesCompleted: number,
}

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
    const [level, setLevel] = useState(rest.level);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted);
    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Cookie.set('level', String(level))
        Cookie.set('currentExperience', String(currentExperience))
        Cookie.set('challengesCompleted', String(challengesCompleted))
    }, [level, currentExperience, challengesCompleted])

    function levelUp() {
        setLevel(level + 1)
        setIsLevelUpModalOpen(true)
    }

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    function startNewChallenge() {

        const randonChallengesIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randonChallengesIndex];

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('Novo Desafio', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;
        if (finalExperience >= experienceToNextLevel) {
            levelUp();
            finalExperience = finalExperience - experienceToNextLevel;
        }
        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1)

    }

    function closeLevelUpModal(){
        setIsLevelUpModalOpen(false)
    }

    return (
        <ChallengesContext.Provider value={{
            level,
            levelUp,
            currentExperience,
            challengesCompleted,
            startNewChallenge,
            activeChallenge,
            resetChallenge,
            experienceToNextLevel,
            completeChallenge,
            closeLevelUpModal,
        }}>
            {children}
            {isLevelUpModalOpen && <LevelUpModal/>}
        </ChallengesContext.Provider>
    )

}