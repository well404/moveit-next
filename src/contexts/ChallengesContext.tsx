import React from 'react';
import challenges from '../../challenges.json';



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
};

interface ChallengesProviderProps {
    children: React.ReactNode;
};

export const ChallengesContext = React.createContext({} as ChallengesContextData);

export default function ChallengesProvider({ children }: ChallengesProviderProps) {

    const [level, setLevel] = React.useState(1);
    const [currentExperience, setCurrentExperience] = React.useState(0);
    const [challengesCompleted, setChallengesCompleted] = React.useState(0);
    const [activeChallenge, setActiveChallenge] = React.useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);


    React.useEffect(() => {
        Notification.requestPermission();
    }, []);

    function levelUp() {
        setLevel(prev => prev += 1);
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
                completeChallenge

            }
        }>
            {children}
        </ChallengesContext.Provider>
    );
};