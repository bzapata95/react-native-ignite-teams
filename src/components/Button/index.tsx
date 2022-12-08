import { Text, TouchableOpacityProps } from "react-native";

import { Container, EnumButtonTypeStyleProps, Title } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  type?: EnumButtonTypeStyleProps;
}

export function Button({
  type = EnumButtonTypeStyleProps.PRIMARY,
  title,
  ...rest
}: ButtonProps) {
  return (
    <Container type={type} {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
