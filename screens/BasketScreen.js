import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { selectRestaurant } from "../features/restaurantSlice";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../features/basketSlice";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { useEffect } from "react";
import { XCircleIcon } from "react-native-heroicons/solid";
import { urlFor } from "../sanity";
import Currency from "react-currency-formatter";

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const [gropedItemsInBasket, setGropedItemsInBasket] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGropedItemsInBasket(groupedItems);
  }, [items]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#ffc554] bg-white shadow-xs">
          <Image
            source={require("../assets/preloader.gif")}
            className="w-16 h-14 bg-white rounded-full  p-4 "
          />

          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-gray-400 text-center">
              {restaurant.title}
            </Text>
          </View>

          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <XCircleIcon color="#ffc554" height={50} width={50} />
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-yellow-200">
          {Object.entries(gropedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-2 px-5"
            >
              <Text className="text-[#ffc554]">{items.length} x</Text>
              <Image
                source={{
                  uri: urlFor(items[0]?.image).url(),
                }}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{items[0]?.name}</Text>

              <Text className="text-gray-600 font-bold">
                <Currency quantity={items[0]?.price} currency="INR" />
              </Text>

              <TouchableOpacity>
                <Text
                  className="text-[#ffc554] text-xs"
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        {/* subtotal */}
        <View className="p-5 bg-white mt-5 space-y-4">
          <View className=" flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">
              <Currency quantity={basketTotal} currency="INR" />
            </Text>
          </View>

          <View className=" flex-row justify-between">
            <Text className="text-gray-400">Delivery Charges</Text>
            <Text className="text-gray-400">
              <Currency quantity={20} currency="INR" />
            </Text>
          </View>

          <View className=" flex-row justify-between">
            <Text className="font-extrabold">Grand Total</Text>
            <Text className="font-extrabold">
              <Currency
                className="text-gray-400"
                quantity={basketTotal + 20}
                currency="INR"
              />
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("PreparingOrderScreen")}
            className="rounded-lg bg-[#ffc554] p-4"
          >
            <Text className="text-center text-white text-lg font-bold">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
