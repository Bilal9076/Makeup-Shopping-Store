import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, ScrollView, Image, Modal, Pressable, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import Color from '../Constants/Colors'
import CustomButton from '../Components/CustomButton'
import Card from '../Components/Card'


const AcceptedOrderDetail = props => {
    const [ShowDetail, SetShowDetail] = useState(false)
    const [Alert, SetAlert] = useState(false)
    const [Error, SetError] = useState()
    const [Isloading, SetIsloading] = useState(false);
    return (

        <View style={styles.screen}>
            <Card style={styles.orderItem}>
                {/* <Text style={styles.time}>{props.time}</Text>  */}
                <View style={styles.summary}>
                    <Image style={styles.image} source={{ uri: props.imageUrl }} />
                    <Text style={styles.title}>{props.title}</Text>
                    <CustomButton style={styles.button} onPress={() => { SetAlert(true) }}>Details</CustomButton>
                </View>
                
                <Modal visible={Alert}
                    animationType="fade"
                    transparent={true}
                    onRequestClose={() => {
                        SetAlert(false)
                    }}
                >

                    <View style={styles.center_View}>

                        <View style={styles.warning_modal}>
                            <View style={styles.warning_title}>
                                <Text style={styles.text}>{props.title}</Text>
                            </View>
                            <View style={styles.CustomerDetail}>
                                <Text style={styles.customer}>Qauntity:</Text>
                                <Text style={styles.name}>{props.qauntity}</Text>
                            </View>
        
                            <View style={styles.CustomerDetail}>
                                <Text style={styles.customer}>City:</Text>
                                <Text style={styles.name}>{props.City}</Text>
                            </View>
                            <View style={styles.CustomerDetail}>
                                <Text style={styles.customer}>Postal Address:</Text>
                                <Text style={styles.name}>{props.PostalAddress}</Text>
                            </View>
                            <View style={styles.CustomerDetail}>
                                <Text style={styles.customer}>Delivery Method:</Text>
                                <Text style={styles.name}>{props.Method}</Text>
                            </View>
                            <Pressable
                                onPress={() => {
                                    SetAlert(false)
                                }}
                                android_ripple={{ color: Color.primary }}
                            >
                                <View style={styles.reset}>
                                    <Text style={styles.text}>Close</Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                </Modal>

            </Card>
        </View>

    )
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    button: {
        borderRadius: 10,
        height: 40,
        width: 100,
        paddingHorizontal: 8,
        paddingVertical: 10,
        marginLeft: 50,

        // borderBottomLeftRadius:25,
        // borderTopLeftRadius:25,
    },
    orderItem: {
        marginVertical: 10,
        paddingVertical: 10,
        padding: 10,
        height: 80,
        alignItems: 'center',
        width:'100%',
    },
    summary: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 8
    },
    Amount: {
        fontFamily: 'Bold',
        fontSize: 16,
        color: "#888"
    },
    date: {
        fontFamily: 'Regular',
        fontSize: 16,
        color: Color.primary
    },
    innerText: {
        color: Color.primary
    },
    detailItem: {
        width: '100%'
    },
    Carditem: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginVertical: 11,
        borderRadius: 1,
        borderBottomWidth: 1,
        borderColor: '#888',
        margin: 15
    },
    itemData: {
        flexDirection: 'row',
        marginBottom: 3
    },
    qauntity: {
        fontFamily: 'Bold',
        fontSize: 15,
        color: Color.primary
    },
    Amount: {
        fontFamily: 'Regular',
        fontSize: 15,
        color: '#888',

    },
    title: {
        fontFamily: 'Bold',
        fontSize: 17,
        color: 'black',
        marginLeft: 10,
    },
    warning_modal: {
        width: 290,
        height: 290,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: Color.primary,
        borderRadius: 24,
        marginTop: 90
    },
    warning_title: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: Color.primary,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    center_View: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099'
    },
    CustomerDetail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#888',
        marginVertical: 15
    },
    customer: {
        color: 'black',
        fontSize: 16,
        marginLeft: 5,
        fontFamily: 'Bold'
    },
    name: {
        color: 'black',
        fontSize: 15,
        marginRight: 6,
        fontFamily: 'Regular'
    },
    text: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        color: 'black'
    },
    reset: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: Color.primary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginTop: -16

    },
    Centered: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    time: {
        color: 'black',
        marginLeft: 230,
        fontSize: 14,
        color: "#888",
    },
    btnContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'space-between',
        marginVertical: 6
    },



});

export default AcceptedOrderDetail;