import React, { useState } from 'react';
import { View, Text, StyleSheet, Button,FlatList, ScrollView } from 'react-native';
import Color from '../Constants/Colors';
import OrderDetail from './OrdeDetail';
import {useSelector,useDispatch} from 'react-redux'
import Card from '../Components/Card'
import AcceptedOrderDetail from './AcceptedOrderDetail';

const OrderItem = props => {
    const [ShowDetail, SetShowDetail] = useState(false)

    const CartItem = useSelector(state => {
        const TransformedCartItem = [];
        for (const key in state.Cart.items) {
            TransformedCartItem.push({
                ProductId: key,
                productPrice: state.Cart.items[key].productPrice,
                productTitle: state.Cart.items[key].productTitle,
                qauntity: state.Cart.items[key].qauntity,
                productImageUrl:state.Cart.items[key].productImageUrl,
                sum: state.Cart.items[key].sum,
            });

        }
        return TransformedCartItem.sort((a, b) => a.ProductId > b.ProductId ? 1 : -1);
    });
    
    return (
        <Card style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.Remarks}>{props.Remarks}</Text>
            </View>
            <Button
            title={ShowDetail ? 'Hide Details' : 'Show Details'}
            color={Color.primary}
            onPress={() => {
                SetShowDetail(prevState=>!prevState)
                // console.log(props.items)
            }}
        />
        
        {ShowDetail && (
        <View style={styles.detailItem}>
           {props.items.map(item => (
               <AcceptedOrderDetail
               key = {item.ProductId}
               qauntity = {item.qauntity} 
               title = {item.productTitle}
               Amount = {item.productPrice}
               imageUrl = {item.productImageUrl}
               name ={props.name}
               Method ={props.Method}
               number={props.number}
               City={props.City}
               PostalAddress={props.PostalAddress}
               />
           ))}

        </View>
        )}
          
{/*             
            <View style={styles.detailItem}>
               {props.items.map(item => (
                   <AcceptedOrderDetail
                    key = {item.ProductId}
                    qauntity = {item.qauntity} 
                    title = {item.productTitle}
                    Amount = {item.productPrice}
                    imageUrl = {item.productImageUrl}
                    name ={props.name}
                    Method ={props.Method}
                    number={props.number}
                    City={props.City}
                    PostalAddress={props.PostalAddress}
                    />
               ))}
            </View> */}
            
        </Card>
    )
};
const styles = StyleSheet.create({
    orderItem: {
        margin: 20,
        padding: 10,
        alignItems: 'center',
    },
    summary: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        justifyContent:'center'
    },
    Amount: {
        fontFamily: 'Bold',
        fontSize: 16,
        color: "#888"
    },
    Remarks: {
        fontFamily: 'Regular',
        fontSize: 16,
        color: Color.primary,
        
    },
    innerText: {
        color: Color.primary
    }, 
    detailItem:{
        width:'100%'
    }
    
});
export default OrderItem;