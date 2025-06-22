import axios from "axios";
import * as WebBrowser from "expo-web-browser";
import { useState } from "react";
import { getSpotifyAuthUrl, SPOTIFY_CONFIG } from "../config/spotify";
import { spotifyService } from "../services/spotifyService";

WebBrowser.maybeCompleteAuthSession();

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export const useSpotifyAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const exchangeCodeForToken = async (code: string): Promise<TokenResponse> => {
    try {
      const response = await axios.post(
        `${SPOTIFY_CONFIG.AUTH_BASE_URL}/api/token`,
        new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: SPOTIFY_CONFIG.REDIRECT_URI,
          client_id: SPOTIFY_CONFIG.CLIENT_ID,
          client_secret: SPOTIFY_CONFIG.CLIENT_SECRET,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Erro ao trocar código por token:", error);
      throw new Error("Falha na autenticação com Spotify");
    }
  };

  const authenticate = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const authUrl = getSpotifyAuthUrl();
      const result = await WebBrowser.openAuthSessionAsync(
        authUrl,
        "exp://localhost:8081"
      );

      if (result.type === "success" && result.url) {
        const url = new URL(result.url);
        const code = url.searchParams.get("code");

        if (code) {
          // Troca o código por um token de acesso real
          const tokenResponse = await exchangeCodeForToken(code);
          spotifyService.setAccessToken(tokenResponse.access_token);
          setIsAuthenticated(true);
        } else {
          setError("Código de autorização não recebido");
        }
      } else if (result.type === "cancel") {
        setError("Autenticação cancelada pelo usuário");
      } else {
        setError("Falha na autenticação");
      }
    } catch (err) {
      console.error("Erro na autenticação:", err);
      setError("Erro na autenticação: " + (err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    spotifyService.setAccessToken("");
    setIsAuthenticated(false);
    setError(null);
  };

  return {
    isAuthenticated,
    isLoading,
    error,
    authenticate,
    logout,
  };
};
