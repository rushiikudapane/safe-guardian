// import React from "react";
// // import "tailwindcss/tailwind.css";
// // import "./index.css";
// // import Menu from "../frontend/src/Components/Menu";
// import LandingPage from "./src/Screens/LandingPage/LandingPage";

// export default function App() {
//   return <LandingPage/>;
// }

// App.js
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingPage from './src/Screens/LandingPage/LandingPage';
import Login from './src/Screens/LandingPage/logIn2';
import SignUp from './src/Screens/LandingPage/signUp2';
import Menu from "../frontend/src/Components/Menu";
import { HeaderShownContext } from '@react-navigation/elements';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="LandingPage">
        <Stack.Screen name="LandingPage" component={LandingPage} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

