import * as  React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../Constants/Colors';
import SoldProductScreen,{ScreenOption as SoldProductScreenOptions} from '../Screen/Admin/SoldProduct'
const Stack = createStackNavigator()

const DefaultNavOption = {
       headerStyle: {
         backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
       },
       headerTintColor: Platform.OS === 'android'? 'white':Colors.primary
     }

const SoldProductStack = () =>{
       return(
              <Stack.Navigator screenOptions={DefaultNavOption}>
               <Stack.Screen
                name="Order Product"
                component={SoldProductScreen}
                options={SoldProductScreenOptions}
              />
            </Stack.Navigator>
       )
};

export default SoldProductStack;