export const SPOTIFY_CONFIG = {
  CLIENT_ID: "a563481774774aa7979309c4608688fc", // Substitua pelo seu Client ID do Spotify
  CLIENT_SECRET: "72d1f1571594496390f3a2b51653eb35", // Substitua pelo seu Client Secret do Spotify
  REDIRECT_URI: "exp://localhost:8081", // URI de redirecionamento para Expo
  SCOPES: [
    "user-read-private",
    "user-read-email",
    "playlist-read-private",
    "playlist-modify-public",
    "playlist-modify-private",
    "user-modify-playback-state",
    "user-read-playback-state",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-top-read",
    "streaming",
  ].join(" "),
  API_BASE_URL: "https://api.spotify.com/v1",
  AUTH_BASE_URL: "https://accounts.spotify.com",
};

export const getSpotifyAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: SPOTIFY_CONFIG.CLIENT_ID,
    response_type: "code",
    redirect_uri: SPOTIFY_CONFIG.REDIRECT_URI,
    scope: SPOTIFY_CONFIG.SCOPES,
    show_dialog: "true",
  });

  return `${SPOTIFY_CONFIG.AUTH_BASE_URL}/authorize?${params.toString()}`;
};
