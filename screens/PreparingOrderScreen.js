import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

const PreparingOrderScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 5000);
  }, []);

  return (
    <SafeAreaView className="bg-[#ffc554] flex-1 items-center justify-center">
      <Animatable.Image
        source={require("../assets/65321-food-delivery.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="h-96 w-96"
      />
      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-lg px-4 my-10 text-white font-bold text-center"
      >
        Waiting for Restaurant to accept your order
      </Animatable.Text>
      <Progress.Circle
        fill="white"
        size={60}
        indeterminate={true}
        color="white"
      />
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
