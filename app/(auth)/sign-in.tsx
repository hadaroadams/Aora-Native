import {
  View,
  Text,
  ScrollView,
  Image,
  GestureResponderEvent,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import FormField from "@/component/FormField";
import CustomButton from "@/component/CustomButton";
import { Link, router } from "expo-router";
import { signIn } from "@/lib/appwrite";

const SignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill all the fields");
    }
    setIsSubmitting(true);
    try {
      const user = await signIn({
        email: form.email,
        password: form.password,
      });
      router.replace("/home");
    } catch (error: any) {
      Alert.alert("Error1", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[90vh] px-4 my-6">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Text className="text-2xl text-white font-pbold mt-5">Sign In</Text>
          <FormField
            label="Email"
            value={form.email}
            otherStyles="mt-6"
            keyboardType="email-address"
            placeHolder="Enter email"
            handleChangeText={(e) => {
              setForm({ ...form, email: e });
            }}
          />
          <FormField
            label="Password"
            value={form.password}
            placeHolder="Enter password"
            otherStyles="mt-6"
            handleChangeText={(e) => {
              setForm({ ...form, password: e });
            }}
          />
          <CustomButton
            title="Sign In"
            handleOnPress={submit}
            containerStyles="mt-10"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-grey-100 font-pregular">
              Don't have an account
            </Text>
            <Link
              href={"/sign-up"}
              className="text-lg font-psemibold text-secondary"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
