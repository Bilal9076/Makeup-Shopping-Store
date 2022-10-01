import * as  React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../Constants/Colors';
import OrderProductScreen,{ScreenOption as OrderProductScreenOptions} from '../Screen/Admin/OrderProduct'
const Stack = createStackNavigator()

const DefaultNavOption = {
       headerStyle: {
         backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
       },
       headerTintColor: Platform.OS === 'android'? 'white':Colors.primary
     }

const AdminOrderStack = () =>{
       return(
              <Stack.Navigator screenOptions={DefaultNavOption}>
               <Stack.Screen
                name="Order Product"
                component={OrderProductScreen}
                options={OrderProductScreenOptions}
              />
            </Stack.Navigator>
       )
};

export default AdminOrderStack;