# How to run
1. Download the project and open a terminal on the source folder
2. Run `nvm use 16.13`. You need to have `node version manager` installed.
3. Create a `.env.local` file in the base directory of the project and paste the following code:
```
NEXTAUTH_URL=http://localhost:3000

NEXT_PUBLIC_CLIENT_ID=5159cb37acf8461783fd321316eb9c41

NEXT_PUBLIC_CLIENT_SECRET=378d70b971fd412e826aad6de40b744a

JWT_SECRET=eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY0MDAxMjI0NCwiaWF0IjoxNjQwMDEyMjQ0fQ.vaPFVpX3OKmtIyRnGEUuqPEfm5dTRJDyskQSX5ejbII
```
4. Run the project using `npm run dev`. Make sure to be using port 3000, otherwise it will throw an invalid uri error

# What's the task?
## Develop a simple two-screen application:
- Login screen
- Result screen

### Integration with the Spotify API (https://developer.spotify.com/documentation/web-api/reference/#/).
1. You have to be able to log in with Spotify.
2. The result view should show a list with the user's top Artist and a list with the top Tracks.
3. The track must be able to reproduce its preview (if available).

### Important.

- Must be developed in `ReactJS`.
- Must use `TypeScript`.
- `NextJS` can be used.
- Steps must be documented in order to test the application.
- Any `CSS` framework can be used in the mockup.
- The mockup must be responsive.
