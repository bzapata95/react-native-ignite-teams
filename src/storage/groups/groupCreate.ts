import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTIONS } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";
import { groupsGetAll } from "./groupsGetAll";

export async function groupCreate(newGroup: string) {
  try {
    const storageGroups = await groupsGetAll();

    const groupAlreadyExists = storageGroups.includes(newGroup);

    if (groupAlreadyExists) {
      throw new AppError("Group already exists");
    }

    await AsyncStorage.setItem(
      GROUP_COLLECTIONS,
      JSON.stringify([...storageGroups, newGroup])
    );
  } catch (error) {
    throw error;
  }
}
