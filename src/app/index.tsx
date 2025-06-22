import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DebugAuth } from "../components/DebugAuth";
import { RunningSession } from "../components/RunningSession";
import { useSpotifyAuth } from "../hooks/useSpotifyAuth";

export default function Index() {
  const { isAuthenticated, isLoading, error, authenticate, logout } =
    useSpotifyAuth();
  const [showDebug, setShowDebug] = useState(false);

  const handleAuthenticate = async () => {
    await authenticate();
  };

  const handleLogout = () => {
    Alert.alert(
      "Sair",
      "Tem certeza que deseja sair da sua conta do Spotify?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sair", onPress: logout, style: "destructive" },
      ]
    );
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#1DB954" />
        <Text className="text-gray-600 mt-4 text-lg">
          Conectando ao Spotify...
        </Text>
      </View>
    );
  }

  if (!isAuthenticated) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50 p-6">
        <View className="bg-white rounded-2xl p-8 shadow-lg max-w-sm w-full">
          <View className="items-center mb-8">
            <View className="w-20 h-20 bg-green-500 rounded-full items-center justify-center mb-4">
              <Text className="text-white text-3xl font-bold">🏃</Text>
            </View>
            <Text className="text-2xl font-bold text-gray-800 mb-2">
              Feel Run
            </Text>
            <Text className="text-gray-600 text-center">
              Seu assistente de música para corrida
            </Text>
          </View>

          {error && (
            <View className="bg-red-100 border border-red-300 rounded-lg p-3 mb-4">
              <Text className="text-red-700 text-sm">{error}</Text>
            </View>
          )}

          <TouchableOpacity
            onPress={handleAuthenticate}
            className="bg-green-500 py-4 rounded-xl mb-4"
          >
            <Text className="text-white text-center font-semibold text-lg">
              Conectar com Spotify
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowDebug(true)}
            className="bg-gray-500 py-2 rounded-lg mb-4"
          >
            <Text className="text-white text-center font-semibold">
              Debug (Temporário)
            </Text>
          </TouchableOpacity>

          <Text className="text-gray-500 text-xs text-center">
            Você será redirecionado para o Spotify para autorizar o acesso
          </Text>
        </View>
      </View>
    );
  }

  if (showDebug) {
    return (
      <View className="flex-1 bg-gray-50">
        <View className="bg-white shadow-sm pt-12 pb-4 px-4">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-2xl font-bold text-gray-800">Debug</Text>
              <Text className="text-gray-600">Teste de autenticação</Text>
            </View>
            <TouchableOpacity
              onPress={() => setShowDebug(false)}
              className="bg-gray-200 px-4 py-2 rounded-lg"
            >
              <Text className="text-gray-700 font-semibold">Voltar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <DebugAuth />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white shadow-sm pt-12 pb-4 px-4">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-bold text-gray-800">Feel Run</Text>
            <Text className="text-gray-600">
              Assistente de música para corrida
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-gray-200 px-4 py-2 rounded-lg"
          >
            <Text className="text-gray-700 font-semibold">Sair</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Conteúdo Principal */}
      <RunningSession />
    </View>
  );
}
