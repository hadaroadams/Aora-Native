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
import { useLocalSearchParams } from "expo-router";

const Home = () => {
  const { query } = useLocalSearchParams();
  const { data: seachPost, refetch } = useAppwrite(() => {
    getSearchPost(query);
  });
  const [refreshing, setRefreshing] = useState(false);
  // console.log(2,post);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  console.log(seachPost);
  useEffect(() => {
    onRefresh();
  }, [query]);
  return (
    <SafeAreaView className="bg-primary min-h-full ">
      <FlatList
        data={seachPost}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="flex-row justify-between items-start mb-6 ">
              <View>
                <Text className="font-pmedium text-sm text-grey-100">
                  Search result
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {query}
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
            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query as string} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
