import { useState } from "react";
import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";

import { Container, Content, Icon } from "./styles";
import { groupCreate } from "@storage/groups/groupCreate";
import { AppError } from "@utils/AppError";
import { Alert } from "react-native";

interface NewGroupProps {}

export function NewGroup({}: NewGroupProps) {
  const navigate = useNavigation();
  const [groupName, setGroupName] = useState("");

  async function handleNew() {
    try {
      if (groupName.trim().length === 0) {
        return Alert.alert("Nuevo grupo", "Informe el nombre del grupo");
      }

      await groupCreate(groupName);
      navigate.navigate("players", { group: groupName });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Nuevo grupo", error.message);
      } else {
        Alert.alert("Nuevo grupo", "No fue posible crear un nuevo grupo");
        console.log(error);
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight
          title="Nuevo turno"
          subTitle="Crea un turno para agregar a las personas"
        />
        <Input
          placeholder="Nombre del turno"
          value={groupName}
          onChangeText={setGroupName}
        />
        <Button title="Crear" style={{ marginTop: 24 }} onPress={handleNew} />
      </Content>
    </Container>
  );
}
