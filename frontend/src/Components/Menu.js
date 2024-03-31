import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import Home from "../Screens/Home";
import Notifications from "../Screens/Notifications";
import MyProfile from "../Screens/MyProfile";
import Map from "../Screens/Map";

// Screen names
const HomeName = "Home";
const NotificationsName = "Notifications";
const MapName = "Map";
const MyProfileName = "My Profile";

const Stack = createBottomTabNavigator();

function Menu({ route }) {
  console.log("Data received after loging in user: ", route.params);

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName={HomeName} // Set LandingPage as the initial route
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === HomeName) {
              iconName = focused ? "home-sharp" : "home";
            } else if (rn === NotificationsName) {
              iconName = focused
                ? "notifications-sharp"
                : "notifications-outline";
            } else if (rn === MapName) {
              iconName = focused ? "map-sharp" : "map-outline";
            } else if (rn === MyProfileName) {
              iconName = focused ? "person-circle" : "person-circle-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "black",
          inactiveTintColor: "black",
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 15, height: 70 },
        }}
      >
        <Stack.Screen
          name={HomeName}
          component={Home}
          initialParams={{ userData: route.params }}
        />
        {/* <Stack.Screen name={NotificationsName} component={Notifications} /> */}
        <Stack.Screen name={MapName} component={Map} />
        <Stack.Screen
          name={MyProfileName}
          component={MyProfile}
          initialParams={{ userData: route.params }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Menu;

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// // Screens
// // import LandingPage from '../Screens/LandingPage/LandingPage';
// import Home from '../Screens/Home';
// import Notifications from '../Screens/Notifications';
// import MyProfile from '../Screens/MyProfile';
// import Map from '../Screens/Map';
// // import Login from '../Screens/LandingPage/logIn2';
// // import SignUp from '../Screens/LandingPage/signUp2';

// // Screen names
// const HomeName = 'Home';
// const NotificationsName = 'Notifications';
// const MapName = 'Map';
// const MyProfileName = 'My Profile';
// // const LandingPageName = 'LandingPage';
// // const LoginPageName = 'login page';
// // const signUpPageName = 'signUp page';

// const Stack = createBottomTabNavigator();
// const AuthStack = createStackNavigator();

// function AuthStackScreen() {
//   return (
//     <AuthStack.Navigator>
//       <AuthStack.Screen
//         name={LandingPageName}
//         component={LandingPage}
//         options={{ headerShown: false }}
//       />
//       <AuthStack.Screen
//         name={LoginPageName}
//         component={Login}
//         options={{ headerShown: false }}
//       />
//       <AuthStack.Screen
//         name={signUpPageName}
//         component={SignUp}
//         options={{ headerShown: false }}
//       />
//     </AuthStack.Navigator>
//   );
// }

// function Menu() {
//   // Set this variable based on your logic (e.g., user is not logged in)
//   const shouldShowAuthScreens = true;

//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName={HomeName}
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;
//             let rn = route.name;

//             if (rn === HomeName) {
//               iconName = focused ? 'home-sharp' : 'home';
//             } else if (rn === NotificationsName) {
//               iconName = focused ? 'notifications-sharp' : 'notifications-outline';
//             } else if (rn === MapName) {
//               iconName = focused ? 'map-sharp' : 'map-outline';
//             } else if (rn === MyProfileName) {
//               iconName = focused ? 'person-circle' : 'person-circle-outline';
//             }

//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//         })}
//         tabBarOptions={{
//           activeTintColor: 'black',
//           inactiveTintColor: 'black',
//           labelStyle: { paddingBottom: 10, fontSize: 10 },
//           style: { padding: 15, height: 70 },
//         }}
//       >
//         <Stack.Screen name={HomeName} component={Home} />
//         <Stack.Screen name={NotificationsName} component={Notifications} />
//         <Stack.Screen name={MapName} component={Map} />
//         <Stack.Screen name={MyProfileName} component={MyProfile} />

//         {shouldShowAuthScreens && (
//           <Stack.Screen
//             name="AuthScreens"
//             component={AuthStackScreen}
//             options={{ tabBarVisible: false }}
//           />
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default Menu;
