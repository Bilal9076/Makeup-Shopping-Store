import React, { Component } from 'react';
import { View, Text, StyleSheet,Image ,Button} from 'react-native';
import Card from '../Components/Card'
import { useSelector, useDispatch } from 'react-redux'
import Color from '../Constants/Colors'
import MainButton from '../Components/MainButton'
// import MainButton from '../../Components/UI/CustomButton'

// create a component
const UserProfileItem = (props) => {
    
    return (
        <View style={styles.screen}>
            <Card style={styles.container}>
                <View style={styles.summary}>
                    {/* <Text style={styles.title}>{props.Name}</Text> */}
                    <Text style={styles.Email}>{props.Email}</Text>
                  
                </View>
                <View style={styles.btnContainer}>
                    <MainButton
                        style={styles.acceptbtn}
                        onPress={props.onAccept}
                    //  disabled={props.disabled}
                    >Accept</MainButton>
                    <MainButton style={styles.concelbtn} onPress={props.onDelete}>Decline</MainButton>
                </View>
                </Card>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    title: {
        fontFamily: 'Bold',
        fontSize: 17,
        color: 'black',
    
    },
    Email:{
        fontSize: 17,
        color: 'black',
        fontFamily: 'Bold',
    },
    image: {
        width: 70,
        height: 70,
        borderRadius:35,
    },
    summary: {
        
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        marginBottom:8
    },
    container: {
        // flex:1,
        margin:20,
         marginVertical:13,
         padding: 10,
         alignItems: 'center',
         width:350
     },
     attendence:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center'     
     },

     btn:{
       width:130,
       height:40,
       marginTop:7
     },
     btnContainer: {
        // flex: 1,
        width: '90%',
        flexDirection: 'row',
        justifyContent:'space-between',
        // alignContent: 'space-between',
        marginVertical: 6
    },
    acceptbtn: {
        width: 90,
        borderRadius: 15,
        paddingVertical: 7,
        height: 37
    },
    concelbtn: {
        width: 90,
        borderRadius: 15,
        paddingVertical: 7,
        height: 37,
        // marginLeft:110
    }
});

//make this component available to the app
export default UserProfileItem;