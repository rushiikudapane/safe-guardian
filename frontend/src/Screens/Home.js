import React, { useEffect, useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import { Alert } from "react-native";
import * as Notification from "expo-notifications";
import { Audio } from "expo-av";
import { Camera, CameraType } from "expo-camera";

const Home = () => {
  const [speed, setSpeed] = useState(0);
  const [statusBarMessage, setStatusBarMessage] = useState("");
  const cameraRef = useRef(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);

  useEffect(() => {
    getLocationPermission();
    getCameraPermission();
  }, []);

  useEffect(() => {
    if (hasCameraPermission) {
      // capturePhoto();
    }
  }, [hasCameraPermission]);

  // function ask for camera permission
  const getCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(status == "granted");
    console.log(
      "permisiion status from getCameraPermission: ",
      hasCameraPermission
    );
  };

  // function to get location permission from user
  const getLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status != "granted") {
      console.log("Location Permission in not granted!");
      Alert.alert("Permissions to access the location was denied");
      return;
    }
    getLocation();
    return () => {};
  };

  const capturePhoto = async () => {
    console.log("permisiion status from capturePhoto: ", hasCameraPermission);
    // console.log("camera reference: ", cameraRef.current);
    // setTimeout(async () => {
    if (cameraRef.current != null) {
      try {
        // setTimeout(async () => {
        let photo = await cameraRef.current.takePictureAsync(null);
        console.log("Captured photo object: ", photo.uri);
        // }, 5000);
      } catch (err) {
        console.log("Error while capturign the photo: ", err.message);
      }
    } else {
      console.log("Camera ref is null");
    }
    // }, 5000);
  };

  // function to fetch current speed from location object
  const getLocation = async () => {
    const sound = new Audio.Sound();
    await sound.loadAsync(require("../../assets/Audio/warning.mp3"));

    try {
      const location = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 500,
          distanceInterval: 0,
        },
        async (location) => {
          // console.log(location.coords.speed);
          const currentSpeed = Math.floor(location.coords.speed);
          const speedLimit = 1;

          if (currentSpeed >= speedLimit) {
            setStatusBarMessage(
              "Slow Down! You are exceeding the speed limit."
            );
            // setTimeout(() => setStatusBarMessage(""), 5000);

            // keeping notification alert box commented incase we need it again for drowsiness detection feature
            // Notification.cancelScheduledNotificationAsync({
            //   content: {
            //     title: "Slow Down User!",
            //     body: "You are exceeding the speed limit.",
            //   },
            //   trigger: null,
            // });

            const playBackStatus = await sound.getStatusAsync();

            if (!playBackStatus.isPlaying) {
              await sound.playAsync();
            }
            // Alert.alert("Slow Down!, You are exceeding the speed limit.");
          } else {
            setStatusBarMessage("");
            const playBackStatus = await sound.getStatusAsync();
            if (playBackStatus.isPlaying) {
              await sound.unloadAsync();
              await sound.loadAsync(require("../../assets/Audio/warning.mp3"));
            }
          }
          setSpeed(currentSpeed);
        }
      );

      // console.log(location);
    } catch (err) {
      console.log("Error while fetching location:", err);
    }
  };

  return (
    <ScrollView>
      <View className="bg-blue-100 flex flex-col items-center h-full mb-10">
        {hasCameraPermission ? (
          <Camera
            style={{ flex: 1 }}
            type={CameraType.front}
            autoFocus={Camera.Constants.AutoFocus.off}
            ref={cameraRef}
            onCameraReady={() => {
              console.log("Camera is ready");
              capturePhoto();
            }}
            onMountError={() => {
              console.log("error while loading camera");
            }}
          />
        ) : (
          <Text>No camera permission granted.</Text>
        )}
        <StatusBar style="auto" />
        {statusBarMessage ? (
          <View className="h-10 w-full bg-red-700 shadow-xl border-b-2 border-red-900 shadow-black flex justify-center">
            <Text className=" text-sm text-center text-blue-50">
              {statusBarMessage}
            </Text>
          </View>
        ) : null}

        <View className="w-full">
          <View className="px-6 py-4">
            <Text className="font-thin text-4xl text-cyan-900 rounded-t-3xl">
              Hello, User
            </Text>
            <Text className="font-thin text-sm text-cyan-900 rounded-t-3xl">
              Stay Alert, Stay Safe
            </Text>
          </View>
          <View className="flex flex-row w-full items-start text-start px-3 my-3 justify-evenly">
            <View className="w-2/5 h-32 rounded-xl shadow-xl shadow-black justify-center pl-5 bg-blue-300">
              <Text className="text-6xl">7</Text>
              <Text className="text-lg">Alerts Raised</Text>
            </View>
            <View className="w-2/4 h-32 rounded-xl shadow-xl shadow-black justify-center pl-5 bg-blue-200">
              <Text className="text-6xl">3</Text>
              <Text className="text-lg">Sleep Count</Text>
            </View>
          </View>
          <View className="flex flex-row w-full items-start text-start px-3 my-3 justify-evenly">
            <View className="w-2/4 h-32 rounded-xl shadow-xl shadow-black justify-center pl-5 bg-blue-200">
              <View className="flex flex-row items-baseline">
                <Text className="text-6xl">{speed}</Text>
                <Text className="text-2xl pl-2">km/hr</Text>
              </View>
              <Text className="text-lg">Inst. Speed</Text>
            </View>
            <View className="w-2/5 h-32 rounded-xl shadow-xl shadow-black justify-center pl-5 bg-blue-300">
              <View className="flex flex-row items-baseline">
                <Text className="text-6xl">40</Text>
                <Text className="text-2xl pl-1">km/hr</Text>
              </View>
              <Text className="text-lg">Avg. Speed</Text>
            </View>
          </View>
          <View className="flex flex-row w-full items-start text-start px-3 my-3 justify-evenly">
            <View className="w-2/5 h-32 rounded-xl shadow-xl shadow-black justify-center pl-5 bg-blue-300">
              <Text className="text-6xl">3</Text>
              <Text className="text-lg">Call Blocks Count</Text>
            </View>
            <View className="w-2/4 h-32 rounded-xl shadow-xl shadow-black justify-center px-5 bg-blue-200">
              <Text className="text-6xl text-gray-700">-</Text>
              <Text className="text-lg text-gray-700">Reward Points</Text>
              <Text className="text-sm text-gray-700">
                feature to be launch
              </Text>
            </View>
          </View>
        </View>
        <Image
          source={require("../../assets/safe-drive logo.jpeg")}
          className="h-36 w-96 rounded-full mt-2"
        />
        {/* 
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Safe-Drive Guardian</Text>
        <Text style={styles.subtitle}>Stay Alert, Stay Safe</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("Start Detection pressed")}
        >
          <Text style={styles.buttonText}>Start Detection</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Version 1.0.0</Text>
      </View> */}
      </View>
    </ScrollView>
  );
};

export default Home;
