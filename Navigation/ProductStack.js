import * as  React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../Constants/Colors';
import UserProductScreen,{ScreenOptions as UserProductScreenOption} from '../Screen/Admin/UserProduct'
import EditProductScreen,{ScreenOptions as EditProductScreenScreenOptions} from '../Screen/Admin/EditProduct'
const Stack = createStackNavigator()

const DefaultNavOption = {
       headerStyle: {
         backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
       },
       headerTintColor: Platform.OS === 'android'? 'white':Colors.primary
     }

const ProductOverViewStack = () =>{
       return(
              <Stack.Navigator screenOptions={DefaultNavOption}>
               <Stack.Screen
                name="All Product"
                component={UserProductScreen}
                options={UserProductScreenOption}
              />
                <Stack.Screen
                name="Edit Product"
                component={EditProductScreen}
                options={EditProductScreenScreenOptions}
              />
            </Stack.Navigator>
       )
};

export default ProductOverViewStack;