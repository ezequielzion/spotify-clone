import type { NextPage, GetServerSideProps } from "next";
import { getSession, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

import SpotifyPlayer from "react-spotify-web-playback";
import useSpotify from "../hooks/useSpotify";

import TopArtists from "../components/TopArtists";
import TopSongs from "../components/TopSongs";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const spotifyApi = useSpotify();
  const router = useRouter();
  const { data: session } = useSession();
  const accessToken: string = spotifyApi.getAccessToken()!;

  const [topArtists, setTopArtists] = useState<SpotifyApi.ArtistObjectFull[]>(
    []
  );
  const [topSongs, setTopSongs] = useState<SpotifyApi.TrackObjectFull[]>([]);
  const [currentTrackId, setCurrentTrackId] = useState("");
  const [songInfo, setSongInfo] = useState<SpotifyApi.TrackObjectFull>();

  //If the user hasn't logged in yet, they can't see home view
  useEffect(() => {
    if (!session?.user) {
      router.push("/login");
    }
  }, []);

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

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
    }
  }, [currentTrackId, spotifyApi, session]);

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

  const playSong = async (song: SpotifyApi.TrackObjectFull) => {
    setCurrentTrackId(song.id);
  };

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
      {session?.user ? (
        <>
          <main className={styles.main}>
            <button
              className={`${styles.signOut} ${styles.button}`}
              onClick={() => signOut({ callbackUrl: "/login" })}
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
        </>
      ) : null}
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
