import React from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/CompletedChallenges.module.scss';

export function CompletedCHallenges() {

    const { challengesCompleted } = React.useContext(ChallengesContext);
    return (
        <div className={styles.completedChallengesContainer}>
            <span>Desafios completos</span>
            <span>{challengesCompleted}</span>
        </div>
    );
};