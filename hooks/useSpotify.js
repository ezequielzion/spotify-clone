import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import spotifyApi from "../utils/spotify";

const useSpotify = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      if (session.error === "RefreshAccessTokenError") {
        console.log("Session error: RefreshAccessTokenError");
        signIn();
      }

      spotifyApi.setAccessToken(session?.user?.accessToken);
    }
  }, [session]);

  return spotifyApi;
};

export default useSpotify;
