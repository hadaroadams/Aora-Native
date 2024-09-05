import { View, Text } from "react-native";
import React from "react";

const InfoBox = ({
  containerstyles,
  title,
  titleStyles,
  subtitle,
}: {
  title: string;
  containerstyles: string;
  titleStyles: string;
  subtitle?: string;
}) => {
  return (
    <View className={`${containerstyles}`}>
      <Text className={`text-white text-center font-psemibold ${titleStyles}`}>
        {title}
      </Text>
      <Text className="text-white text-sm text-center font-pregular">
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;
