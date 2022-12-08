import { Button } from "@components/Button";
import { GroupCard } from "@components/GroupCard";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ListEmpty } from "@components/ListEmpty";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { groupsGetAll } from "@storage/groups/groupsGetAll";
import { useCallback, useState } from "react";
import { Text, SafeAreaView, FlatList, Alert } from "react-native";
import * as S from "./styles";

export function Groups() {
  const navigation = useNavigation();
  const [groups, setGroups] = useState<string[]>([]);

  function handleGoToNewGroup() {
    navigation.navigate("new");
  }

  async function fetchGroups() {
    try {
      const groupsResponse = await groupsGetAll();
      setGroups(groupsResponse);
    } catch (error) {
      console.log(error);
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate("players", { group });
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );

  return (
    <S.Container>
      {/* <SafeAreaView> */}
      <Header />
      <Highlight title="Turnos" subTitle="juegue con su turno" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
        )}
        ListEmptyComponent={() => <ListEmpty message="No se encontró turnos" />}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
      />
      <Button title="Crear nuevo turno" onPress={handleGoToNewGroup} />
      {/* </SafeAreaView> */}
    </S.Container>
  );
}
