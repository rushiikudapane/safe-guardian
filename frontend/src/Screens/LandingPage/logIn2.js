
// // Login.js
// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import { Menu } from 'react-native-paper';

// const Login = ({ navigation }) => {
//   const [usernameOrEmail, setUsernameOrEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     // Add your login logic here
//     navigation.navigate('Menu');
//     console.log(`Logging in with ${usernameOrEmail} and password: ${password}`);
//   };

//   const navigateToSignUp = () => {
//     navigation.navigate('SignUp'); // Assuming you have a 'SignUp' screen in your navigation stack
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Username or Email"
//         value={usernameOrEmail}
//         onChangeText={(text) => setUsernameOrEmail(text)}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={(text) => setPassword(text)}
//       />

//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={navigateToSignUp}>
//         <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
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
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   input: {
//     width: '100%',
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 12,
//     paddingLeft: 8,
//     borderRadius: 8,
//   },
//   button: {
//     backgroundColor: '#3498db',
//     padding: 15,
//     borderRadius: 15,
//     width: '100%',
//     marginBottom: 12,
//   },
//   buttonText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontSize: 16,
//   },
//   linkText: {
//     color: '#3498db',
//     fontSize: 14,
//     marginTop: 12,
//   },
// });

// export default Login;




import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = () => {
    // Here you would typically perform your actual login logic,
    // such as making a network request to validate the credentials.
    // For demonstration purposes, we'll assume the login fails.
    const loginSuccess = true;//false

    if (loginSuccess) {
      // If login is successful, navigate to the Menu screen or any other desired screen.
      navigation.navigate('Menu');
      Alert.alert('Login Successfully')
    } else {
      // If login fails, show an alert notification.
      Alert.alert(
        'Login Failed',
        'Please check your credentials and try again',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
    }
  };

  const navigateToSignUp = () => {
    navigation.navigate('SignUp'); // Assuming you have a 'SignUp' screen in your navigation stack
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Username or Email"
        value={usernameOrEmail}
        onChangeText={(text) => setUsernameOrEmail(text)}
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

export default Login;
