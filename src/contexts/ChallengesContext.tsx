import React from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
};

interface ChallengesContextData {
    level: Number;
    currentExperience: number;
    experienceToNextLevel: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
};

interface ChallengesProviderProps {
    children: React.ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
};

export const ChallengesContext = React.createContext({} as ChallengesContextData);

export default function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {

    const [level, setLevel] = React.useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = React.useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = React.useState(rest.challengesCompleted ?? 0);
    const [activeChallenge, setActiveChallenge] = React.useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = React.useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);


    React.useEffect(() => {
        Notification.requestPermission();
    }, []);

    React.useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentExperience, challengesCompleted]);

    function levelUp() {
        setLevel(prev => prev += 1);
        setIsLevelUpModalOpen(true);
    };

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false);
    };

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio 🎉', {
                body: `Valendo ${challenge.amount}xp!`
            });
        };
    };

    function resetChallenge() {
        setActiveChallenge(null);
    };


    function completeChallenge() {
        if (!activeChallenge) {
            return;
        };

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        };

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(prev => prev += 1);
    };

    return (
        <ChallengesContext.Provider value={
            {
                level,
                currentExperience,
                experienceToNextLevel,
                challengesCompleted,
                activeChallenge,
                levelUp,
                startNewChallenge,
                resetChallenge,
                completeChallenge,
                closeLevelUpModal
            }
        }>
            {children}
            {isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    );
};