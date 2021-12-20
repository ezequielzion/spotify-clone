import { useEffect, useState } from "react";
import useSpotify from "./useSpotify";

const useSongInfo = (currentTrackId: SpotifyApi.TrackObjectFull) => {
  const spotifyApi = useSpotify();
  const [songInfo, setSongInfo] = useState(null);

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrackId) {
        const fetchedSongInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentTrackId}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken}`,
            },
          }
        ).then((res) => res.json());
        setSongInfo(fetchedSongInfo);
      }
    };
    fetchSongInfo();
  }, [currentTrackId, spotifyApi]); //ESTO LO TENGO QUE SACAR DE ACÁ!, BAH, NO NECESARIAMENTE, O SÍ?

  return songInfo;
};

export default useSongInfo;
