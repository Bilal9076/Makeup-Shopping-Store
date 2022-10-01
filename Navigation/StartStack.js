import * as  React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../Constants/Colors';
import startScreen, {ScreenOptions as StartScreenOptions} from '../Screen/StartScreen';
// import AdminSignUpScreen from '../Screens/Admin/AdminSignUpScreen'
import CustomerLoginScreen,{ScreenOptions as CustomerLoginScreenScreenOptions} from '../Screen/Customer/CustomerLoginScreen'
import CustomerSignUpScreen,{ScreenOptions as CustomerSignUpScreenScreenOptions} from '../Screen/Customer/CustomerSignUpScreen'
import AdminLoginScreen ,{ScreenOptions as AdminLoginScreenScreenOptions} from '../Screen/Admin/AdminLoginScreen'
import AdminSigupScreen ,{ScreenOptions as AdminSigupScreenScreenOptions} from '../Screen/Admin/AdminSignUpScreen'
const Stack = createStackNavigator()

const DefaultNavOption = {
       headerStyle: {
         backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
       },
       headerTintColor: Platform.OS === 'android'? 'white':Colors.primary
     }

const StartStack = () =>{
       return(
              <Stack.Navigator screenOptions={DefaultNavOption}>
              <Stack.Screen
                name="Start"
                component={startScreen}
                options={StartScreenOptions}
              />
               <Stack.Screen
                name="Customer Login"
                component={CustomerLoginScreen}
                options={CustomerLoginScreenScreenOptions}
              />
               <Stack.Screen
                name="Customer SignUp"
                component={CustomerSignUpScreen}
                options={CustomerSignUpScreenScreenOptions}
              />
               <Stack.Screen
                name="Admin login"
                component={AdminLoginScreen }
                options={AdminLoginScreenScreenOptions}
              />
              <Stack.Screen
                name="Admin Signup"
                component={AdminSigupScreen}
                options={AdminSigupScreenScreenOptions}
              />
            </Stack.Navigator>
       )
};

export default StartStack;