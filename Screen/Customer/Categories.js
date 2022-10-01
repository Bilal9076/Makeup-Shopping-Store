import React from 'react';
import { StyleSheet, FlatList,ImageBackground,View,Text} from 'react-native';

import { CATEGORIES } from '../../data/dummy-data';
import CategoryGirdTile from '../../Components/CategoryGirdTile';
import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../Components/HeaderButton';
import Colors from '../../Constants/Colors';

const CategoriesScreen = props => {
    const renderGirdItem = (itemData) => {
        return (
            
            <CategoryGirdTile
                title={itemData.item.title}
                image ={itemData.item.image}
                onselect={() => {
                    props.navigation.navigate('Category Product',{
                            categoryName: itemData.item.title,
                            
                        });
                }}
                color={itemData.item.color}
            />
        );
    }
    return (
        <View style={styles.image}>
             <View style={styles.containerText}>
                <Text style={styles.text2}>Categories of Shopping Store</Text>
            </View>
        <FlatList
            data={CATEGORIES}
            numColumns={2}
            renderItem={renderGirdItem}
        />
       </View>
    );
};
export const ScreenOption = (Navdata) => {
    return {
        headerTitle: 'Available Product',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Menu" iconName="ios-menu" onPress={() => {
            Navdata.navigation.toggleDrawer();
        }} />
    </HeaderButtons>
    };
};

const styles = StyleSheet.create({
    image:{
        flex:1,  
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
});
export default CategoriesScreen;