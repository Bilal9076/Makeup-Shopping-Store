import React, { version } from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, TouchableNativeFeedback, Platform, Touchable } from 'react-native';
import Color from '../Constants/Colors';

const Userproduct = props => {
    let TouchableTemp = TouchableOpacity;
    if (Platform.OS === 'android' && version >= 21) {
        TouchableTemp = TouchableNativeFeedback;
    }
    return (
        <View style={styles.container}>
            <TouchableTemp onPress={props.OnViewDetail}>
                <View style={styles.imgContainer}>
                    <Image
                        source={{ uri: props.image }}
                        style={styles.img}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                </View>
                <View style={styles.BtnContainer}>
                    <View style={styles.btn}>
                        <Button color={Color.primary} title="Edit" onPress={props.Edit}/>
                    </View>
                    <View style={styles.btn}>
                        <Button color={Color.primary} title="Delete" onPress={props.Delete}/>
                    </View>
                </View>
            </TouchableTemp>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        shadowOpacity: 0.26,
        shadowColor: 'black',
        elevation: 6,
        height: 300,
        backgroundColor: 'white',
        margin: 15,
        borderRadius: 10,
        overflow: 'hidden'
    },
    imgContainer: {
        width: '100%',
        height: '60%',
    },
    img: {
        height: '100%',
        width: '100%'
    },
    textContainer: {
        alignItems: 'center',
        height: '13%',
        marginVertical: 5
    },
    price: {
        fontSize: 14,
        color: '#888',
        fontFamily:'Regular'
    },
    title: {
        fontSize: 16,
        color: 'red',
        fontFamily:'Bold'
    },
    BtnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        height: '27%',
        marginVertical: 5,
        marginHorizontal: 5
    },
    btn: {
        width: '35%',
    }
})

export default Userproduct;