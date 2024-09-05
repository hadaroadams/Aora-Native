import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import SearchInput from "@/component/SearchInput";
import Trending from "@/component/Trending";
import EmptyState from "@/component/EmptyState";
import { getAllPosts, getAllTrendingPost, getSearchPost } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import VideoCard from "@/component/VideoCard";
import { useGlobalContext } from "@/context/GlobalContext";

const Home = () => {
  const { user } = useGlobalContext()!;
  const { data: post, refetch } = useAppwrite(getAllPosts);
  const { data: latestPost } = useAppwrite(getAllTrendingPost);

  const [refreshing, setRefreshing] = useState(false);
  // console.log(2,post);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();

    setRefreshing(false);
  };
  return (
    <SafeAreaView className="bg-primary min-h-full ">
      <FlatList
        data={post}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="flex-row justify-between items-start mb-6 ">
              <View>
                <Text className="font-pmedium text-sm text-grey-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user.username}
                </Text>
              </View>
              <View>
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput initialQuery="" />
            <View className="w-full flex-1 pt-8">
              <Text className="text-grey-100 text-lg font-pregular ">
                Trending Videos
              </Text>
              <Trending latestPost={latestPost ?? [1, 2, 3]} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first one to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
