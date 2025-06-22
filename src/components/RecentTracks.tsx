import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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

export const RecentTracks = () => {
  const [recentTracks, setRecentTracks] = useState<Track[]>([]);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToQueue, setIsAddingToQueue] = useState<string | null>(null);

  useEffect(() => {
    loadTracks();
  }, []);

  const loadTracks = async () => {
    setIsLoading(true);
    try {
      const [recent, top] = await Promise.all([
        spotifyService.getRecentlyPlayed(10),
        spotifyService.getTopTracks(10),
      ]);

      setRecentTracks(recent.map((item: any) => item.track));
      setTopTracks(top);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as músicas.");
    } finally {
      setIsLoading(false);
    }
  };

  const addToQueue = async (track: Track) => {
    setIsAddingToQueue(track.id);
    try {
      await spotifyService.addToQueue(track.uri);
      Alert.alert(
        "Sucesso!",
        `${track.name} foi adicionada à fila do Spotify!`
      );
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível adicionar à fila. Certifique-se de que o Spotify está aberto e tocando música."
      );
    } finally {
      setIsAddingToQueue(null);
    }
  };

  const renderTrack = ({ item }: { item: Track }) => (
    <View className="flex-row items-center p-3 bg-white rounded-lg mb-2 shadow-sm">
      <Image
        source={{ uri: item.album.images[0]?.url }}
        className="w-10 h-10 rounded-md mr-3"
        resizeMode="cover"
      />
      <View className="flex-1">
        <Text className="font-semibold text-gray-800 text-sm" numberOfLines={1}>
          {item.name}
        </Text>
        <Text className="text-gray-600 text-xs" numberOfLines={1}>
          {item.artists.map((artist) => artist.name).join(", ")}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => addToQueue(item)}
        disabled={isAddingToQueue === item.id}
        className="bg-green-500 px-3 py-1 rounded-full"
      >
        {isAddingToQueue === item.id ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <Text className="text-white font-semibold text-xs">+</Text>
        )}
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#1DB954" />
        <Text className="text-gray-600 mt-2">Carregando músicas...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4">
      <View className="mb-6">
        <Text className="text-xl font-bold text-gray-800 mb-2">
          Suas Músicas
        </Text>
        <Text className="text-gray-600">
          Músicas recentes e favoritas para adicionar à fila
        </Text>
      </View>

      <View className="mb-6">
        <Text className="text-lg font-semibold text-gray-800 mb-3">
          Músicas Recentes
        </Text>
        <FlatList
          data={recentTracks}
          renderItem={renderTrack}
          keyExtractor={(item) => `recent-${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={
            <Text className="text-gray-500 text-center py-4">
              Nenhuma música recente encontrada
            </Text>
          }
        />
      </View>

      <View className="flex-1">
        <Text className="text-lg font-semibold text-gray-800 mb-3">
          Suas Favoritas
        </Text>
        <FlatList
          data={topTracks}
          renderItem={renderTrack}
          keyExtractor={(item) => `top-${item.id}`}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text className="text-gray-500 text-center py-4">
              Nenhuma música favorita encontrada
            </Text>
          }
        />
      </View>
    </View>
  );
};
