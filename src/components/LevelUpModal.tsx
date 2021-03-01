import React from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/LevelUpModal.module.scss';

export function LevelUpModal() {

    const { level, closeLevelUpModal } = React.useContext(ChallengesContext);
    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header>{level}</header>
                <strong>Parabéns</strong>
                <p>Você alcançou um novo level.</p>
                <button
                    type="button"
                    onClick={closeLevelUpModal}
                >
                    <img src="/icons/close.svg" alt="Close icon" />
                </button>
            </div>
        </div>
    )
}