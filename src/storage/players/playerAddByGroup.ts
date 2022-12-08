import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTIONS } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";
import { playersGetByGroup } from "./playersGetByGroup";
import { PlayerStorageDTO } from "./playerStorageDTO";

export async function playerAddByGroup(
  newPlayer: PlayerStorageDTO,
  group: string
) {
  try {
    const oldPlayers = await playersGetByGroup(group);

    if (oldPlayers.filter((p) => p.name === newPlayer.name).length > 0) {
      throw new AppError(`Player already exist`);
    }

    await AsyncStorage.setItem(
      `${PLAYER_COLLECTIONS}-${group}`,
      JSON.stringify([...oldPlayers, newPlayer])
    );
  } catch (error) {
    throw error;
  }
}
