import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/component/FormField";
import { icons } from "@/constants";
import { ResizeMode, Video } from "expo-av";
import CustomButton from "@/component/CustomButton";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import { createVideo } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalContext";

export interface FormData {
  title: string;
  video: DocumentPicker.DocumentPickerAsset | null;
  thumbnail: DocumentPicker.DocumentPickerAsset | null;
  prompt: string;
  users?: string;
}
const Create = () => {
  const { user } = useGlobalContext()!;
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<FormData>({
    title: "",
    prompt: "",
    thumbnail: null,
    video: null,
  });
  console.log("ME", form);
  const openPicker = async (selectType: "image" | "video") => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === "image"
          ? ["image/png", "image/jpg", "image/jpeg"]
          : ["video/mp4", "video/gif"],
    });
    if (!result.canceled) {
      if (selectType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      }
      if (selectType === "video") {
        setForm({ ...form, video: result.assets[0] });
      }
      console.log(result);
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };
  const submit = async () => {
    if (!form.prompt || !form.thumbnail || !form.title || !form.video) {
      return Alert.alert("please fill in all the field");
    }
    setUploading(true);
    try {
      await createVideo({
        ...form,
        users: user.$id,
      });
      Alert.alert("Success", "Post uploaded succesfully");
      router.push("/home");
    } catch (error: any) {
      Alert.alert("error", error.message);
    } finally {
      setForm({ prompt: "", thumbnail: null, title: "", video: null });
      setUploading(false);
    }
  };
  return (
    <SafeAreaView className=" bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-xl text-white font-semibold">Upload Video</Text>
        <FormField
          label="Video Title"
          value={form.title}
          placeHolder="Give your video a catch title..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-grey-100 font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className=" w-full h-64 rounded-2xl"
                resizeMode={ResizeMode.COVER}
                useNativeControls
                isLooping
                // shouldPlay
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center ">
                <View className="w-14 h-14 border border-secondary-100 justify-center items-center ">
                  <Image
                    source={icons.upload}
                    resizeMode="cover"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <Text className="text-base text-grey-100 font-pmedium ">
            Thumbnail Image
          </Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="contain"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="w-5 h-5"
                />
                <Text className="text-sm text-grey-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          label="AI Prompt"
          value={form.prompt}
          placeHolder="The prompt you used to create this video"
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-7"
        />
        <CustomButton
          title="Submit & Public"
          handleOnPress={submit}
          isLoading={uploading}
          containerStyles="mt-7"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
