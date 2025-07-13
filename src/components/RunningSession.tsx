import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useRunningSession } from "../hooks/useRunningSession";
import { LogoFeelRun } from "./LogoFeelRun";

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
      ],
    );
  };

  const bpmOptions = [130, 140, 150, 160, 170, 180];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <View className="mb-8 items-center">
          <View>
            <LogoFeelRun
              sourcePath={require("../../public/images/logo_sem_subtitulo.png")}
              height={176}
              width={176}
              resizeMode="cover"
            />
          </View>
          <Text className="mb-2 text-3xl font-bold text-gray-800">
            Feel Run
          </Text>
          <Text className="text-center text-lg text-gray-600">
            Sinta a corrida e chegue ao seu potencial máximo
          </Text>
        </View>

        <TouchableOpacity className="flex-row items-center justify-center gap-1 rounded-md bg-green-500 py-2 text-red-500">
          <Text className="text-lg font-semibold">Iniciar Corrida</Text>
          <MaterialCommunityIcons name="fire" size={24} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
