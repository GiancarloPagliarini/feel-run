import axios from "axios";
import { SPOTIFY_CONFIG } from "../config/spotify";

class SpotifyService {
  private accessToken: string | null = null;

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  private getHeaders() {
    return {
      Authorization: `Bearer ${this.accessToken}`,
      "Content-Type": "application/json",
    };
  }

  async searchTracks(query: string, limit: number = 10) {
    try {
      const response = await axios.get(
        `${SPOTIFY_CONFIG.API_BASE_URL}/search`,
        {
          headers: this.getHeaders(),
          params: {
            q: query,
            type: "track",
            limit,
          },
        }
      );
      return response.data.tracks.items;
    } catch (error) {
      console.error("Erro ao buscar músicas:", error);
      throw error;
    }
  }

  async searchTracksByBPM(bpm: number, limit: number = 10) {
    try {
      // Busca por playlists de corrida com BPM específico
      const bpmRange = `${bpm - 5}-${bpm + 5}`;
      const query = `bpm:${bpmRange} running workout`;

      const response = await axios.get(
        `${SPOTIFY_CONFIG.API_BASE_URL}/search`,
        {
          headers: this.getHeaders(),
          params: {
            q: query,
            type: "track",
            limit,
          },
        }
      );

      return response.data.tracks.items;
    } catch (error) {
      console.error("Erro ao buscar músicas por BPM:", error);
      throw error;
    }
  }

  async getRunningPlaylists(limit: number = 5) {
    try {
      const response = await axios.get(
        `${SPOTIFY_CONFIG.API_BASE_URL}/search`,
        {
          headers: this.getHeaders(),
          params: {
            q: "running workout bpm 140-160",
            type: "playlist",
            limit,
          },
        }
      );
      return response.data.playlists.items;
    } catch (error) {
      console.error("Erro ao buscar playlists de corrida:", error);
      throw error;
    }
  }

  async getTracksFromPlaylist(playlistId: string, limit: number = 20) {
    try {
      const response = await axios.get(
        `${SPOTIFY_CONFIG.API_BASE_URL}/playlists/${playlistId}/tracks`,
        {
          headers: this.getHeaders(),
          params: {
            limit,
          },
        }
      );
      return response.data.items.map((item: any) => item.track);
    } catch (error) {
      console.error("Erro ao buscar músicas da playlist:", error);
      throw error;
    }
  }

  async addToQueue(trackUri: string) {
    try {
      await axios.post(`${SPOTIFY_CONFIG.API_BASE_URL}/me/player/queue`, null, {
        headers: this.getHeaders(),
        params: {
          uri: trackUri,
        },
      });
      return true;
    } catch (error) {
      console.error("Erro ao adicionar à fila:", error);
      throw error;
    }
  }

  async addMultipleToQueue(trackUris: string[]) {
    try {
      // Adiciona músicas uma por vez para evitar rate limiting
      for (const uri of trackUris) {
        await this.addToQueue(uri);
        // Pequena pausa entre as adições
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      return true;
    } catch (error) {
      console.error("Erro ao adicionar múltiplas músicas à fila:", error);
      throw error;
    }
  }

  async getCurrentPlayback() {
    try {
      const response = await axios.get(
        `${SPOTIFY_CONFIG.API_BASE_URL}/me/player`,
        {
          headers: this.getHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao obter playback atual:", error);
      throw error;
    }
  }

  async getRecentlyPlayed(limit: number = 20) {
    try {
      const response = await axios.get(
        `${SPOTIFY_CONFIG.API_BASE_URL}/me/player/recently-played`,
        {
          headers: this.getHeaders(),
          params: {
            limit,
          },
        }
      );
      return response.data.items;
    } catch (error) {
      console.error("Erro ao obter músicas recentes:", error);
      throw error;
    }
  }

  async getTopTracks(limit: number = 20) {
    try {
      const response = await axios.get(
        `${SPOTIFY_CONFIG.API_BASE_URL}/me/top/tracks`,
        {
          headers: this.getHeaders(),
          params: {
            limit,
            time_range: "short_term",
          },
        }
      );
      return response.data.items;
    } catch (error) {
      console.error("Erro ao obter top tracks:", error);
      throw error;
    }
  }
}

export const spotifyService = new SpotifyService();
