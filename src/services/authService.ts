import axios from "axios";
import { SPOTIFY_CONFIG } from "../config/spotify";

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export class AuthService {
  static async exchangeCodeForToken(code: string): Promise<TokenResponse> {
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
      throw new Error("Falha na autenticação");
    }
  }

  static async refreshToken(refreshToken: string): Promise<TokenResponse> {
    try {
      const response = await axios.post(
        `${SPOTIFY_CONFIG.AUTH_BASE_URL}/api/token`,
        new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
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
      console.error("Erro ao renovar token:", error);
      throw new Error("Falha na renovação do token");
    }
  }
}

// Nota: Em um ambiente de produção, você deve implementar um backend
// para fazer a troca do código por token, pois o client_secret
// não deve ser exposto no frontend/mobile app.
