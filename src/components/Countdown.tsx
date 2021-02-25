import React from 'react';
import styles from '../styles/components/Countdown.module.scss';
import { CountdownContext } from '../contexts/CountdownContext';

export function Countdown() {
    const { minutes, seconds, hasFinished, isActive, resetCountdown, startCountdown } = React.useContext(CountdownContext);

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            { hasFinished ? (
                <button
                    disabled
                    className={styles.countdownButton}
                >
                    Ciclo encerrado
                    <img src="icons/check.svg" alt="Check icon" />
                </button>
            ) : (
                    <React.Fragment>
                        { isActive ? (
                            <button
                                type="button"
                                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                                onClick={resetCountdown}
                            >
                                Abandonar ciclo
                                <img src="icons/close.svg" alt="Close icon" />
                            </button>
                        ) : (
                                <button
                                    type="button"
                                    className={styles.countdownButton}
                                    onClick={startCountdown}
                                >
                                    Iniciar um ciclo
                                    <img src="icons/play.svg" alt="Play icon" />
                                </button>
                            )
                        }
                    </React.Fragment>
                )
            }



        </div>
    );
};