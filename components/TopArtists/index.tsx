import { FC } from "react";
import {
  RootContainer,
  Title,
  Artists,
  Artist,
  ArtistName,
  ArtistImage,
} from "./styles";

type Props = {
  topArtists: SpotifyApi.ArtistObjectFull[];
};

const TopArtists: FC<Props> = ({ topArtists }: Props) => {
  return (
    <RootContainer>
      <Title>Your top artists</Title>
      <Artists>
        {topArtists.map((artist: SpotifyApi.ArtistObjectFull) => (
          <Artist
            key={artist.name}
            href={artist.external_urls.spotify}
            target="_blank"
          >
            <ArtistImage src={artist.images[0].url} />
            <ArtistName>{artist.name}</ArtistName>
          </Artist>
        ))}
      </Artists>
    </RootContainer>
  );
};

export default TopArtists;
