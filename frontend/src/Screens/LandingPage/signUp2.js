
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image
} from "react-native";
import axios from "axios";
import { useFonts } from "expo-font";
import { JosefinSans_400Regular, JosefinSans_500Medium, JosefinSans_700Bold } from "@expo-google-fonts/josefin-sans";
import AppLoading from "expo-app-loading";

const SignUp = ({ navigation }) => {
  const [fullName, setFirstName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    console.log(
      `Signing up with data: ${fullName}, ${gender}, ${email}, ${phoneNumber}, ${username}, ${password}`
    );

    try {
      await axios
        .post("http://192.168.0.110:5003/api/user/register", {
          fullName,
          gender,
          email,
          phoneNumber,
          username,
          password,
        })
        .then((response) => {
          console.log("Server response: ", response.data);
          setTimeout(() => {
            navigateToLogin();
          }, 2000);
        })
        .catch((error) => {
          console.error("Error while sending signup request: ", error.message);
        });
    } catch (err) {
      console.log("Error while sending signup request: ", err.message);
    }
  };

  const navigateToLogin = () => {
    navigation.navigate('Login'); 
    Alert.alert('Account created successfully')

  };
  let [fontsLoaded] = useFonts({
    JosefinSans_400Regular,
    JosefinSans_500Medium,
    JosefinSans_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const imageSource = require('../../../assets/signup-image.jpg');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>    Begin Your Experience {'\n'} {'\n'}Sign Up for a New Account</Text>
      <View style={styles.hero}>
        <Image
          source={imageSource}
          style={styles.heroImage}
          resizeMode="contain"
         />
       </View>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={(text) => setFirstName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Gender"
        value={gender}
        onChangeText={(text) => setGender(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateToLogin}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    // fontWeight: "bold",
    marginBottom: 40,
    fontFamily:"JosefinSans_700Bold"
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 15,
    width: "100%",
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontFamily:"JosefinSans_700Bold"
  },
  linkText: {
    color: "#3498db",
    fontSize: 14,
    marginTop: 12,
  },
  heroImage: {
    width: 200,
    height: 200,
    // borderRadius: 400, // Half of the width/height to make it circular
    borderRadius: 200,
    marginVertical:20,
    marginTop:-2,
  }
});

export default SignUp;


