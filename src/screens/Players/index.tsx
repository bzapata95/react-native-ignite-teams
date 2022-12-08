import { Button } from "@components/Button";
import { EnumButtonTypeStyleProps } from "@components/Button/styles";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { ListEmpty } from "@components/ListEmpty";
import { PlayerCard } from "@components/PlayerCard";
import { useNavigation, useRoute } from "@react-navigation/native";
import { groupRemoveByName } from "@storage/groups/groupRemoveByName";
import { playerAddByGroup } from "@storage/players/playerAddByGroup";
import { playerGetByGroupAndTeam } from "@storage/players/playerGetByGroupAndTeam";
import { playerRemoveByGroup } from "@storage/players/playerRemoveByGroup";
import { PlayerStorageDTO } from "@storage/players/playerStorageDTO";
import { AppError } from "@utils/AppError";
import { useEffect, useState } from "react";
import { Alert, FlatList, Keyboard } from "react-native";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

type RouteParams = {
  group: string;
};

export function Players() {
  const navigation = useNavigation();

  const [newPlayerName, setNewPlayerName] = useState("");
  const [team, setTeams] = useState("team a");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const route = useRoute();
  const { group } = route.params as RouteParams;

  async function handleAddPlayer() {
    try {
      if (newPlayerName.trim().length === 0) {
        return Alert.alert("New Player", "Ingrese el nombre del nuevo jugador");
      }

      const newPlayer = {
        name: newPlayerName,
        team,
      };

      await playerAddByGroup(newPlayer, group);
      setNewPlayerName("");
      Keyboard.dismiss();
      await fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("New Player", error.message);
      } else {
        Alert.alert("New Player", "No se pudo agregar a jugador");
        console.log(error);
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      const playersByTeam = await playerGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRemovePlayer(name: string) {
    try {
      await playerRemoveByGroup(name, group);
      fetchPlayersByTeam();
    } catch (error) {
      console.log(error);
      Alert.alert("Remover persona", "No fue posible remover la persona.");
    }
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group);
      navigation.navigate("groups");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRemoveGroup() {
    Alert.alert("Remover", "Desea remover el grupo?", [
      { text: "No", style: "cancel" },
      { text: "Si", onPress: () => groupRemove() },
    ]);
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title={group}
        subTitle="Agrege a las personas y separe por teams"
      />

      <Form>
        <Input
          placeholder="Nombre de la persona"
          autoCapitalize="words"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={["team a", "team b"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeams(item)}
            />
          )}
          horizontal
        />
        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            onRemove={() => handleRemovePlayer(item.name)}
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="No se encontró personas en el equipo" />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />

      <Button
        title="Eliminar turno"
        type={EnumButtonTypeStyleProps.SECONDARY}
        onPress={handleRemoveGroup}
      />
    </Container>
  );
}
