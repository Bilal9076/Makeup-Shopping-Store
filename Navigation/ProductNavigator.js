import * as  React from 'react';
import { Platform, View, Button, SafeAreaView, StyleSheet, TouchableOpacity,Image,ImageBackground} from 'react-native'
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons, FontAwesome5, MaterialIcons,FontAwesome,AntDesign,Feather ,Entypo } from '@expo/vector-icons'
import Color from '../Constants/Colors';
// import * as AdminAuthActions from '../Store/Actions/AdminAuthAction'
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
import CategoriesStack from './CategoriesStack'
import OrderStack from './OrderStack'
import ProductCartStack from './Cartstack';
import MainButton from '../Components/CustomButton'
import * as CustomerAuthActions from '../Store/Action/CustomerAuthAction'

const DrawerStackNavigator = createDrawerNavigator()

const ProductNavigator = () => {
  const dispatch = useDispatch();
  return (
    <DrawerStackNavigator.Navigator
      drawerContent={props => {
        return (
          <View style={styles.drawerContent}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <View style={styles.userInfoSection}>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <Avatar.Image
                    source={require('../assets/atn.png')}
                    size={60}
                  />
                  <View style={{ marginLeft: 13 }}>
                    <Title style={styles.title}>MakeUp</Title>
                    <Caption style={styles.Caption}>Shopping Store</Caption>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.section}>
                    <Paragraph style={styles.Paragraph}>20 </Paragraph>
                    <Caption style={styles.Caption}>Employee</Caption>
                  </View>
                  <View style={styles.section}>
                    <Paragraph style={styles.Paragraph}>5 </Paragraph>
                    <Caption style={styles.Caption}>Branch</Caption>
                  </View>
                </View>
              </View>
              <DrawerItemList {...props} />
              <MainButton style={styles.button} onPress={()=>{dispatch(CustomerAuthActions.Logout())}}>Logout</MainButton>
   
            </SafeAreaView>
          </View>
        )
      }
      }
    >
      <DrawerStackNavigator.Screen
        name="All Product"
        component={CategoriesStack}
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
        name="Cart item"
        component={ProductCartStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Entypo name="shopping-cart" size={focused ? 25 : 20} color={focused ? 'white' : 'gray'} />
          ),
          headerShown: false,
          drawerActiveTintColor: 'white',
          drawerActiveBackgroundColor: Color.primary
        }}
      />
      <DrawerStackNavigator.Screen
        name="Order item"
        component={OrderStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Ionicons name={'list'} size={focused?25:20} color={focused?'black':'gray'}/> 
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
    marginTop: 3,
    fontWeight: 'bold'
  },
  Caption: {
    fontSize: 15,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    // borderRadius:1,
    // borderColor:'black',
    // borderBottomWidth:1
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
  button:{
    borderRadius:5,
    marginTop:10,
    margin:5
    // height:60,
    // paddingVertical:15
  }
})


export default ProductNavigator;