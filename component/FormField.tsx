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

const FormField = ({
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
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-grey-100 font-pmedium">{label}</Text>
      <View className="bg-black-100 w-full h-16  px-4 rounded-2xl focus:border-2 focus:border-secondary items-center flex-row">
        <TextInput
          className="flex-1 text-white text-base font-psemibold
        "
          value={value}
          placeholder={placeHolder}
          placeholderTextColor={"#7b7b8b"}
          onChangeText={handleChangeText}
          secureTextEntry={label === "Password" && !showPasswword}
          keyboardType={keyboardType}
        />
        {label === "Password" && (
          <>
            <TouchableOpacity onPress={() => setShowPassword(!showPasswword)}>
              <Image
                source={!showPasswword ? icons.eye : icons.eyeHide}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default FormField;
