import React, { useEffect, useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import { Alert } from "react-native";
import * as Notification from "expo-notifications";
import { Audio } from "expo-av";
import { Camera, CameraType } from "expo-camera";
import axios from "axios";
import * as FileSystem from "expo-file-system";

import { useFonts } from "expo-font";
import { JosefinSans_400Regular, JosefinSans_500Medium, JosefinSans_700Bold } from "@expo-google-fonts/josefin-sans";
import AppLoading from "expo-app-loading";


const Home = ({ route }) => {
  const user = route.params.userData;
  // console.log("Data from home component: ", route.params.userData);

  const [speed, setSpeed] = useState(0);
  const [statusBarMessage, setStatusBarMessage] = useState("");
  // const cameraRef = useRef(null);
  const [camera, setCamera] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [alertCount, setAlertCount] = useState(0);
  const [sleepCount, setSleepCount] = useState(0);

  let [fontsLoaded] = useFonts({
    JosefinSans_400Regular,
    JosefinSans_500Medium,
    JosefinSans_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

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
    console.log(
      "permision status from capturePhoto method: ",
      hasCameraPermission
    );

    setInterval(async () => {
      if (camera) {
        try {
          const data = await camera.takePictureAsync();
          // console.log("Captured photo object: ", data.base64);
          // const serverUrl = "http://localhost:5003/api/sendImage/detect";

          // console.log("Image object: ", data);
          const fileUri = data.uri;
          const fileInfo = await FileSystem.getInfoAsync(fileUri);

          // console.log("fileInfo: ", fileInfo);
          if (!fileInfo.exists) {
            throw new Error("File does not exist.");
          }

          const formData = new FormData();
          formData.append("image", {
            uri: fileUri,
            name: "image.jpg",
            type: "image/jpeg",
          });

          axios
            .post("http://192.168.0.110:5003/api/sendImage/detect", formData, 
            {
              headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response) => {
              console.log("Server response:", response.data);
              checkDrowsinessScore(response.data);
            })
            .catch((error) => {
              console.error("Error while sending image data:", error.message);
            });
        } catch (err) {
          console.log("Error while capturign the photo: ", err.message);
        }
      } else {
        console.log("Camera ref is null");
      }
    }, 5000);
  };

  const checkDrowsinessScore = async (score) => {
    console.log("Score fron method: ", score.score);
    if (score.score >= 5) {
      setAlertCount(alertCount + 1);
      setStatusBarMessage("Don't sleep! You may risk yours and other lives.");

      const playBackStatus = await sound.getStatusAsync();

      if (!playBackStatus.isPlaying) {
        await sound.playAsync();
      }
    } else {
      setStatusBarMessage("");
      const playBackStatus = await sound.getStatusAsync();
      if (playBackStatus.isPlaying) {
        await sound.unloadAsync();
        await sound.loadAsync(require("../../assets/Audio/warning.mp3"));
      }
    }
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
            setAlertCount(alertCount + 1);
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
        <View style={styles.cameraContainer}>
          {hasCameraPermission ? (
            <Camera
              type={CameraType.front}
              autoFocus={Camera.Constants.AutoFocus.off}
              ref={(ref) => setCamera(ref)}
              style={styles.fixedRatio}
              onCameraReady={() => {
                console.log("Camera is ready");
                capturePhoto();
              }}
              ratio={"1:1"}
              onMountError={() => {
                console.log("error while loading camera");
              }}
            />
          ) : (
            <Text>No camera permission granted.</Text>
          )}
        </View>
        <StatusBar style="auto" />
        {statusBarMessage ? (
          <View className="h-10 w-full bg-red-700 shadow-xl border-b-2 border-red-900 shadow-black flex justify-center">
            <Text className=" text-sm text-center text-blue-50">
              {statusBarMessage}
            </Text>
          </View>
        ) : null}

        <View className="w-full">

          <View className="my-10 px-6 py-4">
            <Text style={styles.title} className="font-thin text-4xl text-cyan-900 rounded-t-3xl">
              Hello,{'\n'}{user.fullName}
            </Text>
            <Text style={styles.title} className="font-thin text-sm text-cyan-900 rounded-t-3xl font-serif">
            {'\n'} Stay Alert, Stay Safe !
            </Text>
          </View>
          <View className="flex flex-row w-full items-start text-start px-3 my-3 justify-evenly">
            <View className="w-2/5 h-32 rounded-xl shadow-xl shadow-black justify-center pl-5 bg-blue-300">
              <Text className="text-6xl">{alertCount}</Text>
              <Text className="text-lg">Alerts Raised</Text>
            </View>
            <View className="w-2/4 h-32 rounded-xl shadow-xl shadow-black justify-center pl-5 bg-blue-200">
              <Text className="text-6xl">{sleepCount}</Text>
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
              <Text className="text-6xl"> - </Text>
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
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  cameraContainer: {
    flex:2,
    zIndex: 2,
    flexDirection: "row",
    position:'absolute',
    top:50,
    left:115,
    marginHorizontal:130,
    // right:120,
  },
  fixedRatio: {
    flex: 2,
    zIndex: 3,
    aspectRatio: 1,
  },
  title:{
    // fontSize:30,
    fontFamily:"JosefinSans_500Medium"
  },
  
});


export default Home;
