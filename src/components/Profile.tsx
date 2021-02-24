import styles from '../styles/components/Profile.module.scss';

export function Profile() {
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/well404.png" alt="Wellington junio da silva albuquerque" />
            <div>
                <strong>Wellington Albuquerque</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level 1
                </p>
            </div>
        </div>
    );
};