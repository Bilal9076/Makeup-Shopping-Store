import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {useFonts} from 'expo-font'

import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import AppContainer from './Navigation/AppContainer';
import ReduxThunk from 'redux-thunk';
import MealReducer from './Store/Reducer/meal';
import Product from './Store/Reducer/Product'
import CartProduct from './Store/Reducer/Cart' 
import  OrdersProduct  from './Store/Reducer/Orders';
import CustomerAuthReducer from './Store/Reducer/CustomerAuthReducer'
import SoldProduct from './Store/Reducer/SoldProduct'
import AccecptedOrder from './Store/Reducer/AcceptedOrder'
import AdminAuthReducer from './Store/Reducer/AdminAuthReducer'
import UserSignUpReducer from './Store/Reducer/AuthAction'

const rootReducer = combineReducers({
  meal:MealReducer,
   Auth:CustomerAuthReducer,
   AmdinAuth:AdminAuthReducer,
  Product:Product,
  Orders:OrdersProduct,
  Cart:CartProduct,
  Sold:SoldProduct,
  AccecptedOrder:AccecptedOrder,
  UserSignUp:UserSignUpReducer
})

const store = createStore(rootReducer , applyMiddleware(ReduxThunk));
export default function App() {
  const [loaded]= useFonts({
    RobotoBold: require('./assets/font/RobotoBold.ttf'),
    RobotoLight:require('./assets/font/RobotoLight.ttf'),
    RobotoRegular:require('./assets/font/RobotoRegular.ttf'),
    Bold:require('./assets/font/Bold.ttf'),
    Regular:require('./assets/font/Regular.ttf')
  })
  if(!loaded){
    return null
  }
  return (
    <Provider store ={store}>
   <AppContainer/> 
  </Provider> 
  );
}


