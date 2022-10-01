import React, { useEffect, useState, useCallback } from 'react';
import { Text, FlatList, StyleSheet, View, ActivityIndicator, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AcceptedOrder from '../../Components/AcceptedOrder'
import * as OrderAction from '../../Store/Action/AccecptedOrder'
import Color from '../../Constants/Colors';
import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../Components/HeaderButton';

const OrderScreen = props => {
    const dispatch = useDispatch();
    const [Isloading, SetIsloading] = useState(false);
    const [Isrefreshing, SetIsrefreshing] = useState(false)
    const [Error, SetError] = useState()
    const Orders = useSelector(state => state.AccecptedOrder.AcceptedOrder)

    const Orderproduct = useCallback(async () => {
        SetError(null)
        SetIsrefreshing(true)
        try {
            SetIsloading(true)
            await dispatch(OrderAction.fetchAcceptedOrder());
            console.log(Orders)
            SetIsloading(false)
        } catch (err) {
            SetError(err.message)
        }
        SetIsrefreshing(false)
    }, [dispatch])

    useEffect(() => {
          Orderproduct();
    }, [dispatch,Orderproduct])

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', Orderproduct)

        return () => {
            willFocusSub.remove();
        }
    }, [Orderproduct]);
    useEffect(() => {
        SetIsloading(true);
        Orderproduct().then(() => {
            SetIsloading(false);
        })
    }, [dispatch, Orderproduct]);


    if (Error) {
        return (
            <View style={styles.Centered}>
                <Text style={styles.text}>{Error}</Text>
                <View style={styles.btnContainer}>
                    <Button
                        color={Color.primary}
                        title="Try Again"
                        onPress={Orderproduct}
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
    if(!Isloading && Orders.length===0){
        return(
        <View style={styles.Centered}>
            <Text style={styles.text2}>No Orders Found. Maybe do some orders</Text>
        </View>
        )
    }
    return (
        <View style={styles.screen}>
        <View style={styles.TransationContainer}>
        <Text style={styles.TransationText}>Recent Order</Text>
        <Text style={styles.ViewText}>View All</Text>
     </View>
        <FlatList
        onRefresh={Orderproduct}
        refreshing={Isrefreshing}
            keyExtractor={item => item.id}
            data={Orders}
            renderItem={itemData => {
                return (
                    <AcceptedOrder
                        Amount={itemData.item.Amount}
                        date={itemData.item.readableDate}
                        name= {itemData.item.Name}
                        number={itemData.item.Number}
                        City = {itemData.item.City}
                        PostalAddress={itemData.item.PostalAddress}
                        items={itemData.item.item}
                        Method={itemData.item.Method}
                        Remarks={itemData.item.Remarks}
                    />
                )
            }}
        />
        </View> 
    )
   
}

export const ScreenOption = (Navdata) => {
    return {
        headerTitle: 'Order items',
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
    screen:{
        flex:1
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
    TransationContainer:{
        marginTop:20,
        flexDirection:'row',
        justifyContent:'space-between',
        marginVertical:2
    },
    TransationText:{
       color:'#888',
       fontSize:16,
       marginLeft:25,
       fontFamily:'Bold'
    },
    ViewText:{
        color:'#888',
        fontSize:14, 
        marginRight:22 
    }
})
export default OrderScreen;
