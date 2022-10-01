import React, { useReducer, useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet,  Platform,  Pressable, Modal,ActivityIndicator,Button,} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import SupplyInput from '../../Components/SupplyInput';
import Color from '../../Constants/Colors';
import * as ProductAction from '../../Store/Action/Product'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../Components/HeaderButton'
import * as ImagePicker from 'expo-image-picker'

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

const EditProduct = props => {
    const [alert, setalert] = useState(false);
    const [ImagePicked, SetImagePicked] = useState('');
    const [Isloading,Setisloading] = useState(false);
    const [Error,SetError]= useState();
    const dispatch = useDispatch();
    const productId = props.route.params? props.route.params.productId:null;
    const ProductPrice= props.route.params? props.route.params.ProductPrice:null;
    const Editproduct = useSelector(state =>
        state.Product.Product.find(prof => prof.id === productId));



    const [stateFrom, DispatchstateFrom] = useReducer(fromReducer, {
        inputValues: {
            title: Editproduct ? Editproduct.title : '',
            Category:Editproduct ? Editproduct.Category : '',
            // image: Editproduct ? Editproduct.image : '',
            price: Editproduct ? Editproduct.price : '',
            Description: Editproduct ? Editproduct.Description : '',
        },
        inputValidities: {
            title: Editproduct ? true : false,
            Category: Editproduct ? true : false,
            // image: Editproduct ? true : false,
            price: Editproduct ? true : false,
            Description: Editproduct ? true : false,
        },
        FormValiditity: {
            fromIsValid: Editproduct ? true : false,
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

    const SubmitFunction = useCallback( async () => {
        if (!stateFrom.fromIsValid) {
            setalert(true)
            return;
        }
        Setisloading(true)
        SetError(null)
        try{
            const Image = await ImagePicker.launchImageLibraryAsync({
                aspect: [16, 9],
                quality: 0.5,
            });
            SetImagePicked(Image.uri)
                                
            if(Editproduct) {
                await dispatch(ProductAction.Editproduct(
                    productId, 
                    stateFrom.inputValues.title,
                    stateFrom.inputValues.Category,
                    Image.uri,
                    // stateFrom.inputValues.image,
                    +stateFrom.inputValues.price,
                    stateFrom.inputValues.Description,
                   )
                 );
               } else {
                await  dispatch(ProductAction.CreateProduct(
                    stateFrom.inputValues.title,
                    stateFrom.inputValues.Category,
                    Image.uri,
                    // stateFrom.inputValues.image,
                    +stateFrom.inputValues.price,
                    stateFrom.inputValues.Description,
                   ))
               }
               props.navigation.goBack();
               await dispatch(ProductAction.fetchData());
        } catch(err){
          SetError(err.message)
        }
        Setisloading(false)
        
    }, [stateFrom, productId, dispatch]);

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={HeaderButton}>
                        <Item
                            title='card'
                            iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                            onPress={SubmitFunction}
                        />
                    </HeaderButtons>
                )
            }
        })
    }, [SubmitFunction])

    useEffect(()=>{
        if(Error){
           setalert(true)
        } 
    },[Error])

    if(Isloading){
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
        <View
        style={styles.container}
        >
        
            <View style={styles.textContainer1}>
                    <Text style={styles.text2}>Edit Product</Text>
                    </View>  
                    <ScrollView>  
                <SupplyInput
                    id='title'
                    label="Title"
                    warningText='Please Enter title'
                    keyboardType='email-address'
                    autoCapitalize='sentences'
                    returnKeyType='next'
                    placeholder='Please Enter Your title'
                    initialValue={Editproduct ? Editproduct.title : ''}
                    initiallyValid={!!Editproduct}
                    onInputChange={Changetext}
                    required
                    title
                />
                   <SupplyInput
                    id='Category'
                    label="Category"
                    warningText='Please Enter Category'
                    keyboardType='default'
                    autoCapitalize='sentences'
                    returnKeyType='next'
                    placeholder='Please Enter Category'
                    initialValue={Editproduct ? Editproduct.category : ''}
                    initiallyValid={!!Editproduct}
                    onInputChange={Changetext}
                    required
                    title
                />
                 {Editproduct?null:
                <SupplyInput
                    id='price'
                    label="Price"
                    warningText='Please Enter price!'
                    
                    keyboardType='decimal-pad'
                    autoCapitalize='sentences'
                    placeholder='Please Enter Price'
                    initialValue={Editproduct ?Editproduct.price : ''}
                    initiallyValid={!!Editproduct}
                    onInputChange={Changetext}
                    required
                />
                }
                <SupplyInput
                    id='Description'
                    label="Description"
                    warningText='Please Enter Description'
                    keyboardType='default'
                    autoCapitalize='sentences'
                    returnKeyType='next'
                    placeholder='Please Enter Description'
                    initialValue={Editproduct ? Editproduct.Description : ''}
                    initiallyValid={!!Editproduct}
                    onInputChange={Changetext}
                    required
                />

              
            </ScrollView> 
            {/* <Button
                    title='Gallery'
                    color={Color.primary}
                    onPress={TakeImageHandler} 
                /> */}
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
                        {Error ?  <Text style={styles.text3}>'An error occured'</Text>:<Text style={styles.text3}>'Warning'</Text>} 
                        </View>
                        <View style={styles.warning_Message}>
                            {Error ?  <Text style={styles.text}>'Something went wrong'</Text>:<Text style={styles.text}>'Please Check your form Enteries'</Text>}  
                        </View>
                        <Pressable
                            onPress={() => {
                                setalert(false)
                            }}
                            android_ripple={{ color: Color.primary }}
                        >
                            <View style={styles.reset}>
                                <Text style={styles.text3}>Ok</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export const ScreenOptions = navData => {
    const routeParams = navData.route.params ?navData.route.params:{}
    return {
        headerTitle: routeParams.productId ? 'Edit Profile' : 'Create Profile',
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Color.primary : 'white'
        },
        headerTitleStyle: {
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Color.primary,

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    image: {
        height: 200,
        width: 200
    },
    textContainer:{
      marginTop:10,
      alignItems:'center',
      justifyContent:'center',
    },
    text1:{ 
        color:'white',
       fontSize:20,
       fontFamily:'Bold',
       marginVertical:5
    },
    textContainer1:{
        alignItems:'center',
        justifyContent:'center',
        marginTop:20,
        marginVertical:20
        
      },
      text2:{ 
          color:Color.primary,
         fontSize:22,
         fontFamily:'Bold',
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
    text3: {
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
    Centered:{
        flex:1,
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center'
    },

})
export default EditProduct;