import styled from "styled-components";

const media = {
  mobile: "@media(max-width: 600px)",
};

export const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-around;
  width: 40%;
  ${media.mobile} {
    width: 100%;
  }
`;

export const Title = styled.h2`
  font-size: 3em;
  margin: 1vh 0;
  color: white;
  text-align: center;
  font-family: "Montserrat";
  ${media.mobile} {
    font-size: 3.5em;
  }
`;

export const Artists = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  color: white;
`;

export const Artist = styled.a`
  background-color: hsl(0, 0%, 10%);
  height: 16em;
  width: 25%;
  min-width: 12em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1em 1em;
  border-radius: 0.3em;
  font-family: "Montserrat";
  font-weight: 600;
  box-shadow: 0 0.7em 0.5em 0 hsl(0, 0%, 5%) 0.5;

  transition: background-color 0.3s ease;

  &:hover {
    cursor: pointer;
    background-color: hsl(0, 0%, 12%);
    transition: 0.3s ease;
  }

  ${media.mobile} {
    min-width: 18em;
    border-radius: 0.5em;
    height: 22em;
    margin-bottom: 2em;
  }
`;

export const ArtistName = styled.p`
  display: flex;
  color: white;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 0.5em 0;
  font-size: 1.1em;
  text-align: center;
  word-break: break-word;
  width: 83%;
`;

export const ArtistImage = styled.img`
  display: flex;
  min-width: 70%;
  width: 10em;
  height: 10em;
  object-fit: cover;
  flex-direction: column;
  border-radius: 0.25em;
  margin-bottom: 0.5em;
  box-shadow: 0 0 1em 0.3em hsl(0, 0%, 12%);

  ${media.mobile} {
    height: 13em;
    width: 13em;
    border-radius: 0.5em;
  }
`;
