import { TouchableOpacityProps } from "react-native";
import { Container, Title } from "./styles";

interface FilterProps extends TouchableOpacityProps {
  title: string;
  isActive?: boolean;
}

export function Filter({ title, isActive = false, ...rest }: FilterProps) {
  return (
    <Container isActive={isActive} {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
