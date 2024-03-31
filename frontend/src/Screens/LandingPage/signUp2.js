// SignUp.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const SignUp = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // Add your signup logic here
    console.log(`Signing up with data: ${firstName}, ${lastName}, ${email}, ${phoneNumber}, ${username}, ${password}`);
  };

  const navigateToLogin = () => {
    navigation.navigate('Login'); 
    Alert.alert('Account created successfully')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
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

      <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
        <Text style={styles.buttonText}>Sign Up</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 8,
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
  },
  linkText: {
    color: '#3498db',
    fontSize: 14,
    marginTop: 12,
  },
});

export default SignUp;