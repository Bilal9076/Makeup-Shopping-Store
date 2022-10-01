import React from 'react';
import {View, StyleSheet,FlatList} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import * as CardAction from '../Store/Action/Cart';


import MealItem from './MealItem'; 
const Meallist = props =>{
    const Dispatch = useDispatch();
    const renderGirdItem = itemData => {
        return ( 
            <MealItem
                title={itemData.item.title}
                price={itemData.item.price}
                image={itemData.item.imageUrl}
                AddToCard={() => {
                    Dispatch(CardAction.AddToCard(
                        itemData.item))
                }}
                OnViewDetail={() => {
                    props.navigation.navigate('Product Detail', {
                        productId: itemData.item.id,
                        productTitle: itemData.item.title,
                    })
                }}
            />
        );
    };
    return(
        <View style={styles.screen}>
        <FlatList
            keyExtractor={(item, index) => item.id}
            data={props.data}
            renderItem={renderGirdItem}
            numColumns={2}
            // style={{ width: '95%' }}
        />
    </View>
    );
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
export default Meallist;