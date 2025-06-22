import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { spotifyService } from "../services/spotifyService";

export const DebugAuth = () => {
  const [debugInfo, setDebugInfo] = useState<string>("");

  const testSpotifyConnection = async () => {
    try {
      setDebugInfo("Testando conexão com Spotify...\n");

      // Testa se consegue obter o perfil do usuário
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${spotifyService.getAccessToken()}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setDebugInfo(
          (prev) =>
            prev +
            `✅ Conexão OK!\nUsuário: ${userData.display_name}\nEmail: ${userData.email}\n`
        );
      } else {
        const errorData = await response.text();
        setDebugInfo(
          (prev) => prev + `❌ Erro ${response.status}: ${errorData}\n`
        );
      }
    } catch (error) {
      setDebugInfo((prev) => prev + `❌ Erro de conexão: ${error}\n`);
    }
  };

  const testSearchTracks = async () => {
    try {
      setDebugInfo((prev) => prev + "Testando busca de músicas...\n");

      const tracks = await spotifyService.searchTracks("running", 5);
      setDebugInfo(
        (prev) => prev + `✅ Busca OK! Encontradas ${tracks.length} músicas\n`
      );

      if (tracks.length > 0) {
        setDebugInfo(
          (prev) =>
            prev +
            `Primeira música: ${tracks[0].name} - ${tracks[0].artists[0].name}\n`
        );
      }
    } catch (error) {
      setDebugInfo((prev) => prev + `❌ Erro na busca: ${error}\n`);
    }
  };

  const testAddToQueue = async () => {
    try {
      setDebugInfo((prev) => prev + "Testando adição à fila...\n");

      // Primeiro busca uma música
      const tracks = await spotifyService.searchTracks("running", 1);
      if (tracks.length > 0) {
        await spotifyService.addToQueue(tracks[0].uri);
        setDebugInfo(
          (prev) => prev + `✅ Adicionado à fila: ${tracks[0].name}\n`
        );
      } else {
        setDebugInfo(
          (prev) => prev + "❌ Nenhuma música encontrada para testar\n"
        );
      }
    } catch (error) {
      setDebugInfo((prev) => prev + `❌ Erro ao adicionar à fila: ${error}\n`);
    }
  };

  const clearDebug = () => {
    setDebugInfo("");
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      <View className="bg-white rounded-2xl p-6 mb-4 shadow-sm">
        <Text className="text-xl font-bold text-gray-800 mb-4">
          Debug de Autenticação
        </Text>

        <View className="space-y-3 mb-4">
          <TouchableOpacity
            onPress={testSpotifyConnection}
            className="bg-blue-500 py-3 px-4 rounded-lg"
          >
            <Text className="text-white text-center font-semibold">
              Testar Conexão Spotify
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={testSearchTracks}
            className="bg-green-500 py-3 px-4 rounded-lg"
          >
            <Text className="text-white text-center font-semibold">
              Testar Busca de Músicas
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={testAddToQueue}
            className="bg-purple-500 py-3 px-4 rounded-lg"
          >
            <Text className="text-white text-center font-semibold">
              Testar Adição à Fila
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={clearDebug}
            className="bg-gray-500 py-3 px-4 rounded-lg"
          >
            <Text className="text-white text-center font-semibold">
              Limpar Debug
            </Text>
          </TouchableOpacity>
        </View>

        {debugInfo ? (
          <View className="bg-gray-100 rounded-lg p-4">
            <Text className="text-sm font-mono text-gray-800 whitespace-pre-wrap">
              {debugInfo}
            </Text>
          </View>
        ) : (
          <Text className="text-gray-500 text-center">
            Toque nos botões acima para testar a conexão
          </Text>
        )}
      </View>
    </ScrollView>
  );
};
