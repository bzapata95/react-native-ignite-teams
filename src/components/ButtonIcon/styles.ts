import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";

export enum EnumButtonIconTypeStyleProps {
  PRIMARY = "PRIMARY",
  SECONDARY = "SECONDARY",
}

type ButtonIconTypeStyleProps = {
  type: EnumButtonIconTypeStyleProps;
};

export const Container = styled(TouchableOpacity)`
  width: 56px;
  height: 56px;

  justify-content: center;
  align-items: center;

  margin-left: 12px;
`;

export const Icon = styled(MaterialIcons).attrs<ButtonIconTypeStyleProps>(
  ({ theme, type }) => ({
    color:
      type === EnumButtonIconTypeStyleProps.PRIMARY
        ? theme.COLORS.GREEN_700
        : theme.COLORS.RED,
    size: 24,
  })
)``;
