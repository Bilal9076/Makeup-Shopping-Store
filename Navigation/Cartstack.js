import * as  React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../Constants/Colors';
import CartProductScreen,{ScreenOption as CartProductScreenOptions} from '../Screen/Customer/CartScreen'
const Stack = createStackNavigator()

const DefaultNavOption = {
       headerStyle: {
         backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
       },
       headerTintColor: Platform.OS === 'android'? 'white':Colors.primary
     }

const ProductCartScreen = () =>{
       return(
              <Stack.Navigator screenOptions={DefaultNavOption}>
               <Stack.Screen
                name="Cart Product"
                component={CartProductScreen}
                options={CartProductScreenOptions}
              />
            </Stack.Navigator>
       )
};

export default ProductCartScreen;