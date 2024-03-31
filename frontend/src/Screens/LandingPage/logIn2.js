// Login.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { Menu } from "react-native-paper";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userUid, setUserid] = useState();

  const handleLogin = async () => {
    console.log(`Logging in with ${email} and password: ${password}`);
    try {
      await axios
        .post("http://192.168.0.7:5003/api/user/getUser", {
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
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
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
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
  },
  linkText: {
    color: "#3498db",
    fontSize: 14,
    marginTop: 12,
  },
});

export default Login;
