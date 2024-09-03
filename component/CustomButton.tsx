import { TouchableOpacity, Text } from "react-native";

const CustomButton = ({
  title,
  containerStyles,
  textStyles,
  isLoading,
  handleOnPress,
}: {
  title: string;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
  handleOnPress: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={handleOnPress}
      activeOpacity={0.7}
      className={`bg-secondary min-h-[62px]  justify-center rounded-lg px-6 ${containerStyles} ${
        isLoading && "opacity-50"
      }`}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg text-center`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
