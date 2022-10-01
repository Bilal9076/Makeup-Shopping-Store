import React, { useEffect, useState, useCallback } from 'react';
import { Text, FlatList, StyleSheet, View, ActivityIndicator, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import SoldItem from '../../Components/Solditem'
import * as OrderAction from '../../Store/Action/Orders'
import Color from '../../Constants/Colors';
import * as SoldAction from '../../Store/Action/SoldProduct'
import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../Components/HeaderButton';

const SoldproductScreen = props => {
    const dispatch = useDispatch();
    const [Isloading, SetIsloading] = useState(false);
    const [Isrefreshing, SetIsrefreshing] = useState(false)
    const [Error, SetError] = useState()
    const Soldproduct = useSelector(state => state.Sold.Product)

    const LoadedSoldProduct = useCallback(async () => {
        SetError(null)
        SetIsrefreshing(true)
        try {
            SetIsloading(true)
            await dispatch(SoldAction.fetchData());
            // console.log(Soldproduct)
            SetIsloading(false)
        } catch (err) {
            SetError(err.message)
        }
        SetIsrefreshing(false)
    }, [dispatch])

    useEffect(() => {
        LoadedSoldProduct();
    }, [dispatch, LoadedSoldProduct])

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus',  LoadedSoldProduct)

        return () => {
            willFocusSub.remove();
        }
    }, [ LoadedSoldProduct]);
    useEffect(() => {
        SetIsloading(true);
        LoadedSoldProduct().then(() => {
            SetIsloading(false);
        })
    }, [dispatch,  LoadedSoldProduct]);


    if (Error) {
        return (
            <View style={styles.Centered}>
                <Text style={styles.text}>{Error}</Text>
                <View style={styles.btnContainer}>
                    <Button
                        color={Color.primary}
                        title="Try Again"
                        onPress={LoadedSoldProduct}
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
    if(!Isloading && Soldproduct.length===0){
        return(
        <View style={styles.Centered}>
            <Text style={styles.text2}>No Orders Found. Maybe do some orders</Text>
        </View>
        )
    }
    return (
        <FlatList
            keyExtractor={item => item.id}
            data={Soldproduct}
            onRefresh={LoadedSoldProduct}
        refreshing={Isrefreshing}
            renderItem={itemData => {
                return (
                    <SoldItem
                    Amount={itemData.item.Amount}
                    date={itemData.item.readableDate}
                    name= {itemData.item.name}
                    number={itemData.item.number}
                    City = {itemData.item.City}
                    PostalAddress={itemData.item.PostalAddress}
                    items={itemData.item.item}
                    Method={itemData.item.Method}
                    />
                )
            }}
        />
    )
}

export const ScreenOption = (Navdata) => {
    return {
        headerTitle: 'Sold items',
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
})
export default SoldproductScreen;
