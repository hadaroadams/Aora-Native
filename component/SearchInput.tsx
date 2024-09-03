import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  GestureResponderEvent,
  KeyboardTypeOptions,
} from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

const SearchInput = ({
  label,
  value,
  placeHolder,
  otherStyles,
  keyboardType,
  handleChangeText,
}: {
  label: string;
  value: string;
  placeHolder: string;
  otherStyles: string;
  keyboardType?: KeyboardTypeOptions;
  handleChangeText: (e: string) => void;
}) => {
  const [showPasswword, setShowPassword] = useState(false);
  return (
    <View className="bg-black-100 w-full h-16  px-4 rounded-2xl focus:border-2 focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="flex-1 text-white mt-0.5 text-base font-pregular"
        value={value}
        placeholder={placeHolder}
        placeholderTextColor={"#7b7b8b"}
        onChangeText={handleChangeText}
        secureTextEntry={label === "Password" && !showPasswword}
        keyboardType={keyboardType}
      />
        <TouchableOpacity onPress={() => {}}>
          <Image
            source={icons.search}
            className="w-5 h-5"
            resizeMode="contain"
          />
        </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
