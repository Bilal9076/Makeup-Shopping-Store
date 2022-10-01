import React, { useReducer, useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Modal, Pressable, ScrollView, Button, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import Color from '../../Constants/Colors';
import CardItem from '../../Components/CardItem';
import * as CardAction from '../../Store/Action/Cart';
import * as OrderAction from '../../Store/Action/Orders'
import * as SoldAction from '../../Store/Action/SoldProduct'
import Card from '../../Components/Card'
import Input from '../../Components/Input'
import { Picker } from '@react-native-picker/picker';
import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../Components/HeaderButton';

//  useReducer
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const fromReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const UpdatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        }
        const UpdatedValidities = {
            ...state.inputValidities,
            [action.input]: action.IsValid
        }

        let fromIsValid = true;
        for (const key in UpdatedValidities) {
            fromIsValid = fromIsValid && UpdatedValidities[key]
        }
        return {
            inputValues: UpdatedValues,
            inputValidities: UpdatedValidities,
            fromIsValid: fromIsValid
        }
    };
    return state;
}

const CartScreen = props => {
    const dispatch = useDispatch();
    const [Isalert, setIsalert] = useState(false);
    const [Alert, SetAlert] = useState(false)
    const [Isrefreshing, SetIsrefreshing] = useState(false)
    const [alert, setalert] = useState(false);
    const [Error, SetError] = useState();
    const [Isloading, Setisloading] = useState(false)
    const [SelectedMethod, setSelectedMethod] = useState('Cash on Delivery');
    const TotalAmount = useSelector(state => state.Cart.TotalAmount);
    const CartItem = useSelector(state => {
        const TransformedCartItem = [];
        for (const key in state.Cart.items) {
            TransformedCartItem.push({
                ProductId: key,
                productPrice: state.Cart.items[key].productPrice,
                productTitle: state.Cart.items[key].productTitle,
                qauntity: state.Cart.items[key].qauntity,
                productImageUrl: state.Cart.items[key].productImageUrl,
                sum: state.Cart.items[key].sum,
                // productPushToken:state.Cart.items[key].PushToken
            });

        }
        return TransformedCartItem.sort((a, b) => a.ProductId > b.ProductId ? 1 : -1);
    });

    const [stateFrom, DispatchstateFrom] = useReducer(fromReducer, {
        inputValues: {
            name: '',
            number: '',
            City: '',
            PostalAddress: '',
        },
        inputValidities: {
            name: false,
            number: false,
            City: '',
            PostalAddress: '',
        },
        FormValiditity: {
            fromIsValid: false,
        }
    })
    const Changetext = useCallback((inputIdentifier, inputValue, inputValiditiy) => {
        DispatchstateFrom({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            IsValid: inputValiditiy,
            input: inputIdentifier,
        });

    }, [DispatchstateFrom]);

    // Submit function of  sellform 


    const SubmitFunction = useCallback(async () => {
        if (!stateFrom.fromIsValid) {
            setalert(true)
            // setIsalert(false)
            return;
        }
        Setisloading(true)
        SetError(null)
        try {
            await dispatch(OrderAction.OrdersProduct(
                stateFrom.inputValues.name,
                stateFrom.inputValues.number,
                stateFrom.inputValues.City,
                stateFrom.inputValues.PostalAddress,
                CartItem,
                TotalAmount,
                SelectedMethod
            ))

            await dispatch(SoldAction.CreateSoldProduct(
                stateFrom.inputValues.name,
                stateFrom.inputValues.number,
                stateFrom.inputValues.City,
                stateFrom.inputValues.PostalAddress,
                CartItem,
                TotalAmount,
                SelectedMethod
            ))
        } catch (err) {
            SetError(err.message)
            console.log(err.message)
        }
        Setisloading(false)
        setIsalert(false)
    }, [stateFrom, dispatch]);
    useEffect(() => {
        if (Error) {
            setalert(true)
        }
    }, [Error])

    if (Isloading) {
        return (
            <View style={styles.Centered}>
                <ActivityIndicator
                    size='large'
                    color={Color.primary}
                />
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            {/* Modal for sellForm */}
            <Modal visible={Isalert}
                animationType="fade"
                transparent={true}
                onRequestClose={() => {
                    setIsalert(false)
                }}
            >
                <View style={styles.centerView}>
                    <ScrollView>
                        <Card style={styles.AuthContainer}>
                            <ScrollView>
                                <View style={styles.useInfo}>
                                    <Text style={styles.useInfoText}>Customer Information</Text>
                                </View>

                                <Input
                                    id='name'
                                    label="Customer Name"
                                    warningText='please enter Name!'
                                    keyboardType='default'
                                    autoCapitalize='sentences'
                                    returnKeyType='next'
                                    placeholder='Please Enter Name'
                                    required
                                    onInputChange={Changetext}
                                    maxLength={20}
                                />
                                <Input
                                    id='number'
                                    label="Phone Number"
                                    warningText='please enter Valid Number!'
                                    keyboardType='decimal-pad'
                                    autoCapitalize='sentences'
                                    returnKeyType='next'
                                    placeholder='Please Enter Number'
                                    required
                                    onInputChange={Changetext}
                                    minLength={11}
                                />
                                <Input
                                    id='City'
                                    label="City Name"
                                    warningText='Please Enter Your City Name!'
                                    keyboardType='default'
                                    autoCapitalize='sentences'
                                    returnKeyType='next'
                                    placeholder='Please Enter Your City Name'
                                    required
                                    onInputChange={Changetext}
                                    maxLength={20}
                                />
                                <Input
                                    id='PostalAddress'
                                    label="Postal Address"
                                    warningText='Please Enter Your Postal Address!'
                                    keyboardType='default'
                                    autoCapitalize='sentences'
                                    returnKeyType='next'
                                    placeholder='Please Enter Your Postal Address'
                                    required
                                    onInputChange={Changetext}
                                    maxLength={20}
                                />
                                {/* <Text style={styles.method}>Please Select Delivery Method</Text> */}
                                <Picker
                                    selectedValue={SelectedMethod}
                                    onValueChange={(itemValue) =>
                                        setSelectedMethod(itemValue)
                                    }>
                                    {/* <Picker.Item label="Select deliver method" value="Select deliver method" /> */}
                                    <Picker.Item label="Cash on Delivery" value="Cash on Delivery" />
                                    {/* <Picker.Item label="JazzCash" value="JazzCash" />
                                    <Picker.Item label="Ban" value="JazzCash" /> */}
                                </Picker>

                                <View style={styles.btnContainer}>
                                    <Button
                                        title='Submit'
                                        color={Color.primary}
                                        onPress={SubmitFunction}
                                    />
                                </View>
                            </ScrollView>
                        </Card>
                    </ScrollView>
                </View>
            </Modal>
            {/* Modal for error  alert */}
            <Modal visible={alert}
                animationType="fade"
                transparent={true}
                onRequestClose={() => {
                    setalert(false)
                }}
            >
                <View style={styles.center_View}>
                    <View style={styles.warning_modal}>
                        <View style={styles.warning_title}>
                            {Error ? <Text style={styles.text1}>'An error occured'</Text> : <Text style={styles.text1}>'Warning'</Text>}
                        </View>
                        <View style={styles.warning_Message}>
                            {Error ? <Text style={styles.text}>'Something went wrong'</Text> : <Text style={styles.text}>'Please Check your form Enteries'</Text>}
                        </View>
                        <Pressable
                            onPress={() => {
                                setalert(false)
                            }}
                            android_ripple={{ color: Color.primary }}
                        >
                            <View style={styles.reset}>
                                <Text style={styles.text1}>Ok</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}> Total Amount: <Text style={styles.amount}>Rs.{Math.round(TotalAmount.toFixed(2) * 100) / 100}</Text></Text>
                {Isloading ?
                    <ActivityIndicator
                        size='large'
                        color={Color.primary}
                    /> :
                    <Button
                        color={Color.primary}
                        title='Order Now'
                        disabled={CartItem.length === 0}
                        onPress={() => {
                            setIsalert(true)
                        }}
                    />
                }
            </Card>

            <View>

                <FlatList
                    keyExtractor={item => item.ProductId}
                    data={CartItem}
                    renderItem={itemData =>
                    (
                        <CardItem
                            qauntity={itemData.item.qauntity}
                            title={itemData.item.productTitle}
                            price={itemData.item.productPrice}
                            imageUrl={itemData.item.productImageUrl}
                            Amount={itemData.item.sum}
                            Deletable
                            remove={() => {
                                dispatch(CardAction.RemoveCardItem(itemData.item.ProductId));
                            }}
                        />


                    )}
                />
            </View>
        </View>
    )
}

