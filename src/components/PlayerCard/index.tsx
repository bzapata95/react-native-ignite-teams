import { ButtonIcon } from "@components/ButtonIcon";
import { EnumButtonIconTypeStyleProps } from "@components/ButtonIcon/styles";
import { Container, Name, Icon } from "./styles";

interface PlayerCardProps {
  name: string;
  onRemove: () => void;
}

export function PlayerCard({ name, onRemove }: PlayerCardProps) {
  return (
    <Container>
      <Icon name="person" />
      <Name>{name}</Name>
      <ButtonIcon
        icon="close"
        type={EnumButtonIconTypeStyleProps.SECONDARY}
        onPress={onRemove}
      />
    </Container>
  );
}
