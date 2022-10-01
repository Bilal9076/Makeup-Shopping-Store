import React, { useState } from 'react';
import { View, Text, StyleSheet, Button,FlatList, ScrollView } from 'react-native';
import Color from '../Constants/Colors';
import OrderDetail from './OrdeDetail';
import {useSelector,useDispatch} from 'react-redux'
import Card from '../Components/Card'

const SoldItem = props => {
    const [ShowDetail, SetShowDetail] = useState(false)

    
    return (
        <Card style={styles.orderItem}>
        <View style={styles.summary}>
            <Text style={styles.Amount}><Text style={styles.innerText}>Price:</Text>Rs.{props.Amount}</Text>
            <Text style={styles.date}>{props.date}</Text>
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
               <OrderDetail
               key = {item.ProductId}
               qauntity = {item.qauntity} 
               title = {item.productTitle}
               Amount = {item.productPrice}
               imageUrl = {item.productImageUrl}
               name ={props.name}
               Method={props.Method}
               number={props.number}
               City={props.City}
               PostalAddress={props.PostalAddress}
                />
           ))}

        </View>
        )}
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
        marginBottom: 15
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
    detailItem:{
        width:'100%'
    }
    
});
export default SoldItem;