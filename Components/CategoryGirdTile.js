import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableNativeFeedback, Platform,ImageBackground,Button } from 'react-native'
import Color from '../Constants/Colors'
import CustomButton from '../Components/CustomButton'

const CategoryGirdTile = props => {
    let TouchableCamp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCamp = TouchableNativeFeedback;
    }
    return (
       
        <View style={styles.GirdItem}>
            
                 <ImageBackground
        source={{ uri: props.image }}
        style={styles.image} 
        >
                <View style={styles.container}>

                </View>
                <CustomButton
                onPress={props.onselect}
                style={styles.btn}
                >{props.title}</CustomButton>
                </ImageBackground>
              
           
        </View>
    );
};
const styles = StyleSheet.create({
    GirdItem: {
        flex: 1,
        margin: 5,
        height: 220,
        borderRadius: 10,
        overflow:  Platform.OS === 'android' && Platform.Version >= 21 ? 'hidden' :'visible',
        elevation: 6,
    },
    image: {
        width: '100%',
        height: '100%',
        flex:1
    },
    container: {
        borderRadius: 2,
        borderColor: 'red',
        shadowColor: 'red',
        shadowOpacity: 2,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 2 },
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Bold',
        fontSize: 20,
        color:Color.primary
    },
    btn:{
        borderRadius:0
    }
})
export default CategoryGirdTile;