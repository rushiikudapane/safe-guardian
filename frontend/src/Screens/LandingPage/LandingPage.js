//landing page
// import React, { useEffect, useRef } from 'react';
// import { View, Text, TouchableOpacity, Image, StyleSheet, Animated } from 'react-native';
// import { useFonts } from "expo-font";
// import { JosefinSans_400Regular, JosefinSans_500Medium, JosefinSans_700Bold } from "@expo-google-fonts/josefin-sans";
// import AppLoading from "expo-app-loading";

// const LandingPage = ({ navigation }) => {
  // const fadeAnim = useRef(new Animated.Value(0)).current;
  // const slideInAnim = useRef(new Animated.Value(-100)).current;

  // useEffect(() => {
  //   // Fade in animation for the title
  //   Animated.timing(fadeAnim, {
  //     toValue: 1,
  //     duration: 1000,
  //     useNativeDriver: true,
  //   }).start();

  //   // Slide in animation for the description
  //   Animated.timing(slideInAnim, {
  //     toValue: 0,
  //     duration: 1000,
  //     useNativeDriver: true,
  //   }).start();
  // }, [fadeAnim, slideInAnim]);

  // let [fontsLoaded] = useFonts({
  //   JosefinSans_400Regular,
  //   JosefinSans_500Medium,
  //   JosefinSans_700Bold,
  // });

  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }

//   const handleGetStarted = () => {
//     navigation.navigate('Login');
//   };

//   const imageSource = require('../../../assets/landing-image.jpg');

//   return (
//     <View style={styles.container}>
//       <Image source={imageSource} style={styles.image} />

//       <Animated.Text style={[styles.title,  { transform: [{ translateY: slideInAnim }] }]}>Welcome to Safe-Drive Guardian</Animated.Text>
//       <Animated.Text style={[styles.description, { transform: [{ translateY: slideInAnim }] }]}>Stay Safe on the road!</Animated.Text>

//       <TouchableOpacity style={[styles.getStartedButton, styles.button]} onPress={handleGetStarted}>
//         <Text style={[styles.buttonText, styles.largeButtonText]}>Get Started</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//   },
//   image: {
//     width: '100%',
//     height: 300,
//     resizeMode: 'cover',
//     borderRadius: 15,
//     marginBottom: 16,
//     marginTop: '5%',
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 16,
//     marginTop: '5%',
//     fontFamily: "JosefinSans_700Bold",
//   },
//   description: {
//     fontSize: 16,
//     textAlign: 'center',
//     marginBottom: 24,
//     fontFamily: "JosefinSans_400Regular",
//   },
//   button: {
//     backgroundColor: '#3498db',
//     borderRadius: 15,
//     marginBottom: 12,
//     width: '100%',
//     padding: 16,
//   },
//   buttonText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontSize: 16,
//     fontFamily: "JosefinSans_700Bold",
//   },
//   largeButtonText: {
//     fontSize: 20,
//   },
// });

// export default LandingPage;

import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image,SafeAreaView, StyleSheet, Animated } from 'react-native';
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

  const imageSource = require('../../../assets/landing-image.jpg');

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
    borderRadius: 16,
    padding: 16,
  },
  heroImage: {
    width: '100%',
    height: 400,
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
