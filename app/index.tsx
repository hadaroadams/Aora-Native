import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import React from "react";
import { Link } from "expo-router";

const index = () => {
  return (
    <>
      <View className="flex-1 items-center justify-center bg-red-800 ">
        <Text className="text-red-400">Open up App.js to start working on your app!</Text>
        {/* <StatusBar style="auto" /> */}
      </View>
    </>
  );
};

export default index;
