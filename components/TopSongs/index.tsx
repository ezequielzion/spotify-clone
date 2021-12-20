import { FC } from "react";
import {
  RootContainer,
  Title,
  Songs,
  Song,
  SongImage,
  TitleAndArtists,
  SongTitle,
  SongArtists,
} from "./styles";

type Props = {
  topSongs: SpotifyApi.TrackObjectFull[];
  currentSong?: SpotifyApi.TrackObjectFull;
  onPlaySong: (song: SpotifyApi.TrackObjectFull) => void;
};

const TopSongs: FC<Props> = ({ topSongs, currentSong, onPlaySong }: Props) => {
  return (
    <RootContainer>
      <Title>Your top songs</Title>
      <Songs>
        {topSongs.map((song) => (
          <Song
            key={song.id}
            onClick={() => onPlaySong(song)}
            isPlaying={song.id === currentSong?.id}
          >
            <SongImage src={song.album.images[2].url} />
            <TitleAndArtists>
              <SongTitle>{song.name}</SongTitle>
              <SongArtists>
                {song.artists.map((artist, i) =>
                  i + 1 !== song.artists.length
                    ? `${artist.name}, `
                    : `${artist.name}`
                )}
              </SongArtists>
            </TitleAndArtists>
          </Song>
        ))}
      </Songs>
    </RootContainer>
  );
};

export default TopSongs;
