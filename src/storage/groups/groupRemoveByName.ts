import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTIONS, GROUP_COLLECTIONS } from "@storage/storageConfig";
import { groupsGetAll } from "./groupsGetAll";

export async function groupRemoveByName(groupDeleted: string) {
  try {
    const collection = await groupsGetAll();
    const filterGroup = collection.filter((x) => x !== groupDeleted);

    await AsyncStorage.setItem(GROUP_COLLECTIONS, JSON.stringify(filterGroup));

    await AsyncStorage.removeItem(`${PLAYER_COLLECTIONS}-${groupDeleted}`);
  } catch (error) {
    throw error;
  }
}
