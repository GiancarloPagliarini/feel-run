import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Text,
  TextInput,
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

export const MusicSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingToQueue, setIsAddingToQueue] = useState<string | null>(null);

  const searchTracks = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      const results = await spotifyService.searchTracks(searchQuery, 20);
      setTracks(results);
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível buscar as músicas. Verifique sua conexão."
      );
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
    <View className="flex-row items-center p-4 bg-white rounded-lg mb-2 shadow-sm">
      <Image
        source={{ uri: item.album.images[0]?.url }}
        className="w-12 h-12 rounded-md mr-3"
        resizeMode="cover"
      />
      <View className="flex-1">
        <Text className="font-semibold text-gray-800 text-sm" numberOfLines={1}>
          {item.name}
        </Text>
        <Text className="text-gray-600 text-xs" numberOfLines={1}>
          {item.artists.map((artist) => artist.name).join(", ")}
        </Text>
        <Text className="text-gray-500 text-xs" numberOfLines={1}>
          {item.album.name}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => addToQueue(item)}
        disabled={isAddingToQueue === item.id}
        className="bg-green-500 px-4 py-2 rounded-full"
      >
        {isAddingToQueue === item.id ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <Text className="text-white font-semibold text-xs">Adicionar</Text>
        )}
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 p-4">
      <View className="mb-4">
        <Text className="text-2xl font-bold text-gray-800 mb-2">
          Adicionar à Fila do Spotify
        </Text>
        <Text className="text-gray-600 mb-4">
          Busque por músicas e adicione-as à sua fila do Spotify
        </Text>
      </View>

      <View className="flex-row mb-4">
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Buscar músicas..."
          className="flex-1 border border-gray-300 rounded-l-lg px-4 py-3 text-gray-800"
          onSubmitEditing={searchTracks}
        />
        <TouchableOpacity
          onPress={searchTracks}
          disabled={isLoading}
          className="bg-blue-500 px-6 py-3 rounded-r-lg"
        >
          {isLoading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text className="text-white font-semibold">Buscar</Text>
          )}
        </TouchableOpacity>
      </View>

      <FlatList
        data={tracks}
        renderItem={renderTrack}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !isLoading && searchQuery ? (
            <View className="flex-1 justify-center items-center py-8">
              <Text className="text-gray-500 text-center">
                Nenhuma música encontrada para &quot;{searchQuery}&quot;
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};
