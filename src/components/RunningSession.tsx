import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRunningSession } from "../hooks/useRunningSession";

export const RunningSession = () => {
  const {
    isRunning,
    currentBPM,
    tracksAdded,
    isLoading,
    lastAddedTrack,
    startBPMMonitoring,
    stopBPMMonitoring,
    updateBPM,
  } = useRunningSession();

  const [selectedBPM, setSelectedBPM] = useState(currentBPM);

  const handleStart = () => {
    Alert.alert(
      "Iniciar Sessão de Corrida",
      `Deseja iniciar a sessão com BPM ${selectedBPM}? O app irá adicionar músicas automaticamente à sua fila do Spotify a cada minuto.`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "COMEÇAR",
          onPress: () => {
            updateBPM(selectedBPM);
            startBPMMonitoring();
          },
          style: "default",
        },
      ]
    );
  };

  const handleStop = () => {
    Alert.alert("Parar Sessão", "Deseja parar a sessão de corrida?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Parar",
        onPress: stopBPMMonitoring,
        style: "destructive",
      },
    ]);
  };

  const bpmOptions = [130, 140, 150, 160, 170, 180];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        {/* Header */}
        <View className="items-center mb-8">
          <View className="w-24 h-24 bg-green-500 rounded-full items-center justify-center mb-4">
            <Text className="text-white text-4xl font-bold">🏃</Text>
          </View>
          <Text className="text-3xl font-bold text-gray-800 mb-2">
            Feel Run
          </Text>
          <Text className="text-gray-600 text-center text-lg">
            Seu assistente de música para corrida
          </Text>
        </View>

        {/* Status da Sessão */}
        <View className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-bold text-gray-800">
              Status da Sessão
            </Text>
            <View
              className={`px-3 py-1 rounded-full ${
                isRunning ? "bg-green-100" : "bg-gray-100"
              }`}
            >
              <Text
                className={`font-semibold ${
                  isRunning ? "text-green-700" : "text-gray-600"
                }`}
              >
                {isRunning ? "ATIVA" : "INATIVA"}
              </Text>
            </View>
          </View>

          {isRunning && (
            <View className="space-y-3">
              <View className="flex-row justify-between">
                <Text className="text-gray-600">BPM Atual:</Text>
                <Text className="font-bold text-gray-800">
                  {currentBPM} BPM
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Músicas Adicionadas:</Text>
                <Text className="font-bold text-gray-800">{tracksAdded}</Text>
              </View>
              {lastAddedTrack && (
                <View className="bg-gray-50 rounded-lg p-3">
                  <Text className="text-gray-600 text-sm mb-1">
                    Última música adicionada:
                  </Text>
                  <Text className="font-semibold text-gray-800">
                    {lastAddedTrack.name}
                  </Text>
                  <Text className="text-gray-600 text-sm">
                    {lastAddedTrack.artists
                      .map((artist) => artist.name)
                      .join(", ")}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>

        {/* Seleção de BPM */}
        <View className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <Text className="text-xl font-bold text-gray-800 mb-4">
            Selecione seu BPM
          </Text>
          <Text className="text-gray-600 mb-4">
            Escolha o BPM que melhor se adapta ao seu ritmo de corrida
          </Text>

          <View className="flex-row flex-wrap gap-3">
            {bpmOptions.map((bpm) => (
              <TouchableOpacity
                key={bpm}
                onPress={() => setSelectedBPM(bpm)}
                className={`px-4 py-3 rounded-xl border-2 ${
                  selectedBPM === bpm
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <Text
                  className={`font-bold text-center ${
                    selectedBPM === bpm ? "text-green-700" : "text-gray-700"
                  }`}
                >
                  {bpm}
                </Text>
                <Text
                  className={`text-xs text-center ${
                    selectedBPM === bpm ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  BPM
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View className="mt-4 p-3 bg-blue-50 rounded-lg">
            <Text className="text-blue-800 text-sm">
              💡 <Text className="font-semibold">Dica:</Text> BPM 140-160 é
              ideal para corrida moderada
            </Text>
          </View>
        </View>

        {/* Botão Principal */}
        <View className="mb-6">
          {isRunning ? (
            <TouchableOpacity
              onPress={handleStop}
              disabled={isLoading}
              className="bg-red-500 py-4 rounded-2xl shadow-lg"
            >
              <View className="flex-row items-center justify-center">
                {isLoading && (
                  <ActivityIndicator
                    color="white"
                    size="small"
                    className="mr-2"
                  />
                )}
                <Text className="text-white text-center font-bold text-xl">
                  PARAR SESSÃO
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleStart}
              disabled={isLoading}
              className="bg-green-500 py-4 rounded-2xl shadow-lg"
            >
              <View className="flex-row items-center justify-center">
                {isLoading && (
                  <ActivityIndicator
                    color="white"
                    size="small"
                    className="mr-2"
                  />
                )}
                <Text className="text-white text-center font-bold text-xl">
                  COMEÇAR
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        {/* Instruções */}
        <View className="bg-white rounded-2xl p-6 shadow-sm">
          <Text className="text-lg font-bold text-gray-800 mb-3">
            Como Funciona
          </Text>
          <View className="space-y-2">
            <View className="flex-row items-start">
              <Text className="text-green-500 font-bold mr-2">1.</Text>
              <Text className="text-gray-600 flex-1">
                Selecione seu BPM ideal para corrida
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-green-500 font-bold mr-2">2.</Text>
              <Text className="text-gray-600 flex-1">
                Toque em &quot;COMEÇAR&quot; para iniciar a sessão
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-green-500 font-bold mr-2">3.</Text>
              <Text className="text-gray-600 flex-1">
                O app adicionará músicas automaticamente à sua fila do Spotify a
                cada minuto
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-green-500 font-bold mr-2">4.</Text>
              <Text className="text-gray-600 flex-1">
                Mantenha o Spotify aberto e tocando música
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
