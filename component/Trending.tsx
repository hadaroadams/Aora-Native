import { icons, images } from "@/constants";
import React, { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import * as Animable from "react-native-animatable";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};
const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }: any) => {
  console.log(item.video);
  const [play, setPlay] = useState(false);
  console.log(item.$id === activeItem);
  return (
    <Animable.View
      className="mr-5"
      animation={activeItem.$id === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          className="w-52 h-72 rounded-[35px] mt-3 border border-red-400"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={({ isLoaded }) => {
            if (isLoaded) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <>
          <TouchableOpacity
            className=" justify-center items-center relative"
            activeOpacity={0.7}
            onPress={() => setPlay(true)}
          >
            <ImageBackground
              source={{ uri: item.thumbnail }}
              resizeMode="cover"
              className="w-52 h-72 rounded-[35px] overflow-hidden shadow-lg my-5 shadow-black40"
            />
            <Image
              source={icons.play}
              className="w-12 h-12 absolute"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </>
      )}
    </Animable.View>
  );
};

const Trending = ({ latestPost }: any) => {
  // const { latestPost } = posts;
  // console.log(1, latestPost[0]);
  const [activeItem, setActiveItem] = useState(0);
  // console.log(activeItem);
  const viewableItemsChanged = ({ viewableItems }: any) => {
    console.log(viewableItems);
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
    if (viewableItems.length === 3) {
      setActiveItem(viewableItems[1].key);
    }
  };
  return (
    <FlatList
      data={latestPost}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TrendingItem activeItem={latestPost[activeItem]} item={item} />
        // <View>
        //   <Text>Hello EveryOne</Text>
        // </View>
      )}
      onViewableItemsChanged={viewableItemsChanged}
      contentOffset={{ x: 170, y: 0 }}
      horizontal
    />
  );
};

export default Trending;
