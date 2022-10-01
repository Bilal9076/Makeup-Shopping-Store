import React, { useEffect, useCallback, useState, useReducer } from 'react'
import { Alert, FlatList,Platform,StyleSheet, View ,Pressable,Modal,Text,ActivityIndicator} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Userproduct from '../../Components/Userproduct';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../Components/HeaderButton'
import * as ProductAction from '../../Store/Action/Product'
import Color from '../../Constants/Colors';

const UserProduct = props => {
    const [alert, setalert] = useState(false);
    const [SelectedImage,SetSelectedImage]=useState();
    const [isloading, SetIsloading] = useState(false);
    const [Isloading,Setisloading] = useState(false)
    const [Isrefreshing, SetIsrefreshing] = useState(false)
    const [Error, SetError] = useState()
    const [pid,setpid]= useState('')
 const Dispatch = useDispatch();
 const userProduct = useSelector(state => state.Product.Product)
    const EditProductHandler = (id,price) => {
        props.navigation.navigate('Edit Product', {
             productId: id,
             ProductPrice:price
             });
    };

    
    const loadProduct = useCallback(async () => {

        SetError(null);
        SetIsrefreshing(true)
        Setisloading(true)
        try {
            await Dispatch(ProductAction.fetchData());
            // console.log(userProduct)
        } catch (err) {
            SetError(err.message);
        }
        SetIsrefreshing(false)
        Setisloading(false)
    }, [Dispatch, Setisloading, SetError]);


    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadProduct)

        return () => {
            willFocusSub.remove();
        }
    }, [loadProduct]);
    useEffect(() => {
        Setisloading(true);
        loadProduct().then(() => {
            Setisloading(false);
        })
    }, [Dispatch, loadProduct]);


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
if(userProduct.length===0){
    return(
    <View style={styles.Centered}>
        <Text style={styles.text2}>No Products found,maybe start creating some?</Text>
    </View>
    )
}
   
    return (
        <View>
        <FlatList
            keyExtractor={item => item.id}
            onRefresh={loadProduct}
            refreshing={Isrefreshing}
            data={userProduct}
            renderItem={itemData => {
                return (
                    <Userproduct
                        image={itemData.item.imageUrl}
                        price={itemData.item.price}
                        title={itemData.item.title}
                        OnViewDetail={() => { 
                            EditProductHandler(itemData.item.id);
                           
                         }}
                        Delete={() => {
                            setalert(true)
                            setpid(itemData.item.id) 
                        }}
                        Edit={() => { 
                            EditProductHandler(itemData.item.id,itemData.item.price);
                        }}
                    />
                    
                )
            }}
           />
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
               
             onPress={ async () => {
                Setisloading(true)
                 await  Dispatch(ProductAction.DeleteProduct(pid)) 
               Setisloading(false)
                 setalert(false)
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
</View>
    )
};

const styles = StyleSheet.create({
    warning_modal: {
        width: 270,
        height: 270,
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
        color:'black'
    },
    text1: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
    button:{
    borderRadius:6,
    paddingVertical:8,
    paddingHorizontal:19,
    elevation:5,
    width:100,
    margin:5,
    backgroundColor:Color.primary
    },
    cnfrimBox:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:-30
    },
    Centered: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text2:{
        color: 'red',
        fontSize: 16,
        fontFamily: 'Bold',
       textAlign:'center'
    }
})
export const ScreenOptions = NavData => {
    return {
        headerTitle: 'Available Products',
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Color.primary : 'white'
        },
        headerTitleStyle: {
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Color.primary,
        
        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title='Add'
                        iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                        onPress={() => {
                            NavData.navigation.navigate('Edit Product')
                        }}
                    />
                </HeaderButtons>
            )
        },
        headerLeft: () => {
            return (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title='Menu'
                        iconName={Platform.OS === 'android' ? 'ios-menu' : 'ios-menu'}
                        onPress={() => {
                            NavData.navigation.toggleDrawer();
                        }}
                    />
                </HeaderButtons>
            )
        }
    }
}
export default UserProduct;