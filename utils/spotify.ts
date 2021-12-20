import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
  "streaming",
  "user-top-read",
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-read-email",
  "user-read-private",
  "user-modify-playback-state",
  "user-read-playback-position",
].join(",");

const params = { scope: scopes };

const queryParamsString: string = new URLSearchParams(params).toString();

export const LOGIN_URL: string = `https://accounts.spotify.com/authorize?${queryParamsString}`;

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

export default spotifyApi;
