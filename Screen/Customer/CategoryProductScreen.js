import React, { useEffect, useCallback, useState, useReducer } from 'react'
import { Alert, FlatList,Platform,StyleSheet, View ,Pressable,Modal,Text,ActivityIndicator,Button} from 'react-native';
import { CATEGORIES } from '../../data/dummy-data';
import Meallist from '../../Components/Meallist';
import Colors from '../../Constants/Colors';
import * as ProductAction from '../../Store/Action/Product'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../Components/HeaderButton'
import { useSelector, useDispatch } from 'react-redux';
const CategoryMealScreen = props => {
    const [isloading, SetIsloading] = useState(false);
    const [Isloading,Setisloading] = useState(false)
    const [Isrefreshing, SetIsrefreshing] = useState(false)
    const [Error, SetError] = useState()
    const Dispatch = useDispatch();
    const loadProduct = useCallback(async () => {

        SetError(null);
        SetIsrefreshing(true)
        SetIsloading(true)
        try {
            await Dispatch(ProductAction.fetchData());
            // console.log(userProduct)
        } catch (err) {
            SetError(err.message);
        }
        SetIsrefreshing(false)
        SetIsloading(false)
    }, [Dispatch, SetIsloading, SetError]);

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadProduct)

        return () => {
            willFocusSub.remove();
        }
    }, [loadProduct]);
    useEffect(() => {
        SetIsloading(true);
        loadProduct().then(() => {
            SetIsloading(false);
        })
    }, [Dispatch, loadProduct]);

    const userProduct = useSelector(state => state.Product.Product)
    const categoryName = props.route.params.categoryName
    // const { catId } = route.params;
    const DisplayedMeal = userProduct.filter(Product =>
        Product.category === categoryName
    );

    const newData = userProduct.filter(
        function (item) {
            const itemData = item.Category === categoryName ;

        })
const Cat =  userProduct.map(Product=>Product.Category)
    

    return (
          <View style={styles.image}>
            <View style={styles.containerText}>
                <Text style={styles.text2}>Products of Shopping Store</Text>
            </View>
        <Meallist data={DisplayedMeal} navigation={props.navigation}/>
       
        </View>
    );
};
export const ScreenOptions = navigationData => {
    // const catId = navigationData.navigation.getParam('categoryId');
    const categoryName = navigationData.route.params.categoryName
    return {
        headerTitle: categoryName,
        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title='card'
                        iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                        onPress={()=>{
                            navigationData.navigation.navigate('CartScreen')
                        }}
                    />
                </HeaderButtons>
            )
        },
    };
};

const styles = StyleSheet.create({
    image:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    containerText: {
        alignItems: 'center',
        marginVertical: 14,
    },
    text2: {
        alignItems: 'center',
        fontSize: 20,
        fontFamily: 'Bold',
        color: Colors.primary
    },
    text:{
        color:Colors.primary,
        marginBottom:300,
        fontFamily:'Regular',
        fontSize:17,
    }
})

export default CategoryMealScreen;

 // pop is alternative of goBack does the same work as goBack
                // the difference is that it only work in stakeNavigator but 
                // goBack is avaiable in all Navigator
                // props.navigation.pop();

         // // goBack is used in such case when we do some configuration and
                // // when we press save button we automatically leave the page    
                // title="Go back" onPress={() => {
                //     props.navigation.goBack();
                // }}  