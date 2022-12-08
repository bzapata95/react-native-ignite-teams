import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTIONS } from "@storage/storageConfig";
import { playersGetByGroup } from "./playersGetByGroup";

export async function playerRemoveByGroup(playerName: string, group: string) {
  try {
    const collection = await playersGetByGroup(group);
    const filter = collection.filter((x) => x.name !== playerName);
    await AsyncStorage.setItem(
      `${PLAYER_COLLECTIONS}-${group}`,
      JSON.stringify(filter)
    );
  } catch (error) {
    throw error;
  }
}
