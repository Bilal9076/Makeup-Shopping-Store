import React from 'react';
import { Text, View, Button, StyleSheet, ImageBackground } from 'react-native';
import CustomButton from '../Components/CustomButton'
import Color from '../Constants/Colors';


const StartScreen = props => {
       return (
              <ImageBackground
                     source={require('../assets/front.jpg')}
                     style={styles.screen}
              > 
              <View style={styles.TextContainer}>
                     <Text style={styles.text}>Online MakeUp Shopping Store</Text>
              </View>
                     <View style={styles.container}>
                            <CustomButton
                             onPress={() => {
                                   props.navigation.navigate('Admin login')
                             }}
                                   style={styles.AdminButton}
                            >Admin</CustomButton>

                            <CustomButton onPress={() => { props.navigation.navigate('Customer Login') }}
                                   style={styles.StudentButton}
                            >Users</CustomButton>

                     </View>
              </ImageBackground>
       );
};

const styles = StyleSheet.create({
       screen: {
              flex: 1,
              width: '100%',
              height: '100%'
              // backgroundColor: '#2c3e50',
       },
       container: {
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              alignContent: 'center',
              marginTop:350
       },
       StudentButton: {
              width: 280,
              height: 42,
              marginVertical:15,
              backgroundColor:Color.primary,
              opacity:0.9
       },
       AdminButton: {
              width: 280,
              height: 42,
              backgroundColor:Color.primary,
              opacity:0.9
       },
       TextContainer:{
         marginLeft:130,
         marginTop:30
       },
       text:{
         fontSize:30,
         color:Color.primary,
         fontFamily:'Bold'
       }
})

export const ScreenOptions = navData => {
       return {
              headerTitle: 'Welcome',
              headerStyle: {
                     backgroundColor: Platform.OS === 'android' ? Color.primary : 'white'
              },
              headerTitleStyle: {
              },
              headerTintColor: Platform.OS === 'android' ? 'white' : Color.primary
       }
}
export default StartScreen;