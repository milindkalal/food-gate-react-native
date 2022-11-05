import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import { PhoneIcon, XMarkIcon } from "react-native-heroicons/solid";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";
import { ChatBubbleLeftRightIcon } from "react-native-heroicons/outline";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  return (
    <View className="bg-[#fcf4dd] flex-1">
      <SafeAreaView className="z-50">
        <View className="flex-row justify-between items-center p-5">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XMarkIcon color="#ffc554" size={30} />
          </TouchableOpacity>
          <Text className="font-light text-lg text-[#ffc554]">Order Help</Text>
        </View>
        <View className="bg-[#ffc554] mx-5 my-2 rounded-md p-6 z-50 shadow-lg">
          <View className="flex-row justify-between space-x-1">
            <View>
              <Text className="text-lg text-gray-500">Estimated Arrival</Text>
              <Text className="text-4xl font-bold">35-55 Minutes</Text>
            </View>
            <Image
              source={{
                uri: "https://s3-ap-southeast-1.amazonaws.com/subscriber.images/the-learning-tree/wp-content/uploads/2020/09/15050625/Careerscope-Chef.gif",
              }}
              className="h-20 w-20 rounded-full "
            />
          </View>

          <Progress.Bar size={30} color="gray" indeterminate={true} />
          <Text className="mt-3 text-gray-500">
            Your order at {restaurant.title} is being prepared
          </Text>
        </View>
      </SafeAreaView>

      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className="flex-1 -mt-10 z-0"
        mapType="hybrid"
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
          }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier="origin"
          pinColor="#00CCBB"
        />
      </MapView>
      <SafeAreaView className="bg-[#fcf4dd] flex-row items-center space-x-5 h-28">
        <Image
          source={require("../assets/preloader.gif")}
          className="h-12 w-14 bg-gray-300 p-4 rounded-full ml-5 "
        />
        <View className="flex-1">
          <Text className="text-lg">Michael</Text>
          <Text className="text-gray-400">Your rider</Text>
        </View>

        <View className="text-lg mr-5 font-bold">
          <PhoneIcon color="#ffc554" />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default DeliveryScreen;
