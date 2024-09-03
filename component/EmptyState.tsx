import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "@/constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const EmptyState = ({
  subtitle,
  title,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <View className="justify-center items-center  px-4 ">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="text-xl font-psemibold text-white text-center">
        {title}
      </Text>
      <Text className="font-pmedium text-sm mb-4 text-grey-100 text-center">
        {subtitle}
      </Text>
      <CustomButton
        title="Create Video"
        handleOnPress={() => {
          router.push("/create");
        }}
        containerStyles="w-full"
      />
    </View>
  );
};

export default EmptyState;
