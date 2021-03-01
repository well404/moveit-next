import React from 'react';
import { ChallengesContext } from './ChallengesContext';


interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
};

interface CountdownProviderProps {
    children: React.ReactNode;
};

export const CountdownContext = React.createContext({} as CountdownContextData);

let countdownTimeout: NodeJS.Timeout;
let INITIAL_TIME = 25 * 60;

export function CountdownProvider({ children }: CountdownProviderProps) {

    const { startNewChallenge } = React.useContext(ChallengesContext);

    const [time, setTime] = React.useState(INITIAL_TIME);
    const [isActive, setIsActive] = React.useState(false);
    const [hasFinished, setHasFinished] = React.useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown() {
        setIsActive(true);
    };

    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(INITIAL_TIME);
        setHasFinished(false);
    };

    React.useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(prev => prev -= 1)
            }, 1000);
        } else if (isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time]);

    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown
        }}>
            {children}
        </CountdownContext.Provider>
    );
};