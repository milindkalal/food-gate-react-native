import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import SanityClient from "../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    SanityClient.fetch(
      `*[_type == "featured"] {
      ...,
      restaurants[]->{
        ...,
          dishes[]->,
           
      },
    }`
    ).then((data) => {
      setFeaturedCategories(data);
    });
  }, []);

  return (
    <SafeAreaView className="bg-[#fcf4dd] pt-5">
      {/* header */}
      <View className="flex-row pb-3 items-center mx-4  space-x-2">
        <Image
          source={require("../assets/preloader.gif")}
          className="w-10 h-10 bg-[#ffc554] rounded-full  p-4 "
        />
        <View className="flex-1">
          {/* <Text className="text-xs font-bold text-gray-400">Deliver Now!</Text> */}
          <Text className="text-2xl text-center font-bold">
            Food<Text className="text-[#ffc554]"> Gate</Text>
            {/* <Ionicons name="chevron-down-outline" size={20} color="#00ccbb" /> */}
          </Text>
        </View>
        <FontAwesome name="user-o" size={30} color="#ffc554" />
      </View>
      {/* search */}
      <View className="flex-row items-center space-x-2 pb-2  mx-4">
        <View className=" rounded-full flex-row flex-1 space-x-2 bg-white p-3">
          <Ionicons name="search-outline" size={20} color="#ffc554" />
          <TextInput
            placeholder="Restaurants and cuisines"
            keyboardType="default"
          />
        </View>
        <Entypo name="sound-mix" size={24} color="#ffc554" />
      </View>
      {/* body */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {/* categories */}
        <Categories />
        {/* featured */}
        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
