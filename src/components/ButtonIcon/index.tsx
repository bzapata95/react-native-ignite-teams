import { TouchableOpacityProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Container, EnumButtonIconTypeStyleProps, Icon } from "./styles";

interface ButtonIconProps extends TouchableOpacityProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  type?: EnumButtonIconTypeStyleProps;
}

export function ButtonIcon({
  type = EnumButtonIconTypeStyleProps.PRIMARY,
  icon,
  ...rest
}: ButtonIconProps) {
  return (
    <Container {...rest}>
      <Icon name={icon} type={type} />
    </Container>
  );
}
