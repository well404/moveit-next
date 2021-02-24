import Head from 'next/head';

import styles from '../styles/pages/Home.module.scss';

import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { CompletedCHallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ChallengeBox } from '../components/ChallengeBox';


export default function Home() {
  return (
    <div className={styles.container}>

      <Head>
        <title>Início | move.it</title>
      </Head>
      <ExperienceBar />

      <section>
        <div>
          <Profile />
          <CompletedCHallenges />
          <Countdown />
        </div>
        <ChallengeBox />
        <div>

        </div>
      </section>
    </div>
  );
};