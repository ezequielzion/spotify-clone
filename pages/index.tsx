import type { NextPage, GetServerSideProps } from "next";
import { getSession, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";

import SpotifyPlayer from "react-spotify-web-playback";
import useSpotify from "../hooks/useSpotify";

import TopArtists from "../components/TopArtists";
import styles from "../styles/Home.module.css";
import TopSongs from "../components/TopSongs";

const Home: NextPage = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();

  const [topArtists, setTopArtists] = useState<SpotifyApi.ArtistObjectFull[]>(
    []
  );
  const [topSongs, setTopSongs] = useState<SpotifyApi.TrackObjectFull[]>([]);
  const [currentTrackId, setCurrentTrackId] = useState("");
  const [songInfo, setSongInfo] = useState<SpotifyApi.TrackObjectFull>();

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getMyTopArtists().then((data) => {
        setTopArtists(data.body.items);
      });

      spotifyApi.getMyTopTracks().then((data) => {
        setTopSongs(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  const playSong = async (song: SpotifyApi.TrackObjectFull) => {
    setCurrentTrackId(song.id);
  };

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrackId) {
        const fetchedSongInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentTrackId}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
          }
        ).then((res) => res.json());
        setSongInfo(fetchedSongInfo);
      }
    };
    fetchSongInfo();
  }, [currentTrackId, spotifyApi]);

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        if (data.body?.item?.id) {
          setCurrentTrackId(data.body?.item?.id);
        }
      });
    }
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
    }
  }, [currentTrackId, spotifyApi, session]);

  const accessToken: string = spotifyApi.getAccessToken()!;

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
        <button
          className={`${styles.signOut} ${styles.button}`}
          onClick={() => signOut()}
        >
          Sign out
        </button>
        <section className={styles.welcome}>
          Welcome, {session?.user?.name ?? "friend"}
        </section>
        <section className={styles.content}>
          <TopArtists topArtists={topArtists} />
          <TopSongs
            topSongs={topSongs}
            onPlaySong={playSong}
            currentSong={songInfo}
          />
        </section>
      </main>
      {songInfo && (
        <div className={styles.spotifyPlayer}>
          <SpotifyPlayer
            initialVolume={50}
            autoPlay={true}
            token={accessToken}
            uris={songInfo?.uri}
            styles={{
              color: "#fff",
              trackNameColor: "#fff",
              trackArtistColor: "#ececec",
              bgColor: "hsl(0, 0%, 10%)",
              height: "5em",
            }}
          />
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
};

export default Home;
