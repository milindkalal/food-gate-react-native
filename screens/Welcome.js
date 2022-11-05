import { View, Text, SafeAreaView, KeyboardAvoidingView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { useEffect } from "react";
import * as Animatable from "react-native-animatable";

const Welcome = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Home");
    }, 3000);
  }, []);
  return (
    <SafeAreaView className="className=flex-1 bg-[#fcf4dd] h-screen">
      <View className="items-center justify-center m-auto">
        <Animatable.Text
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite"
          className="text-5xl text-center font-bold"
        >
          Food<Text className="text-[#ffc554]">Gate</Text>
        </Animatable.Text>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
