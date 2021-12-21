import { getProviders, signIn } from "next-auth/react";
import { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import spotifyIcon from "../public/spotify-icon-256px.png";
import Image from "next/image";

const Login: NextPage = ({ providers }: any) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Spotify clone</title>
        <link rel="icon" href="/spotify.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main className={styles.main}>
        <div className={styles.loginContainer}>
          <div className={styles.logo}>
            <Image src={spotifyIcon} alt="Spotify logo" />
          </div>
          {Object.values(providers).map((provider: any) => (
            <button
              key={provider.name}
              className={`${styles.login} ${styles.button}`}
              onClick={() => signIn("spotify", { callbackUrl: "/" })}
            >
              Login with {provider.name}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
