import * as  React from 'react';
import { Platform, View, Button, SafeAreaView, StyleSheet, TouchableOpacity,Image,ImageBackground} from 'react-native'
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons, FontAwesome5, MaterialIcons,FontAwesome,AntDesign,Feather ,Entypo,MaterialCommunityIcons } from '@expo/vector-icons'
import Color from '../Constants/Colors';
import * as AdminAuthActions from '../Store/Action/AdminAuthAction'
import { useDispatch, useSelector } from 'react-redux';
import {
  Text,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  TouchableRipple,
  Switch
} from 'react-native-paper'
import ProductStack from './ProductStack'
import OrderStack from './OrderStack'
import MainButton from '../Components/MainButton'
import AdminOrderStack from './AdminOrderStack';
import SoldProductStack from './SoldProductStack';
import UserconfrimationStack from './UserConfrimationStack';

const DrawerStackNavigator = createDrawerNavigator()

const AdminNavigator = () => {
  const dispatch = useDispatch();
  return (
    <DrawerStackNavigator.Navigator
      drawerContent={props => {
        return (
          <View style={styles.drawerContent}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <ImageBackground
          source={require('../assets/bg9.png')}
          style={{padding: 20,height:210}}
          >
          <Image
            source={require('../assets/icon2.jpg')}
            style={{height: 100, width: 100, borderRadius: 50, marginBottom:10}}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 20,
              marginBottom: 2,
              marginLeft:10
            }}>
            Admin
          </Text>
          {/* <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: '#fff',
                marginRight: 5,
              }}>
            Admin123@gmail.com
            </Text>
          </View> */}
        </ImageBackground>
              <View style={styles.row}>
                
                </View>
              <DrawerItemList {...props} />
              <MainButton style={styles.button} onPress={()=>{dispatch(AdminAuthActions.Logout())}}>Logout</MainButton>
   
            </SafeAreaView>
          </View>
        )
      }
      }
    >
      <DrawerStackNavigator.Screen
        name="Available Product"
        component={ProductStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Ionicons name={'gift-sharp'} size={focused?25:20} color={focused?'black':'gray'}/>
          ),
          headerShown: false,
          drawerActiveTintColor: 'white',
          drawerActiveBackgroundColor: Color.primary
        }}
      />
      <DrawerStackNavigator.Screen
        name="User Order"
        component={AdminOrderStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Ionicons name={'list'} size={focused?25:20} color={focused?'black':'gray'}/> 
          ),
          headerShown: false,
          drawerActiveTintColor: 'white',
          drawerActiveBackgroundColor: Color.primary
        }}
      />
         <DrawerStackNavigator.Screen
        name="Sold item"
        component={SoldProductStack}
        options={{
          drawerIcon: ({ focused }) => (
            <MaterialCommunityIcons name="soldering-iron" size={focused ? 23 : 20} color={focused ? 'white' : 'gray'} />
          ),
          headerShown: false,
          drawerActiveTintColor: 'white',
          drawerActiveBackgroundColor: Color.primary
        }}
      />
          <DrawerStackNavigator.Screen
        name="User Request"
        component={UserconfrimationStack }
        options={{
          drawerIcon: ({ focused }) => (
            <MaterialIcons name="app-registration" size={focused ? 23 : 20} color={focused ? 'white' : 'gray'}/>
          ),
          headerShown: false,
          drawerActiveTintColor: 'white',
          drawerActiveBackgroundColor: Color.primary
        }}
      />


    </DrawerStackNavigator.Navigator>
  )
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: 30
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: 'bold',
  
  },
  Caption: {
    fontSize: 15,
    lineHeight: 14,
    // marginLeft:5
  },
  row: {
    marginTop: 15,
    marginVertical: 15,
  
    borderColor:Color.primary
  },
  row1: {
    flexDirection: 'column',
    marginLeft: 10,
    alignItems: 'center'
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 14,
  },
  Paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
    marginTop: -4
  },
  drawerSection: {
    marginTop: 15
  },
  image: {
    width: 120,
    height: 120,
    borderRadius:60
},
  button:{
    borderRadius:5,
    marginTop:10,
  margin:9,
    height:45,
    // paddingVertical:15
  }
})

export default AdminNavigator;