import "react-native-url-polyfill/auto";
import { Image, ScrollView, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import CustomButton from "@/component/CustomButton";
import { Redirect, router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalContext";

const index = () => {
  const { isLoading, isLoggedIn, setUser, setisLoggedIn } = useGlobalContext()!;
  // console.log(isLoading, isLoggedIn);
  if (!isLoading && isLoggedIn) return <Redirect href={"/home"} />;
  return (
    <>

      <SafeAreaView className="bg-primary h-full">
        <ScrollView>
          <View className="w-full items-center justify-center min-h-[90vh] px-4">
            <Image
              source={images.logo}
              className="w-[130px] h-[84px]"
              resizeMode="contain"
            />
            <Image
              source={images.cards}
              className="max-w-[380px] w-full h-[300px]"
              resizeMode="contain"
            />
            <View className="relative mt-5">
              <Text className="text-3xl font-bold text-center text-white">
                {" "}
                Discover Endless Prossibilities with {""}
                <Text className="text-secondary-200">Aora</Text>
              </Text>
              <Image
                source={images.path}
                className="w-[136px] h-[15px] absolute -bottom-2 -right-8 "
                resizeMode="contain"
              />
            </View>
            <Text className="text-sm font-pregular mt-7 text-center text-grey-100 ">
              Where creativity meets innovation: embark on a journey of
              limitless exploration{" "}
            </Text>
            <CustomButton
              title="Continue with Email"
              handleOnPress={() => {
                router.push("/sign-in");
              }}
              containerStyles="w-full mt-7"
            />
          </View>
        </ScrollView>
        <StatusBar backgroundColor="#221616" style="light" />
      </SafeAreaView>
    </>
  );
};

export default index;
