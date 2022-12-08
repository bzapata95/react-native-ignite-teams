import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTIONS } from "@storage/storageConfig";
import { PlayerStorageDTO } from "./playerStorageDTO";

export async function playersGetByGroup(group: string) {
  try {
    const collection = await AsyncStorage.getItem(
      `${PLAYER_COLLECTIONS}-${group}`
    );

    const players: PlayerStorageDTO[] = collection
      ? JSON.parse(collection)
      : [];

    return players;
  } catch (error) {
    throw error;
  }
}