export const ScreenOption = (Navdata) => {
    return {
        headerTitle: 'Cart items',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Menu" iconName="ios-menu" onPress={() => {
            Navdata.navigation.toggleDrawer();
        }} />
    </HeaderButtons>
    };
};
const styles = StyleSheet.create({
    screen: {
        margin: 10,
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 15,
        height: 60,
        padding: 10,
        justifyContent: 'space-around'

    },
    summaryText: {
        fontFamily: 'Bold',
        fontSize: 14,
        color: Color.primary
    },
    amount: {
        fontFamily: 'Regular',
        fontSize: 14,
        color: '#888'
    }, centerView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099'
    },
    AuthContainer: {
        width: 300,
        height: 560,
        padding: 40,
        marginTop: 145,
        backgroundColor: 'white'
    },
    useInfo: {
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: Color.primary,
        height: 40,
        justifyContent: 'center',
        borderRadius: 5
    },
    useInfoText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Regular'
    },
    btnContainer: {
        flex: 1,
        marginTop: 35,
        width: 100,
        marginHorizontal: 60
    },
    warning_modal: {
        width: 250,
        height: 250,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: Color.primary,
        borderRadius: 20,
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
    warning_Message: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 180,

    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        color: 'black'
    },
    text1: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
    reset: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: Color.primary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    Centered: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    TextInput: {
        width: '90%',
        marginHorizontal: 20,
        borderWidth: 1.2,
        borderRadius: 20,
        borderColor: Color.primary,
        marginTop: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: 'white'
    },
    Icon: {
        marginLeft: -70,
        marginTop: 15,
        height: 34,
        width: 39.5,
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 3
    }
});





export default CartScreen;