import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import { router, usePathname } from "expo-router";

const SearchInput = ({ initialQuery }: { initialQuery: string }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery);
  console.log(2, pathname);
  return (
    <View className="bg-black-100 w-full h-16  px-4 rounded-2xl focus:border-2 focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="flex-1 text-white mt-0.5 text-base font-pregular"
        value={query}
        placeholder={"search for a video topic"}
        placeholderTextColor={"#cdcde0"}
        onChangeText={(e) => setQuery(e)}
      />
      <TouchableOpacity
        onPress={() => {
          if (!query)
            Alert.alert(
              "Missing query",
              "Please input something to search result across database"
            );
          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
