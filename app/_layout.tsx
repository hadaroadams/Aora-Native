import { Slot, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const RootLayOut = () => {
  return (
    <>
      {/* <View style={styles.container}>
        <Text style={styles.text}>hello</Text>
      </View>
      <Slot /> */}

      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default RootLayOut;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 100,
  },
});
