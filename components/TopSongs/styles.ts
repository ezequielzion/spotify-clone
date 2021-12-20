import styled from "styled-components";
type Song = {
  isPlaying: boolean;
};

const media = {
  mobile: "@media(max-width: 600px)",
};

export const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  ${media.mobile} {
    width: 100%;
  }
`;

export const Title = styled.h2`
  font-size: 3em;
  text-align: center;
  margin: 1vh 0;
  color: white;
  font-family: "Montserrat";
  ${media.mobile} {
    font-size: 3em;
  }
`;

export const Songs = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 1em;
  width: 100%;
  color: white;
`;

export const Song = styled.div<Song>`
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: 5em;
  padding: 0.75em;
  margin-bottom: 0.5em;
  font-family: "Montserrat";
  background-color: hsl(0, 0%, 10%);
  border-radius: 0.25em;
  transition: 0.2s ease;
  box-shadow: 0 0.7em 0.5em 0 hsl(0, 0%, 5%) 0.5;
  overflow: hidden;

  &:hover {
    cursor: pointer;
    opacity: 0.35;
    transition: 0.2s ease;
  }

  ${({ isPlaying }) =>
    isPlaying &&
    `
    opacity: 0.2;
    border: 1px solid hsl(0, 0%, 1.5%);

  `}
`;

export const SongImage = styled.img`
  width: 3.5em;
  margin-right: 1em;
  border-radius: 0.2em;
`;

export const TitleAndArtists = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
`;

export const SongTitle = styled.p`
  font-size: calc(0.75em + 0.75vw);
  margin: 0 0 0.5vw 0;
  font-weight: 500;
  ${media.mobile} {
    font-size: calc(0.55em + 1.5vw); //min-font size
    margin: 0 0 0.5vw 0;
  }
`;

export const SongArtists = styled.p`
  font-size: 0.9em;
  margin: 0;
  font-weight: 400;
  ${media.mobile} {
    font-size: calc(0.55em + 1vw); //min-font size
  }
`;
