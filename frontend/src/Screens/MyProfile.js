import React from "react";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";

const MyProfile = ({ route }) => {
  const user = route.params.userData;
  console.log("Data from home component: ", route.params.userData);

  return (
    <ScrollView>
      <View className="flex flex-col bg-blue-50 w-full h-full">
        <View className="flex flex-row mx-5 my-5 px-2 py-2 border border-cyan-900 bg-blue-200 rounded-xl shadow-2xl shadow-black ">
          <View className="items-start">
            <Image
              className="h-36 w-36 ml-3 rounded-full my-4"
              source={require("../../assets/myprofile-icon.jpg")}
            />
          </View>
          <View className="py-2 px-2 mx-5 justify-center items-start">
            <Text className="text-3xl text-emerald-900 font-bold">
              {user.fullName}
            </Text>
            <Text className="text-sm text-emerald-900 font-bold">
              {user.username}
            </Text>
            <Text className="text-lg text-gray-700">Resposible Driver</Text>
          </View>
        </View>
        <View className="flex flex-col px-1 pt-2 pb-4 mb-5 mx-5 bg-blue-200 rounded-xl shadow-xl border border-cyan-900 shadow-black">
          <View>
            <Text className="text-2xl px-3 py-2 mb-1 ml-1 text-emerald-900">
              Statistics
            </Text>
          </View>

          <View className="flex flex-row justify-around">
            <View className="w-1/3 items-center">
              <MaterialCommunityIcons
                name="speedometer"
                size={65}
                color="rgba(0,40,53,0.95)"
              />
              <Text className="text-center mt-1 text-xl text-cyan-900">
                40 km/hr
              </Text>
              <Text className="text-center mt-1 text-gray-700">
                Overall Avg. Speed
              </Text>
            </View>
            <View className="w-1/3 items-center">
              <FontAwesome5 name="road" size={65} color="rgba(0,40,53,0.95)" />
              <Text className="text-center mt-1 text-xl text-cyan-900">
                352 km
              </Text>
              <Text className="text-center mt-1 text-gray-700">
                Total Distance Travelled
              </Text>
            </View>
            <View className="w-1/3 items-center">
              <Octicons name="gift" size={65} color="rgba(0,40,53,0.95)" />
              <Text className="text-center mt-1 text-xl text-cyan-900">0</Text>
              <Text className="text-center mt-1 text-gray-700">
                Total Safety Points Earned
              </Text>
            </View>
          </View>

          <View className="mt-5">
            <View className="items-center">
              <TouchableOpacity className="w-4/5 px-2 py-3 items-center mt-6 rounded-xl bg-cyan-900">
                <Text className="text-white">Update Profile</Text>
              </TouchableOpacity>
            </View>
            <View className="items-center">
              <TouchableOpacity className="w-4/5 px-2 py-3 items-center mt-4 rounded-xl bg-cyan-900">
                <Text className="text-white">Settings</Text>
              </TouchableOpacity>
            </View>
            <View className="items-center">
              <TouchableOpacity className="w-4/5 px-2 py-3 items-center mt-4 rounded-xl bg-cyan-900">
                <Text className="text-white">Emergency Contacts</Text>
              </TouchableOpacity>
            </View>
            <View className="items-center">
              <TouchableOpacity className="w-4/5 px-2 py-3 items-center mt-4 rounded-xl border-2 border-cyan-900">
                <Text className="text-cyan-900">Feedback/Support</Text>
              </TouchableOpacity>
            </View>
            <Text className="text-center mt-4 text-cyan-900">version 1.0</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default MyProfile;
