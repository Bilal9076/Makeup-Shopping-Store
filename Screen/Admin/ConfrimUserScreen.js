import React, { useEffect, useState, useCallback,useReducer } from 'react';
import { Text, FlatList, StyleSheet, View, ActivityIndicator, Button,Modal,Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import SignUpUser from '../../Components/SignUpuser'
import * as SignUpUserAction from '../../Store/Action/AuthAction'
import * as CustomerAuthActions from '../../Store/Action/CustomerAuthAction'
import Color from '../../Constants/Colors';
import Input from '../../Components/Input';
import Card from '../../Components/Card'
import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../Components/HeaderButton';


const SignUpUserScreen = props => {
    const dispatch = useDispatch();
    const [Isloading, SetIsloading] = useState(false);
    const [Isrefreshing, SetIsrefreshing] = useState(false)
    const [Alert, setAlert] = useState(false);
    const [alert, setalert] = useState(false);
    const [Error, SetError] = useState()
    const [pid, setpid] = useState('')
    const [itemSelected, setItemSelected] = useState('');
    const signUpUser = useSelector(state => state.UserSignUp.SignUpUser)




    const SubmitFunction = useCallback(async (Email,Password) => {
        SetIsloading(true)
        SetError(null)
        try {
            await dispatch(CustomerAuthActions.signup(
                Email,
                Password
            ))
        } catch (err) {
            SetError(err.message)
        }
        SetIsloading(false)
        setAlert(false)
        FetchSignUpUser();
    }, [dispatch]);

    const DelAcceptedRequest = async (id) => {
        await dispatch(SignUpUserAction.deleteUser(id))
    }

    const FetchSignUpUser = useCallback(async () => {
        SetError(null)
        try {
            SetIsloading(true)
            SetIsrefreshing(true)
            await dispatch(SignUpUserAction.fetchSignUpUser());
            // console.log(itemSelected.Email)
            SetIsloading(false)
        } catch (err) {
            SetError(err.message)
        }
        SetIsrefreshing(false)
    }, [dispatch])

    useEffect(() => {
        FetchSignUpUser();
    }, [dispatch,FetchSignUpUser])

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', FetchSignUpUser)

        return () => {
            willFocusSub.remove();
        }
    }, [FetchSignUpUser]);
    useEffect(() => {
        SetIsloading(true);
        FetchSignUpUser().then(() => {
            SetIsloading(false);
        })
    }, [dispatch, FetchSignUpUser]);



    if (Error) {
        return (
            <View style={styles.Centered}>
                <Text style={styles.text}>{Error}</Text>
                <View style={styles.btnContainer}>
                    <Button
                        color={Color.primary}
                        title="Try Again"
                        onPress={FetchSignUpUser}
                    />
                </View>
            </View>
        )
    }

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
    if(!Isloading && signUpUser.length===0){
        return(
        <View style={styles.Centered}>
            <Text style={styles.text2}>No User Found</Text>
        </View>
        )
    }
    return (
        <View style={styles.container}>
         <Text style={styles.containertext}>Registration Request</Text>
           {/* Confrim Box */}
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
                            <Text style={styles.text1}>Are you sure</Text>
                        </View>
                        <View style={styles.warning_Message}>
                            <Text style={styles.text}>'Do you really want to delete this item'</Text>
                        </View>
                        <View style={styles.cnfrimBox}>
                            <Pressable
                                style={styles.button}

                                onPress={async () => {
                                    SetIsloading(true)
                                    await dispatch(SignUpUserAction.deleteUser(pid))
                                    SetIsloading(false)
                                    setalert(false)
                                    FetchSignUpUser()
                                }}
                                android_ripple={{ color: Color.primary }}
                            >
                                <Text style={styles.text1}>Yes</Text>
                            </Pressable>

                            <Pressable
                                style={styles.button}
                                onPress={() => {
                                    setalert(false)
                                }}
                                android_ripple={{ color: Color.primary }}
                            >
                                <Text style={styles.text1}>No</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
             {/* For any Error */}
             <Modal visible={Alert}
                animationType="fade"
                transparent={true}
                onRequestClose={() => {
                    setAlert(false)
                }}
            >
                <View style={styles.center_View}>
                    <View style={styles.warning_modal_Error}>
                        <View style={styles.warning_title}>
                            {Error ? <Text style={styles.text1}>'An error occured'</Text> : <Text style={styles.text1}>'Warning'</Text>}
                        </View>
                        <View style={styles.warning_Message}>
                            {Error ? <Text style={styles.text}>'Something went wrong'</Text> : <Text style={styles.text}>'Please Check your form Enteries'</Text>}
                        </View>
                        <Pressable
                            onPress={() => {
                                setAlert(false)
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
        <FlatList
            keyExtractor={item => item.id}
            data={signUpUser}
            onRefresh={FetchSignUpUser}
            refreshing={Isrefreshing}
            renderItem={itemData => {
                return (
                    
                    <SignUpUser
                        Email={itemData.item.Email}
                        Password={itemData.item.Password}
                        onDelete={() => {
                            setalert(true)
                            setpid(itemData.item.id)
                        }}
                        onAccept={() => {
                            setItemSelected(itemData.item)
                            SubmitFunction(itemData.item.Email,itemData.item.Password)
                            DelAcceptedRequest(itemData.item.id)
                        }}
                    />
                    
                )
            }}
        />
        </View>
    )
}
export const ScreenOption = (Navdata) => {
    return {
        headerTitle: 'User Approvel',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Menu" iconName="ios-menu" onPress={() => {
            Navdata.navigation.toggleDrawer();
        }} />
    </HeaderButtons>
    };
};

const styles = StyleSheet.create({
    Centered: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containertext:{
        fontSize:22,
        fontFamily:'Bold',
        color:Color.primary,
        marginVertical:10,
        textAlign:'center',
        marginTop:15
      },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'red',
        fontSize: 20,
        fontFamily: 'Bold'
    },
    text2:{
        color: 'red',
        fontSize: 16,
        fontFamily: 'Bold'
    },
    btnContainer: {
        width: 120,
        marginVertical: 10
    },
    warning_modal: {
        width: 290,
        height: 290,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: Color.primary,
        borderRadius: 30,
    },
    warning_modal_Error: {
        width: 250,
        height: 250,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: Color.primary,
        borderRadius: 30,
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
    reset: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: Color.primary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
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
    centerView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099'
    },
    button: {
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 19,
        elevation: 5,
        width: 100,
        margin: 5,
        backgroundColor: Color.primary
    },
    cnfrimBox: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: -20
    },
    Centered: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text2: {
        color: 'red',
        fontSize: 16,
        fontFamily: 'Bold',
        textAlign: 'center'
    },
    AuthContainer: {
        width: 280,
        height: 270,
        padding: 40,
        marginTop: 100,
        backgroundColor: 'white'
    },
    useInfo: {
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: Color.primary,
        height: 40,
        justifyContent: 'center',
        borderRadius: 5,
    },
    useInfoText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Regular'
    },
    btnContainerModal: {
        flex: 1,
        marginTop: 23,
        width: 100,
        marginHorizontal: 60,
        marginLeft: 50
    },
})
export default SignUpUserScreen;