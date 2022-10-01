import * as  React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../Constants/Colors';
import ProductOverViewScreen,{ScreenOption as ProductOverViewScreenScreenOptions} from '../Screen/Customer/Categories'
import CategoryProductScreen,{ScreenOptions as CategoryProductScreenScreenOptions} from '../Screen/Customer/CategoryProductScreen'
import ProductDetailScreen,{ScreenOptions as ProductDetailScreenScreenOptions} from '../Screen/Customer/ProductDetailScreen';
import CartScreen,{ScreenOptions as CartScreenOptions} from '../Screen/Customer/CartScreen';
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
                name="Available Product"
                component={ProductOverViewScreen}
                options={ProductOverViewScreenScreenOptions}
              />
                <Stack.Screen
                name="Category Product"
                component={CategoryProductScreen}
                options={CategoryProductScreenScreenOptions}
              />
               <Stack.Screen
                name="Product Detail"
                component={ProductDetailScreen}
                // options={ProductOverViewScreenScreenOptions}
              />
              <Stack.Screen
                name="CartScreen"
                component={CartScreen}
                options={CartScreenOptions}
              />
            </Stack.Navigator>
       )
};

export default ProductOverViewStack;