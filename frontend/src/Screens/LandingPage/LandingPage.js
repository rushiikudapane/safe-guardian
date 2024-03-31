

import React, { useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,Image ,Animated,SafeAreaView} from 'react-native';
import { useFonts } from "expo-font";
import { JosefinSans_400Regular, JosefinSans_500Medium, JosefinSans_700Bold } from "@expo-google-fonts/josefin-sans";
import AppLoading from "expo-app-loading";

export default function Example({ navigation }) {

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideInAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    // Fade in animation for the title
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Slide in animation for the description
    Animated.timing(slideInAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, slideInAnim]);

  let [fontsLoaded] = useFonts({
    JosefinSans_400Regular,
    JosefinSans_500Medium,
    JosefinSans_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const imageSource = require('../../../assets/landing-image2.png');

  const handleGetStarted = () => {
        navigation.navigate('Login');
      };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.hero}>
        <Image
          source={imageSource}
          style={styles.heroImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Text style={styles.title}>
            Welcome to{'\n'} SafeDrive Guardian
            {/* <View style={styles.appName}>
              <Text style={styles.appNameText}>MyApp</Text>
            </View> */}
          </Text>
          <Text style={styles.text}>
            Stay Safe On The Road !
          </Text>
        </View>

        {/* <TouchableOpacity
          onPress={() => {handleGetStarted}}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Let's go</Text>
          </View>
        </TouchableOpacity> */}

        <TouchableOpacity style={[styles.getStartedButton, styles.button]} onPress={handleGetStarted}>
         <Text style={[styles.buttonText, styles.largeButtonText]}>Get Started</Text>
       </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:60
  },
  title: {
    fontSize: 28,
    // fontWeight: '500',
    color: '#043557',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 40,
    fontFamily:"JosefinSans_700Bold",
  },
  text: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '400',
    color: '#9992a7',
    textAlign: 'center',
    fontFamily:"JosefinSans_500Medium",
  },
  /** Hero */
  hero: {
    backgroundColor: '#BFDCEE',
    margin: 12,
    borderRadius: 200,
    padding: 16,
  },
  heroImage: {
    width: 400,
    height: 350,
  },
  /** Content */
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  contentHeader: {
    paddingHorizontal: 24,
  },
  appName: {
    backgroundColor: '034C7E',
    transform: [
      {
        rotate: '-5deg',
      },
    ],
    paddingHorizontal: 6,
  },
  appNameText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#281b52',
  },
  /** Button */
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontFamily:"JosefinSans_500Medium",
  },
});

