
// Login.js
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
import { FontAwesome } from '@expo/vector-icons';


const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userUid, setUserid] = useState();

    let [fontsLoaded] = useFonts({
    JosefinSans_400Regular,
    JosefinSans_500Medium,
    JosefinSans_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }


  const handleLogin = async () => {
    console.log(`Logging in with ${email} and password: ${password}`);
    try {
      await axios
        .post("http://192.168.0.110:5003/api/user/getUser", {
          email,
          password,
        })
        .then((response) => {
          console.log("Server response: ", response.data.data._id);
          console.log("Login Successfull");
          setUserid(response.data.data._id);

          setTimeout(() => {
            navigation.navigate("Menu", response.data.data);
          }, 2000);
        })
        .catch((error) => {
          if (error.response.status == 404) {
            console.error("User does not exist, please signup.");
            Alert.alert("User doesn't exist")
          }
          if (error.response.status == 403) {
            console.error(
              "Credentials did not match, please check the credentials."
            );
          }
        });
    } catch (err) {
      console.log("Error while sending login request: ", err.message);
    }

    // navigation.navigate("Menu");
  };

  const navigateToSignUp = () => {
    navigation.navigate("SignUp"); // Assuming you have a 'SignUp' screen in your navigation stack
  };

  const imageSource = require('../../../assets/login-image6.png');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back !</Text>
      <View style={styles.hero}>
        <Image
          source={imageSource}
          style={styles.heroImage}
          resizeMode="contain"
         />
       </View>

      <View style={styles.inputContainer}>
      <FontAwesome name="user" size={24} color="black" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      </View>

      <View style={styles.inputContainer}>
      <FontAwesome name="lock" size={24} color="black" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateToSignUp}>
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 30,
    marginVertical: -16,
    marginTop:-100,
    fontFamily:"JosefinSans_700Bold",
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 8,
  },
  icon: {
    marginRight: 10,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 15,
    width: '100%',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontFamily:"JosefinSans_700Bold"
  },
  linkText: {
    color: '#3498db',
    fontSize: 14,
    marginTop: 12,
  },
  heroImage: {
    width: 350,
    height: 400,
  },
});

export default Login;
