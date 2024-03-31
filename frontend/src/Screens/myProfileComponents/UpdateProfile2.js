import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const UpdateProfile = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');

  const handleUpdateProfile = () => {
    // Perform the logic to update the user's profile on your backend

    // For demonstration purposes, show an alert with the updated information
    Alert.alert('Profile Updated', `Name: ${name}\nEmail: ${email}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Your Profile</Text>


      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
        <Text style={styles.buttonText}>Update Profile</Text>
        
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 8,
  },
  updateButton: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    padding: 12,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default UpdateProfile;