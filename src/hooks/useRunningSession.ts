import { useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import { spotifyService } from "../services/spotifyService";

interface Track {
  id: string;
  name: string;
  artists: { name: string }[];
  album: {
    name: string;
    images: { url: string }[];
  };
  uri: string;
}

export const useRunningSession = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentBPM, setCurrentBPM] = useState(140); // BPM fixo por enquanto
  const [tracksAdded, setTracksAdded] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [lastAddedTrack, setLastAddedTrack] = useState<Track | null>(null);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tracksQueueRef = useRef<Track[]>([]);

  // Simula a verificação do BPM a cada minuto
  const startBPMMonitoring = () => {
    setIsRunning(true);
    setTracksAdded(0);
    setLastAddedTrack(null);

    // Adiciona músicas imediatamente ao começar
    addTracksForBPM(currentBPM);

    // Configura o intervalo para adicionar músicas a cada minuto
    intervalRef.current = setInterval(() => {
      addTracksForBPM(currentBPM);
    }, 60000); // 60 segundos = 1 minuto
  };

  const stopBPMMonitoring = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const addTracksForBPM = async (bpm: number) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      // Busca músicas com BPM similar
      const tracks = await spotifyService.searchTracksByBPM(bpm, 5);

      if (tracks.length === 0) {
        // Fallback: busca playlists de corrida
        const playlists = await spotifyService.getRunningPlaylists(3);
        if (playlists.length > 0) {
          const randomPlaylist =
            playlists[Math.floor(Math.random() * playlists.length)];
          const playlistTracks = await spotifyService.getTracksFromPlaylist(
            randomPlaylist.id,
            5
          );
          tracks.push(...playlistTracks);
        }
      }

      if (tracks.length > 0) {
        // Seleciona 2-3 músicas aleatoriamente
        const selectedTracks = tracks
          .sort(() => Math.random() - 0.5)
          .slice(0, Math.min(3, tracks.length));

        // Adiciona à fila do Spotify
        const trackUris = selectedTracks.map((track: Track) => track.uri);
        await spotifyService.addMultipleToQueue(trackUris);

        // Atualiza o estado
        setTracksAdded((prev) => prev + selectedTracks.length);
        setLastAddedTrack(selectedTracks[0]);

        // Adiciona à fila local para referência
        tracksQueueRef.current.push(...selectedTracks);

        Alert.alert(
          "Músicas Adicionadas!",
          `${selectedTracks.length} músicas foram adicionadas à sua fila do Spotify para BPM ${bpm}.`
        );
      } else {
        Alert.alert(
          "Nenhuma música encontrada",
          "Não foi possível encontrar músicas adequadas para o seu BPM atual."
        );
      }
    } catch (error) {
      console.error("Erro ao adicionar músicas:", error);
      Alert.alert(
        "Erro",
        "Não foi possível adicionar músicas à fila. Verifique se o Spotify está aberto e tocando música."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const updateBPM = (newBPM: number) => {
    setCurrentBPM(newBPM);
    if (isRunning) {
      // Se estiver rodando, para e reinicia com o novo BPM
      stopBPMMonitoring();
      startBPMMonitoring();
    }
  };

  // Limpa o intervalo quando o componente é desmontado
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    isRunning,
    currentBPM,
    tracksAdded,
    isLoading,
    lastAddedTrack,
    startBPMMonitoring,
    stopBPMMonitoring,
    updateBPM,
    addTracksForBPM,
  };
};
